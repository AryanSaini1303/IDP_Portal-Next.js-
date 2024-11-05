const ExcelJS = require('exceljs');
const { PrismaClient } = require('@prisma/client'); // Import PrismaClient from @prisma/client

const prisma = new PrismaClient(); // Instantiate PrismaClient

async function fetchUnregisteredStudents() {
  // Fetch students who do not have a teacher assigned (teacherId is null)
  const unregisteredStudents = await prisma.student.findMany({
    where: {
      teacherId: null, // Filter for students without a teacher
    },
  });

  return unregisteredStudents;
}

async function generateExcel() {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Unregistered Students');

  // Define header row
  worksheet.columns = [
    { header: 'Student Name', key: 'name', width: 20 },
    { header: 'Admission Number', key: 'admissionNum', width: 15 },
    { header: 'Enrollment Number', key: 'enrollmentNum', width: 15 },
    { header: 'School', key: 'school', width: 20 },
    { header: 'Program', key: 'program', width: 20 },
    { header: 'Contact', key: 'contact', width: 15 },
    { header: 'Email', key: 'email', width: 25 },
    { header: 'Batch Year', key: 'batchYear', width: 10 },
    { header: 'External Score', key: 'externalScore', width: 15 },
    { header: 'Internal Score', key: 'internalScore', width: 15 },
  ];

  // Fetch unregistered student data
  const unregisteredStudents = await fetchUnregisteredStudents();

  // Populate rows
  unregisteredStudents.forEach((student) => {
    worksheet.addRow({
      name: student.name,
      admissionNum: student.admissionNum,
      enrollmentNum: student.enrollmentNum,
      school: student.school,
      program: student.program,
      contact: student.contact,
      email: student.email,
      batchYear: student.batchYear,
      externalScore: student.externalScore,
      internalScore: student.internalScore,
    });
  });

  // Save Excel file
  await workbook.xlsx.writeFile('unregisteredStudents.xlsx');
  console.log('Excel file has been saved!');
}

// Execute the function
generateExcel()
  .catch(console.error)
  .finally(() => prisma.$disconnect()); // Ensure Prisma client is properly closed
