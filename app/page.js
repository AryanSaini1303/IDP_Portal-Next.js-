"use client";
import style from "./page.module.css";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { Noto_Sans } from "next/font/google";
import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
const notoSans = Noto_Sans({
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {
  const { data: session } = useSession();
  const [screenWidth, setScreenWidth] = useState();
  // console.log(session);
  useEffect(() => {
    setScreenWidth(window.innerWidth);
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    session &&
      redirect(`/LandingPage/${encodeURIComponent(JSON.stringify(session))}`);
  }, [session]);
  return (
    <>
      <div className={style.container}>
        <section className={style.login}>
          <div className={style.logo}>
            <Image src={"/uniLogo.jpg"} width={screenWidth>615?180:150} height={screenWidth>615?70:65} alt="University Logo"/>
          </div>
          <Image
            src={"/login.jpg"}
            width={screenWidth > 617 ? 350 : 250}
            height={screenWidth > 617 ? 430 : 300}
            className={style.loginImage}
            alt="Login Illustration"
          />
          <button
            onClick={() => signIn("google")}
            className={`${style.googleLogin} ${notoSans.className}`}
          >
            <Image
              src={"/googleLogo.png"}
              width={screenWidth > 617 ? 30 : 26}
              height={screenWidth > 617 ? 30 : 26}
              alt="Google Logo"
            />
            <h3> Sign In With Google</h3>
          </button>
          <button
            onClick={() => signIn("github")}
            className={`${style.githubLogin} ${notoSans.className}`}
          >
            <Image
              src={"/githubLogo.png"}
              width={screenWidth > 617 ? 30 : 26}
              height={screenWidth > 617 ? 30 : 26}
              className={style.githubLogo}
              alt="Github Logo"
            />{" "}
            <h3> Sign In With Github</h3>
          </button>
          {/*Remove the provider name from the 'signIn' function and you'll get the default screen with default provider button*/}
        </section>
      </div>
    </>
  );
}
