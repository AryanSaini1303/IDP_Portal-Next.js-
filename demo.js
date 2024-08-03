const { PrismaClient } = require('@prisma/client');
const xlsx = require('xlsx');
const prisma = new PrismaClient();

async function main() {
  // Load the Excel file
  const workbook = xlsx.readFile('faculty idp.xlsx');
  
  // Select the first sheet
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  
  // Parse the sheet into JSON
  const data = xlsx.utils.sheet_to_json(sheet);
  
  // Iterate over the data and insert each row into the database
  // console.log(data[0].score);
  for (const row of data) {
    await prisma.teacher.create({
      data: {
        // id: row.id,
        name: row.name,
        designation: row.designation,
        email: row.email,
        contact: JSON.stringify(row.contact),
        department: row.department,
        projectTitle: row.project_title,
        projectType: row.project_type,
        sdg: JSON.stringify(row.sdg),
        score: parseFloat(row.score )|| null,
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
