import { AppointmentsService } from './appointments.service';
export declare class AppointmentsController {
    private readonly appointmentsService;
    constructor(appointmentsService: AppointmentsService);
    create(req: any, body: {
        professionalId: string;
        serviceId: string;
        date: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        date: Date;
        userId: string;
        professionalId: string;
        serviceId: string;
    }>;
    getAllMyAppointments(req: any): Promise<({
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
