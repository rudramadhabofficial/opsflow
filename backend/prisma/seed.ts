import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting DB Seed...');

  const password = await bcrypt.hash('password123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@opsflow.com' },
    update: {},
    create: {
      email: 'admin@opsflow.com',
      name: 'Admin User',
      password,
      role: 'ADMIN',
    },
  });

  const manager = await prisma.user.upsert({
    where: { email: 'manager@opsflow.com' },
    update: {},
    create: {
      email: 'manager@opsflow.com',
      name: 'Manager User',
      password,
      role: 'MANAGER',
    },
  });

  const employee = await prisma.user.upsert({
    where: { email: 'employee@opsflow.com' },
    update: {},
    create: {
      email: 'employee@opsflow.com',
      name: 'Employee Worker',
      password,
      role: 'EMPLOYEE',
    },
  });

  console.log('Created Admin:', admin.email);
  console.log('Created Manager:', manager.email);
  console.log('Created Employee:', employee.email);
  console.log('All passwords are set to: password123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
