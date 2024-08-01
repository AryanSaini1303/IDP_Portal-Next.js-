import prisma from "@/lib/prisma";
export default async function GetCurrentTopicSdgs(req, res) {
  const topicName = req.query.topicName;
  console.log(topicName);
  try {
    const data = await prisma.teacher.findMany({
      where: { projectTitle:topicName },
      select:{
        sdg:true,
        email:true,
        contact:true,
        department:true
      }
    });
    console.log(data);
    res.status(200).json(data);
  } catch (e) {
    res.status(404).send({ message: "Data not found" });
  }
}
