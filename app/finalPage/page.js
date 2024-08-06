"use client";
import "./globals.css";
import FooterComponent from "@/components/footerComponent";
import HeaderComponent from "@/components/headerComponent";
import TopicsLoader from "@/components/topicsLoader";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Rubik } from "next/font/google";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const rubik = Rubik({
  weight: "400",
  subsets: ["latin"],
});

function Final() {
  const params = useSearchParams();
  const sessionImage = params.get("sessionImage");
  const student_id = params.get("student_id");
  const teacher_id = params.get("teacher_id");
  const currentSchool = params.get("currentSchool");
  const [done, setDone] = useState();
  const [count, setCount] = useState(3);
  const router = useRouter();
  const [confirmed, setConfirmed] = useState();
  const [schools, setSchools] = useState();
  const { data: session, status } = useSession();
  console.log(teacher_id);
  console.log(currentSchool);

  useEffect(() => {
    // console.log(status);
    // console.log(session);
    if (status === "unauthenticated" && (session || session === null)) {
      alert("YOU NEED TO LOGIN FIRST⚠️");
      signOut({ callbackUrl: "/" }).then(() => {
        router.push("/");
      });
    }
  }, [status, router, session]);

  useEffect(() => {
    const fetchData = async () => {
      if (teacher_id) {
        try {
          const response = await fetch(
            `/api/topicConfirmation?teacherId=${encodeURIComponent(teacher_id)}`
          );
          if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
          }
          const data = await response.json();
          setSchools(data);
        } catch (err) {
          console.error("Error fetching schools data:", err);
        }
      }
    };
    fetchData();
  }, [teacher_id]);

  console.log(schools);
  useEffect(() => {
    if (schools && schools.length >= 8) {
      setConfirmed(false);
    } else {
      schools &&
        schools.map((school) => {
          if (school.school === currentSchool) {
            setConfirmed(false);
          } else {
            setConfirmed(true);
          }
        });
    }
  }, [schools]);
  console.log(confirmed);
  useEffect(() => {
    if (confirmed === false) {
      alert("No Eligible Seats Available For This Project, Kindly Select Other Project.");
      // signOut({ callbackUrl: "/" }).then(() => {
      //   router.push("/");
      // });
      window.history.go(-2);
    }
  }, [confirmed]);

  useEffect(() => {
    const updateStudent = async () => {
      try {
        const response = await fetch("/api/updateStudent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ teacher_id, student_id }),
        });
        if (!response.ok) {
          throw new Error("Failed to update student");
        }
        const result = await response.json();
        console.log(result.message);
        setDone(true); // Optional: handle success
      } catch (error) {
        console.error(error); // Optional: handle error
      }
    };
    confirmed && updateStudent();
  }, [student_id, teacher_id, confirmed]);

  useEffect(() => {
    if (!done) {
      setCount(3);
    }
    const countdown = setTimeout(() => {
      setCount(count - 1);
    }, 1000);
    if (count === 0) {
      signOut({ callbackUrl: "/" }).then(() => {
        router.push("/");
      });
    }
    return () => clearInterval(countdown);
  }, [count, done, router]);
  // console.log(count);

  return (
    <div className={`wrapper ${rubik.className}`}>
      <HeaderComponent sessionImage={sessionImage} flag={true} />
      <div className="content">
        <div className="finalCard">
          {done ? (
            <>
              <Image
                src={"/done.gif"}
                width={180}
                height={180}
                alt="Success"
                unoptimized
              />
              <h2>Registration Successful</h2>
              <h4>
                {count === -1
                  ? "You were logged out!"
                  : `You will be automatically logged out in ${count}s`}
              </h4>
            </>
          ) : (
            "Updating Records..."
          )}
        </div>
      </div>
      <FooterComponent />
    </div>
  );
}

export default function FinalPage() {
  return (
    <Suspense fallback={<TopicsLoader />}>
      <Final />
    </Suspense>
  );
}
