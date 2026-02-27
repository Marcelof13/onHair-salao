import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        if (user && user.password && await bcrypt.compare(pass, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.id, name: user.name };
        return {
            access_token: this.jwtService.sign(payload),
            user: { id: user.id, name: user.name, email: user.email }
        };
    }

    async register(data: any) {
        const { email, password, name } = data;
        const existing = await this.usersService.findByEmail(email);
        if (existing) throw new BadRequestException('User already exists');

        // Password strength check
        const strengthRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!strengthRegex.test(password)) {
            throw new BadRequestException('Password must be at least 8 characters long, include uppercase, lowercase, numbers, and special characters.');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.usersService.create({
            email,
            name,
            password: hashedPassword
        });
        const { password: _, ...result } = user;
        return result;
    }
}
