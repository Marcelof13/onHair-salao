import { Controller, Post, Get, Body, Request, UseGuards } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('appointments')
@UseGuards(JwtAuthGuard)
export class AppointmentsController {
    constructor(private readonly appointmentsService: AppointmentsService) { }

    @Post()
    async create(@Request() req: any, @Body() body: { professionalId: string, serviceId: string, date: string }) {
        return this.appointmentsService.createAppointment(req.user.id, body.professionalId, body.serviceId, body.date);
    }

    @Get()
    async getAllMyAppointments(@Request() req: any) {
        return this.appointmentsService.getUserAppointments(req.user.id);
    }

    @Get('professionals')
    async getProfessionals() {
        return this.appointmentsService.getProfessionals();
    }

    @Get('services')
    async getServices() {
        return this.appointmentsService.getServices();
    }
}
