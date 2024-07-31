// createTeacher.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const teacher = await prisma.teacher.create({
      data: {
        name: 'Arpita Rastogi',
        designation: 'Assistant Professor',
        email: 'arpita.rastogi@gdgu.org',
        contact: '9711255236',
        department: 'School of Agricultural Sciences',
        projectTitle: 'Technological Innovation in Branding of Agri-products- An economic analysis',
        projectType: 'Research',
        sdg: '5',
        score: null,
      },
    });

    console.log('Teacher created:', teacher);
  } catch (error) {
    console.error('Error creating teacher:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
