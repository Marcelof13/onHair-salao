import { PrismaService } from '../prisma/prisma.service';
export declare class AppointmentsService {
    private prisma;
    constructor(prisma: PrismaService);
    createAppointment(userId: string, professionalId: string, serviceId: string, dateStr: string): Promise<{
        id: string;
        createdAt: Date;
        date: Date;
        userId: string;
        professionalId: string;
        serviceId: string;
    }>;
    getUserAppointments(userId: string): Promise<({
        professional: {
            id: string;
            name: string;
            role: string;
        };
        service: {
            id: string;
            name: string;
            category: string;
            price: number;
            durationMinutes: number;
        };
    } & {
        id: string;
        createdAt: Date;
        date: Date;
        userId: string;
        professionalId: string;
        serviceId: string;
    })[]>;
    getProfessionals(): Promise<{
        id: string;
        name: string;
        role: string;
    }[]>;
    getServices(): Promise<{
        id: string;
        name: string;
        category: string;
        price: number;
        durationMinutes: number;
    }[]>;
}
