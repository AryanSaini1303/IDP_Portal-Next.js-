const ExcelJS = require('exceljs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function fetchAndGroupStudents() {
  // Fetch teachers and their students
  const teachers = await prisma.teacher.findMany({
    include: {
      students: true,
    },
  });

  // Transform data into a grouped format
  const groupedData = teachers.map((teacher) => ({
    teacherName: teacher.name,
    teacherDesignation: teacher.designation,
    teacherEmail: teacher.email,
    teacherContact: teacher.contact,
    teacherDepartment: teacher.department,
    teacherProjectTitle: teacher.projectTitle,
    teacherProjectType: teacher.projectType,
    teacherSDG: teacher.sdg,
    teacherScore: teacher.score,
    students: teacher.students.map((student) => ({
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
    })),
  }));

  return groupedData;
}

async function generateExcel() {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Students');

  // Define header row with teacher details
  worksheet.columns = [
    { header: 'Teacher Name', key: 'teacherName', width: 20 },
    { header: 'Designation', key: 'teacherDesignation', width: 15 },
    { header: 'Email', key: 'teacherEmail', width: 25 },
    { header: 'Contact', key: 'teacherContact', width: 15 },
    { header: 'Department', key: 'teacherDepartment', width: 20 },
    { header: 'Project Title', key: 'teacherProjectTitle', width: 25 },
    { header: 'Project Type', key: 'teacherProjectType', width: 15 },
    { header: 'SDG', key: 'teacherSDG', width: 10 },
    { header: 'Score', key: 'teacherScore', width: 10 },
    { header: 'Student Name', key: 'studentName', width: 20 },
    { header: 'Admission Number', key: 'admissionNum', width: 15 },
    { header: 'Enrollment Number', key: 'enrollmentNum', width: 15 },
    { header: 'School', key: 'school', width: 20 },
    { header: 'Program', key: 'program', width: 20 },
    { header: 'Student Contact', key: 'contact', width: 15 },
    { header: 'Student Email', key: 'email', width: 25 },
    { header: 'Batch Year', key: 'batchYear', width: 10 },
    { header: 'External Score', key: 'externalScore', width: 15 },
    { header: 'Internal Score', key: 'internalScore', width: 15 },
  ];

  // Fetch grouped student data with teacher details
  const groupedData = await fetchAndGroupStudents();

  // Populate rows
  groupedData.forEach((teacherGroup) => {
    teacherGroup.students.forEach((student) => {
      worksheet.addRow({
        teacherName: teacherGroup.teacherName,
        teacherDesignation: teacherGroup.teacherDesignation,
        teacherEmail: teacherGroup.teacherEmail,
        teacherContact: teacherGroup.teacherContact,
        teacherDepartment: teacherGroup.teacherDepartment,
        teacherProjectTitle: teacherGroup.teacherProjectTitle,
        teacherProjectType: teacherGroup.teacherProjectType,
        teacherSDG: teacherGroup.teacherSDG,
        teacherScore: teacherGroup.teacherScore,
        studentName: student.name,
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
  });

  // Save Excel file
  await workbook.xlsx.writeFile('studentsGroupedByTeachers.xlsx');
  console.log('Excel file has been saved!');
}

// Ensure Prisma client is properly closed when done
generateExcel()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
