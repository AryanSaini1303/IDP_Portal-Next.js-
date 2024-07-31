"use client";
import "./globals.css";
import FooterComponent from "@/components/footerComponent";
import HeaderComponent from "@/components/headerComponent";
import TopicsLoader from "@/components/topicsLoader";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Rubik } from "next/font/google";

const rubik = Rubik({
  weight: "400",
  subsets: ["latin"],
});

function Confirmation() {
  const params = useSearchParams();
  const sessionImage = params.get("sessionImage");
  const topicName = decodeURIComponent(params.get("topic_name"));
  const teacherName = decodeURIComponent(params.get("teacher_name"));
  const [sdgs, setSdgs] = useState();

  useEffect(() => {
    const fetchData = async () => {
      if (topicName) {
        try {
          const response = await fetch(
            `/api/getCurrentTopicSdgs?topicName=${encodeURIComponent(topicName)}`
          );
          if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
          }
          const data = await response.json();
          setSdgs(data);
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
        <div className="card">
          <div className="student_info">
            <h3>
              Check details thoroughly and click on &apos;Submit&apos; to Complete
              Registration
            </h3>
            <ul>
              <li className="holder">SDG:</li>
              <li className="value">
                {sdgs ? sdgs.map((sdg, index) => {
                  return index === 0 ? sdg.sdg : `,${sdg.sdg} `;
                }) : "Loading..."}
              </li>
              <li className="holder">Topic:</li>
              <li className="value">{topicName}</li>
              <li className="holder">Teacher:</li>
              <li className="value">{teacherName}</li>
            </ul>
          </div>
          <div className="main">
            <div className="options">
              <a href="/selection">
                <button className={rubik.className}>Submit</button>
              </a>
            </div>
          </div>
        </div>
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
