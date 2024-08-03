import prisma from "@/lib/prisma";

export default async function GetCurrentSdgTopics(req, res) {
  const SDG_number = req.query.sdg;
  const category = req.query.category;
  const current_school = req.query.current_school;

  try {
    let available_topics = [];
    let available_topics_id = [];
    let teachers = [];
    let designation = [];
    let department = [];

    const results = await prisma.teacher.findMany({
      distinct: ["projectTitle"],
      select: {
        projectTitle: true,
        id: true,
        name: true,
        designation: true,
        department: true,
      },
      where: {
        projectType: category,
        sdg: SDG_number,
      },
    });

    if (results.length === 0) {
      return res.status(200).json(results);
    }

    const processTeacher = async (element) => {
      let prohibitedSchools = new Map();
      let schoolFlag = true;

      const students = await prisma.student.findMany({
        select: {
          school: true,
        },
        where: {
          teacherId: element.id,
        },
      });

      // Count the number of students from each school
      students.forEach((student) => {
        prohibitedSchools.set(
          student.school,
          (prohibitedSchools.get(student.school) || 0) + 1
        );
      });

      // Check if any school has reached the limit
      prohibitedSchools.forEach((count, school) => {
        if (count >= 3 && school === current_school) {
          schoolFlag = false;
        }
      });

      const studentCount = await prisma.student.count({
        where: {
          teacherId: element.id,
        },
      });

      if (schoolFlag) {
        if (studentCount < 6) {
          available_topics.push(element.projectTitle);
          available_topics_id.push(element.id);
          teachers.push(element.name);
          designation.push(element.designation);
          department.push(element.department);
        } else {
          const distinct_schools = await prisma.student.findMany({
            distinct: ["school"],
            select: {
              school: true,
            },
            where: {
              teacherId: element.id,
            },
          });

          if (
            (distinct_schools.length === 3 && studentCount < 8) ||
            (distinct_schools.length === 2 && studentCount === 6) ||
            (distinct_schools.length === 2 &&
              studentCount === 7 &&
              !distinct_schools.some((obj) => obj.school === current_school)) ||
            (distinct_schools.length === 1 &&
              studentCount === 6 &&
              !distinct_schools.some((obj) => obj.school === current_school))
          ) {
            available_topics.push(element.projectTitle);
            available_topics_id.push(element.id);
            teachers.push(element.name);
            designation.push(element.designation);
            department.push(element.department);
          }
        }
      }
    };

    await Promise.all(results.map(processTeacher));

    const data = available_topics.map((topic, index) => ({
      id: available_topics_id[index],
      project_title: topic,
      teacher: teachers[index],
      designation: designation[index],
      department: department[index],
    }));

    res.status(200).json(data);
  } catch (e) {
    console.error(e);
    res.status(404).send({ message: "Data not found" });
  }
}
