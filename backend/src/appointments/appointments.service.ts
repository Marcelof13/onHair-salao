import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AppointmentsService {
    constructor(private prisma: PrismaService) { }

    async createAppointment(userId: string, professionalId: string, serviceId: string, dateStr: string) {
        const startObj = new Date(dateStr);

        // Validate if the parsed date is valid
        if (isNaN(startObj.getTime())) {
            throw new BadRequestException('Invalid date format');
        }

        const service = await this.prisma.service.findUnique({ where: { id: serviceId } });
        if (!service) throw new BadRequestException('Service not found');

        const duration = service.durationMinutes;
        const endObj = new Date(startObj.getTime() + duration * 60000);

        // Business rule: Functioning hours 09:00 to 19:00
        // The appointment start must be >= 09:00 and end must be <= 19:00
        const startHour = startObj.getHours();
        const endHour = endObj.getHours();
        const endMinutes = endObj.getMinutes();

        if (startHour < 9 || endHour > 19 || (endHour === 19 && endMinutes > 0)) {
            throw new BadRequestException('Appointments can only be scheduled between 09:00 and 19:00');
        }

        // Professional conflict check: Retrieve same day appointments
        const startOfDay = new Date(startObj);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(startObj);
        endOfDay.setHours(23, 59, 59, 999);

        const sameDayAppointments = await this.prisma.appointment.findMany({
            where: {
                professionalId,
                date: { gte: startOfDay, lte: endOfDay }
            },
            include: { service: true }
        });

        const newStart = startObj.getTime();
        const newEnd = endObj.getTime();

        for (const appt of sameDayAppointments) {
            const existingStart = appt.date.getTime();
            const existingEnd = existingStart + appt.service.durationMinutes * 60000;

            // Overlap logic: existingStart < newEnd AND existingEnd > newStart
            if (existingStart < newEnd && existingEnd > newStart) {
                throw new BadRequestException('Professional already has an appointment at this time.');
            }
        }

        return this.prisma.appointment.create({
            data: {
                userId,
                professionalId,
                serviceId,
                date: startObj
            }
        });
    }

    async getUserAppointments(userId: string) {
        return this.prisma.appointment.findMany({
            where: { userId },
            include: {
                professional: true,
                service: true
            },
            orderBy: { date: 'asc' }
        });
    }

    async getProfessionals() {
        return this.prisma.professional.findMany();
    }

    async getServices() {
        return this.prisma.service.findMany();
    }
}
