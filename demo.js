const { PrismaClient } = require('@prisma/client');
const xlsx = require('xlsx');
const prisma = new PrismaClient();
const fs = require('fs'); // File system module for saving the file

async function main() {
  // Fetch data from the database
  const students = await prisma.student.findMany();

  // Convert data to JSON format
  const data = students.map(student => ({
    admission_num: student.admissionNum,
    name: student.name,
    enrollment_num: student.enrollmentNum,
    school: student.school,
    program: student.program,
    contact: student.contact,
    email: student.email,
    teacherId: student.teacherId,
    externalScore: student.externalScore,
    internalScore: student.internalScore,
    batchYear: student.batchYear
  }));

  // Create a new workbook and add a sheet
  const workbook = xlsx.utils.book_new();
  const worksheet = xlsx.utils.json_to_sheet(data);
  xlsx.utils.book_append_sheet(workbook, worksheet, 'Students');

  // Write the workbook to a file
  const filePath = 'students_export.xlsx';
  xlsx.writeFile(workbook, filePath);

  console.log(`Data exported successfully to ${filePath}`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
