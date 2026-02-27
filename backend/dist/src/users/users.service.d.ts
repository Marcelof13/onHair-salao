import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findByEmail(email: string): Promise<{
        id: string;
        email: string;
        name: string;
        password: string;
        createdAt: Date;
    } | null>;
    findById(id: string): Promise<{
        id: string;
        email: string;
        name: string;
        password: string;
        createdAt: Date;
    } | null>;
    create(data: any): Promise<{
        id: string;
        email: string;
        name: string;
        password: string;
        createdAt: Date;
    }>;
}
