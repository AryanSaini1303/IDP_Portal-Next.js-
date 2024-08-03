import prisma from "@/lib/prisma";
export default async function getCurrentStudent(req, res) {
  const email = req.query.email;
  try {
    const data = await prisma.student.findUnique({
      where: { email: email },
    });
    // console.log(data);
    res.status(200).json(data);
  } catch (e) {
    res.status(404).send({ message: "Data Not found" });
  }
}
