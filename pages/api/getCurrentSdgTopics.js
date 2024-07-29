import prisma from "@/lib/prisma";
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 0, checkperiod: 0 });
export default async function GetCurrentSdgTopics(req, res) {
  const sdg = req.query.sdg;
  const category = req.query.category;
  const cachedData = cache.get(sdg + category);
  if (cachedData) {
    return res.status(200).json(cachedData);
  }
  try {
    const data = await prisma.teacher.findMany({
      where: { sdg: sdg, projectType: category },
    });
    cache.set(sdg + category, data);
    res.status(200).json(data);
  } catch (e) {
    res.status(404).send({ message: "Data not found" });
  }
}
