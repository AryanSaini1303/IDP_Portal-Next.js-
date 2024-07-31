"use client";

import FooterComponent from "@/components/footerComponent";
import HeaderComponent from "@/components/headerComponent";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { Rubik } from "next/font/google";
import TopicsLoader from "@/components/topicsLoader";
import { useRouter } from "next/navigation";
import "./globals.css";

const rubik = Rubik({
  weight: "400",
  subsets: ["latin"],
});

function Topics() {
  const params = useSearchParams();
  const sdg = params.get("SDG");
  const category = params.get("category");
  const sessionImage = params.get("image");
  const currentSchool = params.get("current_school");
  const studentId = params.get("student_id");
  const [topicsData, setTopicsData] = useState();
  const router = useRouter();
  const [dataNotFound, setDataNotFound] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (sdg && category) {
        try {
          const response = await fetch(
            `/api/getCurrentSdgTopics?sdg=${sdg}&category=${category}&current_school=${currentSchool}`
          );
          if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
          }
          const data = await response.json();
          setTopicsData(data);
          console.log(data);
        } catch (err) {
          console.error("Error fetching topics data:", err);
        }
      }
    };
    fetchData();
    !localStorage.getItem("userData") &&
      signOut({ callbackUrl: "/" }).then(() => {
        router.push("/");
      });
  }, [sdg, category, router]);

  useEffect(() => {
    if (topicsData && topicsData.length === 0) {
      setDataNotFound(true);
    }
  }, [topicsData]);

  useEffect(() => {
    if (dataNotFound) {
      const timeoutId = setTimeout(() => {
        alert(`No topics available for SDG ${sdg}`);
        router.back();
      }, 10);
      return () => clearTimeout(timeoutId); // Clean up the timeout on unmount
    }
  }, [dataNotFound, sdg, router]);

  return (
    <div className={`${"wrapper"} ${rubik.className}`}>
      <HeaderComponent sessionImage={sessionImage} flag={true} />
      <div className="cards">
        <ul>
          {topicsData
            ? topicsData.map((topicData, index) => (
                <li key={index}>
                  <Link
                    href={`/confirmation?sessionImage=${sessionImage}&topic_name=${encodeURIComponent(
                      topicData.project_title
                    )}&teacher_name=${encodeURIComponent(
                      topicData.teacher
                    )}&student_id=${encodeURIComponent(studentId)}&teacher_id=${
                      topicData.id
                    }`}
                    style={{ textDecoration: "none" }}
                  >
                    <h1 className={rubik.className}>
                      {topicData.project_title}
                    </h1>
                    <div className="teachers_info">
                      <h2>{topicData.teacher}</h2>
                      <p>{topicData.designation}</p>
                    </div>
                  </Link>
                </li>
              ))
            : !dataNotFound && <TopicsLoader />}
        </ul>
      </div>
      <FooterComponent />
    </div>
  );
}

export default function TopicsPage() {
  return (
    <Suspense fallback={<TopicsLoader />}>
      <Topics />
    </Suspense>
  );
}
