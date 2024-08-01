import prisma from "@/lib/prisma";
export default async function GetCurrentSdgTopics(req, res) {
  const SDG_number = req.query.sdg;
  const category = req.query.category;
  const current_school = req.query.current_school;
  console.log(current_school);
  try {
    let available_topics = [];
    let available_topics_id = [];
    let teachers = [];
    let designation = [];
    let department=[];
    const result = await prisma.teacher.findMany({
      distinct: ["projectTitle"], // Ensure this matches the field you want to be distinct
      select: {
        projectTitle: true,
        id: true,
        name: true,
        designation: true,
        department: true,
      },
      where: {
        projectType: category,
        sdg: SDG_number, // Ensure this matches the field name
      },
    });
    // console.log(result);
    if (result.length == 0) {
      res.status(200).json(result);
    }
    result.forEach(async (element, index) => {
      let prohibitedSchools = [];
      let schoolFlag = true;
      const result3 = await prisma.student.findMany({
        select: {
          school: true,
        },
        where: {
          teacherId: element.id,
        },
      });
      result3.forEach((element1, index1) => {
        let count = 0;
        for (let i = index1 + 1; i < result3.length; i++) {
          if (element1.school == result3[i].school) {
            // console.log(element1.school);
            count++;
            if (count == 3) {
              prohibitedSchools.push(element1.school);
              break;
            }
          }
        }
      });
      // console.log("prohibitedSchools", prohibitedSchools);
      if (prohibitedSchools.includes(current_school)) {
        schoolFlag = false;
      }
      const result1 = await prisma.student.findMany({
        select: {
          id: true,
        },
        where: {
          teacherId: element.id,
        },
      });
      if (schoolFlag) {
        if (result1.length < 6) {
          available_topics.push(element.projectTitle);
          available_topics_id.push(element.id);
          teachers.push(element.name);
          designation.push(element.designation);
          department.push(element.department);
        } else {
          // console.log(element.projectTitle);
          const distinct_schools = await prisma.student.findMany({
            distinct: ["school"], // Ensure this is the Prisma field name
            select: {
              school: true,
            },
            where: {
              teacherId: element.id,
            },
          });

          // the distinct_schools array contains two objects, each with a school property
          if (distinct_schools.length == 3 && result1.length < 8) {
            // console.log(element.projectTitle);
            available_topics.push(element.projectTitle);
            available_topics_id.push(element.id);
            teachers.push(element.name);
            designation.push(element.designation);
            department.push(element.department);
          } else if (distinct_schools.length == 2 && result1.length == 6) {
            available_topics.push(element.projectTitle);
            available_topics_id.push(element.id);
            teachers.push(element.name);
            designation.push(element.designation);
            department.push(element.department);
          } else if (
            distinct_schools.length == 2 &&
            result1.length == 7 &&
            !distinct_schools.some((obj) => obj.school === current_school)
          ) {
            // here we are selecting each object of array distinct_schools and we are comparing values of "school" property against our variable current_school
            available_topics.push(element.projectTitle);
            available_topics_id.push(element.id);
            teachers.push(element.name);
            designation.push(element.designation);
            department.push(element.department);
          } else if (
            distinct_schools.length == 1 &&
            result1.length == 6 &&
            !distinct_schools.some((obj) => obj.school === current_school)
          ) {
            available_topics.push(element.projectTitle);
            available_topics_id.push(element.id);
            teachers.push(element.name);
            designation.push(element.designation);
            department.push(element.department);
          }
        }
      }
      if (index == result.length - 1) {
        // console.log("available topics=>",available_topics);
        // console.log("available_topics_id",available_topics_id);
        // console.log("teachers",teachers);
        // console.log("designation",designation);
        let data = [];
        for (let i = 0; i < available_topics.length; i++) {
          let dataobj = {};
          (dataobj.id = available_topics_id[i]),
            (dataobj.project_title = available_topics[i]);
          dataobj.teacher = teachers[i];
          dataobj.designation = designation[i];
          dataobj.department=department[i];
          data.push(dataobj);
        }
        // console.log(data);
        // res.render("topics", {
        //   available_topics,
        //   available_topics_id,
        //   teachers,
        //   designation,
        // }); // we can't use this outside the forEach function as this function is set as async so if we render the file outside this function then the containers will be empty as the data assignment in those containers is taking place in an async function i.e. "forEach"
        res.status(200).json(data);
      }
    });
  } catch (e) {
    res.status(404).send({ message: "Data not found" });
  }
}
