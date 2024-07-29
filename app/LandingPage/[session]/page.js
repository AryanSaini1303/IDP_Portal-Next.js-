"use client";
import { Rubik } from "next/font/google";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LandingPageLoader from "@/components/landingPageLoader";
import Link from "next/link";
import HeaderComponent from "@/components/headerComponent";
import FooterComponent from "@/components/footerComponent";

const rubik = Rubik({
  weight: "400",
  subsets: ["latin"],
});

export default function LandingPage({ params }) {
  const [session, setSession] = useState();
  const [studentData, setStudentData] = useState();
  const [dataNotFound,setDataNotFound]=useState(false);
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

  useEffect(() => {
    // console.log(studentData);
    if (studentData === null && router.pathname !== '/') {
      signOut({ callbackUrl: "/" }).then(() => {
        router.push("/");
      });
      setDataNotFound(true);
      alert("Sign in with official Email-id only!");
    }
  }, [studentData, router]);

  if (!session) {
    return <p>Loading...</p>;
  }

  return (
    <div className={`${"wrapper"} ${rubik.className}`}>
      <HeaderComponent studentData={studentData} session={session}/>
      <div className="content">
        {studentData&&!dataNotFound ? (
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
                <Link href={`/category?image=${encodeURIComponent(session.user.image)}&cat=Research`}>
                  <button className={rubik.className}>Research</button>
                </Link>
                <Link href={`/category?image=${encodeURIComponent(session.user.image)}&cat=Business`}>
                  <button className={rubik.className}>Business</button>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <h1><LandingPageLoader/></h1>
        )}
      </div>
      <FooterComponent/>
    </div>
  );
}
