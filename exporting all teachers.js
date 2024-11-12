const { PrismaClient } = require('@prisma/client'); // Import PrismaClient
const ExcelJS = require('exceljs'); // Import ExcelJS

const prisma = new PrismaClient(); // Instantiate PrismaClient

(async function() {
  try {
    // Fetch all teachers from the database
    const teachers = await prisma.teacher.findMany();

    // Create a new workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Teachers');

    // Define header row
    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Name', key: 'name', width: 20 },
      { header: 'Designation', key: 'designation', width: 20 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'Contact', key: 'contact', width: 15 },
      { header: 'Department', key: 'department', width: 20 },
      { header: 'Project Title', key: 'projectTitle', width: 25 },
      { header: 'Project Type', key: 'projectType', width: 20 },
      { header: 'SDG', key: 'sdg', width: 10 },
      { header: 'Score', key: 'score', width: 10 }
    ];

    // Populate rows with teacher data
    teachers.forEach((teacher) => {
      worksheet.addRow({
        id: teacher.id,
        name: teacher.name,
        designation: teacher.designation,
        email: teacher.email,
        contact: teacher.contact,
        department: teacher.department,
        projectTitle: teacher.projectTitle,
        projectType: teacher.projectType,
        sdg: teacher.sdg,
        score: teacher.score,
      });
    });

    // Save Excel file
    await workbook.xlsx.writeFile('teachers.xlsx');
    console.log('Excel file has been saved as teachers.xlsx!');
  } catch (error) {
    console.error('Error fetching teachers or saving to Excel:', error);
  } finally {
    // Ensure Prisma client is properly closed
    await prisma.$disconnect();
  }
})();
