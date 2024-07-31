import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { teacher_id, student_id } = req.body;

    // Check if both IDs are provided
    if (!teacher_id || !student_id) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      const student = await prisma.student.update({
        where: { id: parseInt(student_id) },
        data: { teacherId: parseInt(teacher_id) },
      });

      res.status(200).json({ message: 'Student updated successfully', student });
    } catch (error) {
      console.error('Error updating student:', error);
      res.status(500).json({ error: 'Failed to update student', details: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
