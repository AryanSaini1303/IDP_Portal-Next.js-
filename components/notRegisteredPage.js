import LandingPageLoader from "@/components/landingPageLoader";
import Link from "next/link";
import HeaderComponent from "@/components/headerComponent";
import FooterComponent from "@/components/footerComponent";
import { Rubik } from "next/font/google";

const rubik = Rubik({
  weight: "400",
  subsets: ["latin"],
});
export default function NotRegisteredPage({
  dataNotFound,
  studentData,
  session,
}) {
  return (
    <div className={`${"wrapper"} ${rubik.className}`}>
      <HeaderComponent studentData={studentData} session={session} />
      <div className="content">
        {studentData && !dataNotFound ? (
          <div className="card">
            <div className="student_info">
              <ul>
                <li className="holder">Name:</li>
                <li className="value">
                  {studentData.name ?studentData.name : "----"}
                </li>
                <li className="holder">Admission:</li>
                <li className="value">
                  {studentData.admissionNum ? studentData.admissionNum : "----"}
                </li>
                <li className="holder">Enrollment:</li>
                <li className="value">
                  {studentData.enrollmentNum
                    ? studentData.enrollmentNum
                    : "----"}
                </li>
                <li className="holder">Program:</li>
                <li className="value">
                  {studentData.program ? studentData.program : "----"}
                </li>
                <li className="holder">School:</li>
                <li className="value">
                  {studentData.school ? studentData.school : "----"}
                </li>
                <li className="holder">Batch:</li>
                <li className="value">
                  {studentData.batchYear ? studentData.batchYear : "----"}
                </li>
                <li className="holder">Contact:</li>
                <li className="value">
                  {studentData.contact ? studentData.contact : "----"}
                </li>
                <li className="holder">Email:</li>
                <li className="value">
                  {session.user.email ? session.user.email : "----"}
                </li>
              </ul>
            </div>
            <div className="main">
              <h1>Choose Your Category</h1>
              <div className="options">
                <Link
                  href={`/category?image=${encodeURIComponent(
                    session.user.image
                  )}&cat=Research&current_school=${
                    studentData.school
                  }&student_id=${studentData.id}`}
                >
                  <button className={rubik.className}>Research</button>
                </Link>
                <Link
                  href={`/category?image=${encodeURIComponent(
                    session.user.image
                  )}&cat=Business&current_school=${
                    studentData.school
                  }&student_id=${studentData.id}`}
                >
                  <button className={rubik.className}>Business</button>
                </Link>
              </div>
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
