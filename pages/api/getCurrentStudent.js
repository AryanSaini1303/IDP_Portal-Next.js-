import prisma from "@/lib/prisma";
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 0, checkperiod: 0 });
export default async function getCurrentStudent(req, res) {
  const email = req.query.email;
  const cachedData = cache.get(email);
  if (cachedData) {
    return res.status(200).json(cachedData);
  }
  try {
    const data = await prisma.student.findUnique({
      where: { email: email },
    });
    cache.set(email, data);
    console.log(data);
    res.status(200).json(data);
  } catch (e) {
    res.status(404).send({ message: "Data Not found" });
  }
}
