import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();

  const prismaService = app.get(PrismaService);
  const existingAdmin = await prismaService.user.findUnique({ where: { email: 'admin@onhair.com.br' } });
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await prismaService.user.create({
      data: {
        email: 'admin@onhair.com.br',
        password: hashedPassword,
        name: 'Administrador',
        role: 'ADMIN'
      }
    });
  }

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
