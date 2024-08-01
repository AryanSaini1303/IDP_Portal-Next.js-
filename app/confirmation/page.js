"use client";
import "./globals.css";
import FooterComponent from "@/components/footerComponent";
import HeaderComponent from "@/components/headerComponent";
import TopicsLoader from "@/components/topicsLoader";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Rubik } from "next/font/google";
import Link from "next/link";
import LandingPageLoader from "@/components/landingPageLoader";

const rubik = Rubik({
  weight: "400",
  subsets: ["latin"],
});

function Confirmation() {
  const params = useSearchParams();
  const sessionImage = params.get("sessionImage");
  const topicName = decodeURIComponent(params.get("topic_name"));
  const teacherName = decodeURIComponent(params.get("teacher_name"));
  const teacherId = decodeURIComponent(params.get("teacher_id"));
  const studentId = decodeURIComponent(params.get("student_id"));
  const [data, setData] = useState();
  const router = useRouter();
  console.log(data);
  useEffect(() => {
    !localStorage.getItem("userData") &&
      signOut({ callbackUrl: "/" }).then(() => {
        router.push("/");
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (topicName) {
        try {
          const response = await fetch(
            `/api/getCurrentTopicSdgs?topicName=${encodeURIComponent(
              topicName
            )}`
          );
          if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
          }
          const data = await response.json();
          setData(data);
        } catch (err) {
          console.error("Error fetching topics data:", err);
        }
      }
    };
    fetchData();
  }, [topicName]);

  return (
    <div className={`${"wrapper"} ${rubik.className}`}>
      <HeaderComponent sessionImage={sessionImage} flag={true} />
      <div className="content">
        {data ? (
          <div className="card">
            <div className="student_info">
              <h3>
                Check details thoroughly and click on &apos;Submit&apos; to
                Complete Registration
              </h3>
              <ul>
                <li className="holder">SDG:</li>
                <li className="value">
                  {data
                    ? data.map((element, index) => {
                        return index === 0 ? element.sdg : `,${element.sdg} `;
                      })
                    : "Loading..."}
                </li>
                <li className="holder">Topic:</li>
                <li className="value">{data ? topicName : "Loading..."}</li>
                <li className="holder">Teacher:</li>
                <li className="value">{data ? teacherName : "Loading..."}</li>
                <li className="holder">Email:</li>
                <li className="value">{data ? data[0].email : "Loading..."}</li>
                <li className="holder">Contact:</li>
                <li className="value">
                  {data ? data[0].contact : "Loading..."}
                </li>
                <li className="holder">School:</li>
                <li className="value">
                  {data ? data[0].department : "Loading..."}
                </li>
              </ul>
            </div>
            <div className="main">
              <div className="options">
                <Link
                  href={`/finalPage?sessionImage=${sessionImage}&teacher_id=${teacherId}&student_id=${studentId}`}
                >
                  <button className={rubik.className}>Submit</button>
                </Link>
              </div>
            </div>
          </div>
        ):<LandingPageLoader/>}
      </div>
      <FooterComponent />
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<TopicsLoader />}>
      <Confirmation />
    </Suspense>
  );
}
