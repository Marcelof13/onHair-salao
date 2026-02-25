"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('Seeding Database...');
    const raf = await prisma.professional.create({
        data: { name: 'Rafael Feijao', role: 'Proprietário' }
    });
    const luc = await prisma.professional.create({
        data: { name: 'Lucas Silva', role: 'Líder' }
    });
    const rya = await prisma.professional.create({
        data: { name: 'Ryan Kalebe', role: 'Barbeiro' }
    });
    await prisma.service.createMany({
        data: [
            { name: 'Corte Simples', category: 'Cabelo', price: 50, durationMinutes: 25 },
            { name: 'Corte Degradê', category: 'Cabelo', price: 60, durationMinutes: 40 },
            { name: 'Barba Completa', category: 'Barba', price: 40, durationMinutes: 30 },
            { name: 'Combo Corte Degradê e Barba', category: 'Combo', price: 85, durationMinutes: 60 },
            { name: 'Manicure', category: 'Manicure', price: 30, durationMinutes: 30 },
        ]
    });
    console.log('Seed completed!');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map