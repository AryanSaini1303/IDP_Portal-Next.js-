import prisma from "@/lib/prisma";

export default async function getCurrentStudent(req, res) {
  const teacherId = decodeURIComponent(req.query.teacherId);
    console.log(teacherId);
  try {
    const data = await prisma.student.findMany({
      where: {
        teacherId:parseInt(teacherId),
      },
      select:{
        school:true
      }
    });

    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).send({ message: "Data Not found" });
    }
  } catch (e) {
    console.error(e); // Log error for debugging
    res.status(500).send({ message: "An error occurred" });
  }
}
