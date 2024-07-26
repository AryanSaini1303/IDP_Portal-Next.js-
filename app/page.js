"use client";
import style from "./page.module.css";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { Noto_Sans } from "next/font/google";
const notoSans = Noto_Sans({
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {
  const { data: session } = useSession();
  console.log(session);
  if (session) {
    return (
      <>
        <img src={session.user.image} alt="" />
        <h1>{session.user.name}</h1>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign Out</button>
      </>
    );
  }
  return (
    <>
      <div className={style.container}>
        <section className={style.login}>
          <Image src={"/login.jpg"} width={350} height={430} className={style.loginImage}/>
          <button
            onClick={() => signIn("google")}
            className={`${style.googleLogin} ${notoSans.className}`}
          >
            <Image src={"/googleLogo.png"} width={30} height={30} />
            <h3> Sign In With Google</h3>
          </button>
          <button
            onClick={() => signIn("github")}
            className={`${style.githubLogin} ${notoSans.className}`}
          >
            <Image
              src={"/githubLogo.png"}
              width={30}
              height={30}
              className={style.githubLogo}
            />{" "}
            <h3> Sign In With Github</h3>
          </button>
          {/*Remove the provider name from the 'signIn' function and you'll get the default screen with default provider button (here, google)*/}
        </section>
      </div>
    </>
  );
}
