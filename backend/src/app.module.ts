import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './api/auth/auth.module';
import { AppointmentsModule } from './api/appointments/appointments.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, AppointmentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
