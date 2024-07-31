import prisma from "@/lib/prisma";
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 0, checkperiod: 0 });
export default async function GetCurrentTopicSdgs(req, res) {
  const topicName = req.query.topicName;
  console.log(topicName);
  const cachedData = cache.get(topicName);
  if (cachedData) {
    return res.status(200).json(cachedData);
  }
  try {
    const data = await prisma.teacher.findMany({
      where: { projectTitle:topicName },
      select:{
        sdg:true
      }
    });
    cache.set(topicName, data);
    console.log(data);
    res.status(200).json(data);
  } catch (e) {
    res.status(404).send({ message: "Data not found" });
  }
}
