"use client";
import { Rubik } from "next/font/google";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const rubik = Rubik({
  weight: "400",
  subsets: ["latin"],
});

export default function LandingPage({ params }) {
  const [session, setSession] = useState();
  const [studentData, setStudentData] = useState();
  const router = useRouter();

  useEffect(() => {
    setSession(JSON.parse(decodeURIComponent(params.session)));
  }, [params]);

  useEffect(() => {
    const fetchData = async () => {
      if (session && session.user && session.user.email) {
        try {
          const response = await fetch(
            `/api/getCurrentStudent?email=${session.user.email}`
          );
          if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
          }
          const data = await response.json();
          setStudentData(data);
        } catch (err) {
          console.error("Error fetching student data:", err);
        }
      }
    };
    fetchData();
  }, [session]);

  if (!session) {
    return <p>Loading...</p>;
  }

  return (
    <div className={`${"wrapper"} ${rubik.className}`}>
      <div className="header">
        <abbr title="Logout">
          <div className="menu">
            <button
              className={rubik.className}
              onClick={() => {
                signOut({ callbackUrl: "/" }).then(() => {
                  router.push("/");
                });
              }}
            >
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <path d="M14 8V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2h7a2 2 0 002-2v-2" />
                <path d="M7 12h14l-3-3m0 6l3-3" />
              </svg>
            </button>
          </div>
        </abbr>
        <header>IDP Registration Portal</header>
        <img src={session.user.image} alt="User's Image" />
      </div>
      <div className="content">
        {studentData ? (
          <div className="card">
            <div className="student_info">
              <ul>
                <li className="holder">Name:</li>
                <li className="value">{session.user.name}</li>
                <li className="holder">Admission:</li>
                <li className="value">{studentData.admissionNum}</li>
                <li className="holder">Enrollment:</li>
                <li className="value">{studentData.enrollmentNum}</li>
                <li className="holder">Program:</li>
                <li className="value">{studentData.program}</li>
                <li className="holder">School:</li>
                <li className="value">{studentData.school}</li>
                <li className="holder">Contact:</li>
                <li className="value">{studentData.contact}</li>
                <li className="holder">Email:</li>
                <li className="value">{session.user.email}</li>
              </ul>
            </div>
            <div className="main">
              <h1>Choose Your Category</h1>
              <div className="options">
                <a href="/Research">
                  <button className={rubik.className}>Research</button>
                </a>
                <a href="/Business">
                  <button className={rubik.className}>Business</button>
                </a>
              </div>
            </div>
          </div>
        ):<h1>Loading...</h1>}
      </div>
      <footer>
        <p>&copy; 2024 IDP Registration Portal. All rights reserved.</p>
        <div className="icons8">
          <a
            target="_blank"
            href="https://icons8.com/icon/xrwE2Qxg9XYK/hand-cursor"
          >
            Cursor
          </a>
          icon by{" "}
          <a target="_blank" href="https://icons8.com">
            Icons8
          </a>
        </div>
      </footer>
    </div>
  );
}
