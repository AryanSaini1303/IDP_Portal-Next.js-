const { PrismaClient } = require('@prisma/client');
const xlsx = require('xlsx');
const prisma = new PrismaClient();

async function main() {
  // Load the Excel file
  const workbook = xlsx.readFile('student_idp.xlsx');
  
  // Select the first sheet
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  
  // Parse the sheet into JSON
  const data = xlsx.utils.sheet_to_json(sheet);
  
  // Iterate over the data and insert each row into the database
//   console.log(data[0]);
  for (const row of data) {
    await prisma.student.create({
      data: {
        admissionNum: JSON.stringify(row.admission_num) || null,
        name: row.name || null,
        enrollmentNum: JSON.stringify(row.enrollment_num) || null,
        school: row.school || null,
        program: row.program || null,
        contact: JSON.stringify(row.contact) || null,
        email: row.email || null,
        teacherId: row.teacherId || null,
        externalScore: row.externalScore || null,
        internalScore: row.internalScore || null,
        batchYear:JSON.stringify(row.batchYear) || null
      },
    });
  }
  
  console.log('Data imported successfully');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
