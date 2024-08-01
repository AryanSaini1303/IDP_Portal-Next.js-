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
  return (
    <div className={`${"wrapper"} ${rubik.className}`}>
      <HeaderComponent studentData={studentData} session={session} />
      <div className="content">
        {studentData && !dataNotFound && projectDetails ? (
          <div className="card">
            <div className="student_info">
              <ul>
                <li className="holder">SDG:</li>
                <li className="value">
                  {projectDetails[0].map((element, index) => {
                    return index === 0 ? element.sdg : `,${element.sdg}`;
                  })}
                </li>
                <li className="holder">Topic:</li>
                <li className="value">{projectDetails[1].projectTitle}</li>
                <li className="holder">Teacher:</li>
                <li className="value">
                  {projectDetails ? projectDetails[1].name : "Loading..."}
                </li>
                <li className="holder">email:</li>
                <li className="value">{projectDetails[1].email}</li>
                <li className="holder">Contact:</li>
                <li className="value">{projectDetails[1].contact}</li>
                <li className="holder">Department:</li>
                <li className="value">{projectDetails[1].department}</li>
                <li className="holder">Category:</li>
                <li className="value">{projectDetails[1].projectType}</li>
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
