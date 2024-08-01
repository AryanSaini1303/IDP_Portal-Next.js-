"use client";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NotRegisteredPage from "@/components/notRegisteredPage";
import RegisteredPage from "@/components/registeredPage";

export default function LandingPage({ params }) {
  const [session, setSession] = useState();
  const [studentData, setStudentData] = useState();
  const [dataNotFound, setDataNotFound] = useState(false);
  const [registered, setRegistered] = useState(false);
  const router = useRouter();
  console.log(studentData);
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
          localStorage.setItem("userData", JSON.stringify(data));
        } catch (err) {
          console.error("Error fetching student data:", err);
        }
      }
    };
    fetchData();
  }, [session]);

  console.log(studentData);

  useEffect(() => {
    if (studentData === null && router.pathname !== "/") {
      signOut({ callbackUrl: "/" }).then(() => {
        router.push("/");
      });
      setDataNotFound(true);
      alert("Sign in with official Email-id only!");
    } else if (studentData && studentData.teacherId) {
      setRegistered(true);
    }
  }, [studentData, router]);

  if (!session) {
    return <p>Loading...</p>;
  }

  return !registered ? (
    <NotRegisteredPage
      dataNotFound={dataNotFound}
      studentData={studentData}
      session={session}
    />
  ) : (
    <RegisteredPage
      dataNotFound={dataNotFound}
      studentData={studentData}
      session={session}
    />
  );
}
