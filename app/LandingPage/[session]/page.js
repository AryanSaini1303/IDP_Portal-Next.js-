"use client";
import { signOut, useSession } from "next-auth/react";
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
  const { data: session1, status } = useSession();
  const [alertShow, setAlertShow] = useState(false);
  useEffect(() => {
    setSession(JSON.parse(decodeURIComponent(params.session)));
  }, [params]);

  useEffect(() => {
    // console.log(status);
    if (status == "unauthenticated" && (session1 || session1 === null)) {
      alert("YOU NEED TO LOGIN⚠️");
      signOut({ callbackUrl: "/" }).then(() => {
        router.push("/");
      });
    }
  }, [status, router, session1]);

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
          console.log(data);
          data!=null?setStudentData(data):setStudentData(null);
        } catch (err) {
          console.error("Error fetching student data:", err);
        }
      }
    };
    fetchData();
  }, [session]);
  useEffect(() => {
    if (alertShow) {
      signOut({ callbackUrl: "/" }).then(() => {
        router.push("/");
      });
      setDataNotFound(true);
      alert("Sign in with official Email-id only!");
    }
  }, [alertShow]);
  console.log(studentData);
  console.log(alertShow);

  useEffect(() => {
    if (studentData === null) {
      setAlertShow(true);
    } else if (studentData && studentData.teacherId) {
      setRegistered(true);
    }
  }, [studentData, router]);

  if (!session) {
    return <p>Loading...</p>;
  }

  return !registered
    ? status === "authenticated" && (
        <NotRegisteredPage
          dataNotFound={dataNotFound}
          studentData={studentData}
          session={session}
        />
      )
    : status === "authenticated" && (
        <RegisteredPage
          dataNotFound={dataNotFound}
          studentData={studentData}
          session={session}
        />
      );
}
