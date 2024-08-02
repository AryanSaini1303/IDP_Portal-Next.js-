import LandingPageLoader from "@/components/landingPageLoader";
import HeaderComponent from "@/components/headerComponent";
import FooterComponent from "@/components/footerComponent";
import { Rubik } from "next/font/google";
import { useEffect, useState } from "react";

const rubik = Rubik({
  weight: "400",
  subsets: ["latin"],
});
export default function RegisteredPage({ dataNotFound, studentData, session }) {
  console.log(studentData);
  const [projectDetails, setProjectDetails] = useState();
  useEffect(() => {
    const fetchData = async () => {
      if (session && session.user && session.user.email) {
        try {
          const response = await fetch(
            `/api/getRegisteredStudentGroup?teacher_id=${studentData.teacherId}`
          );
          if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
          }
          const data = await response.json();
          setProjectDetails(data);
        } catch (err) {
          console.error("Error fetching student data:", err);
        }
      }
    };
    fetchData();
  }, [session]);
  console.log(projectDetails);
  return (
    <div className={`${"wrapper"} ${rubik.className}`}>
      <HeaderComponent studentData={studentData} session={session} />
      <div className="content">
        {studentData && !dataNotFound && projectDetails ? (
          <div className="card">
            <h2 style={{ textAlign: "center", margin: "1rem" }}>
              You have registered successfully 🎉
            </h2>
            <div className="student_info">
              <ul>
                <li className="holder">SDG:</li>
                <li className="value">{projectDetails[0][0].sdg}</li>
                <li className="holder">Topic:</li>
                <li className="value">{projectDetails[1].projectTitle}</li>
                <li className="holder">Category:</li>
                <li className="value">{projectDetails[1].projectType}</li>
                <li className="holder">Faculty:</li>
                <li className="value">
                  {projectDetails ? projectDetails[1].name : "Loading..."}
                </li>
                <li className="holder">Email:</li>
                <li className="value">{projectDetails[1].email}</li>
                <li className="holder">Contact:</li>
                <li className="value">
                  {projectDetails[1].contact.startsWith("'") ||
                  projectDetails[1].contact.startsWith('"')
                    ? projectDetails[1].contact.slice(1, -1)
                    : projectDetails[1].contact}
                </li>
                <li className="holder">School:</li>
                <li className="value">{projectDetails[1].department}</li>
              </ul>
            </div>
          </div>
        ) : (
          <h1>
            <LandingPageLoader />
          </h1>
        )}
      </div>
      <FooterComponent />
    </div>
  );
}
