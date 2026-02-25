"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AppointmentsService = class AppointmentsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createAppointment(userId, professionalId, serviceId, dateStr) {
        const startObj = new Date(dateStr);
        if (isNaN(startObj.getTime())) {
            throw new common_1.BadRequestException('Invalid date format');
        }
        const service = await this.prisma.service.findUnique({ where: { id: serviceId } });
        if (!service)
            throw new common_1.BadRequestException('Service not found');
        const duration = service.durationMinutes;
        const endObj = new Date(startObj.getTime() + duration * 60000);
        const startHour = startObj.getHours();
        const endHour = endObj.getHours();
        const endMinutes = endObj.getMinutes();
        if (startHour < 9 || endHour > 19 || (endHour === 19 && endMinutes > 0)) {
            throw new common_1.BadRequestException('Appointments can only be scheduled between 09:00 and 19:00');
        }
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
            if (existingStart < newEnd && existingEnd > newStart) {
                throw new common_1.BadRequestException('Professional already has an appointment at this time.');
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
    async getUserAppointments(userId) {
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
};
exports.AppointmentsService = AppointmentsService;
exports.AppointmentsService = AppointmentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AppointmentsService);
//# sourceMappingURL=appointments.service.js.map