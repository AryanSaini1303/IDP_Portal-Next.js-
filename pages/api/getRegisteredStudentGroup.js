import prisma from "@/lib/prisma";
export default async function getRegisteredStudentGroup(req, res) {
  const teacherId = req.query.teacher_id;
  try {
    // console.log(teacherId);
    const teacher_details = await prisma.teacher.findUnique({
      where: { id: parseInt(teacherId) },
      select: {
        name: true,
        projectTitle: true,
        projectType:true,
        email: true,
        contact: true,
        department: true,
      },
    });
    const sdgs = await prisma.teacher.findMany({
      where: { projectTitle: teacher_details.projectTitle },
      select: {
        sdg: true,
      },
    });
    // console.log(sdgs);
    // console.log(teacher_details);
    let data=[sdgs,teacher_details]
    // console.log(data);
    res.status(200).json(data);
  } catch (e) {
    res.status(404).send({ message: "Data Not found" });
  }
}
// sdg, topic, teacher, email, contact, school
