"use client";
import "./globals.css";
import FooterComponent from "@/components/footerComponent";
import HeaderComponent from "@/components/headerComponent";
import TopicsLoader from "@/components/topicsLoader";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Rubik } from "next/font/google";
import Image from "next/image";
import { signOut } from "next-auth/react";
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
  const [done, setDone] = useState();
  const [count,setCount]=useState(3);
  const router=useRouter();

  useEffect(() => {
    !localStorage.getItem("userData") &&
      signOut({ callbackUrl: "/" }).then(() => {
        router.push("/");
      });
  }, [localStorage.getItem("userData")]);

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

    updateStudent();
  }, [student_id,teacher_id]);
  useEffect(()=>{
    if(!done){setCount(3)};
    const countdown=setTimeout(() => {
      setCount(count-1);
    }, 1000);
    if(count===0){
      localStorage.removeItem("userData");
      signOut({callbackUrl:"/"}).then(()=>{
        router.push("/");
      })
    }
    return ()=>clearInterval(countdown);
  },[count,done])
  // console.log(count);

  return (
    <div className={`wrapper ${rubik.className}`}>
      <HeaderComponent sessionImage={sessionImage} flag={true} />
      <div className="content">
        <div className="finalCard">
          {done ? (
            <>
              <Image src={"/done.gif"} width={180} height={180} alt="Success" />
              <h2>Registration Successful</h2>
              <h4>You will be automatically logged out in {count}s</h4>
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
