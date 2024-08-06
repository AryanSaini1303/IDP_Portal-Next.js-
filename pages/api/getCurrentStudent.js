import prisma from "@/lib/prisma";

export default async function getCurrentStudent(req, res) {
  const email = req.query.email;

  try {
    // Use findFirst with case-insensitive search
    const data = await prisma.student.findFirst({
      where: {
        email: {
          contains: email, // Search term
          mode: 'insensitive', // Case-insensitive
        },
      },
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
