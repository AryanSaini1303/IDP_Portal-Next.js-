"use client";
import style from "./page.module.css";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { Noto_Sans, Rubik } from "next/font/google";
import { useEffect, useState } from "react";
const notoSans = Noto_Sans({
  weight: "400",
  subsets: ["latin"],
});
const rubik = Rubik({
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {
  const { data: session } = useSession();
  const [menuClick, setMenuClick] = useState();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [mouseHover, setMouseHover] = useState();
  // console.log(session);
  function menuClickFunc() {
    setMenuClick(!menuClick);
  }
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  function handleMouseHover() {
    setMouseHover(true);
  }

  if (session) {
    return (
      <>
        <div className={`${"wrapper"} ${rubik.className}`}>
          <div className="header">
            {menuClick && (
              <div className="menu">
                <button
                  className={rubik.className}
                  onClick={() => {
                    signOut();
                  }}
                  onMouseDown={handleMouseHover}
                >
                  {screenWidth >= 574 ? (
                    "Sign Out"
                  ) : (
                    <Image src={"/logout.png"} height={10} width={10} alt="Logout Illustration"/>
                  )}
                </button>
              </div>
            )}
            <div></div>
            <header>IDP Registration Portal</header>
            <img
              src={session.user.image}
              onClick={menuClickFunc}
              tabIndex={0}
              onBlur={() => {
                !mouseHover && setMenuClick(false);
              }}
              alt="User's Image"
            />
          </div>
          <div className="content">
            <div className="card">
              <div className="student_info">
                <ul>
                  <li className="holder">Name:</li>
                  <li className="value">{session.user.name}</li>
                  <li className="holder">Admission:</li>
                  <li className="value">admission</li>
                  <li className="holder">Enrollment:</li>
                  <li className="value">enrollment</li>
                  <li className="holder">Program:</li>
                  <li className="value">program</li>
                  <li className="holder">School:</li>
                  <li className="value">school</li>
                  <li className="holder">Contact:</li>
                  <li className="value">contact</li>
                  <li className="holder">Email:</li>
                  <li className="value">{session.user.email}</li>
                </ul>
              </div>
              <div className="main">
                <h1>Choose Your Category</h1>
                <div className="options">
                  <a href="/Research">
                    <button>Research</button>
                  </a>
                  <a href="/Business">
                    <button>Business</button>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <footer>
            <p>&copy; 2024 IDP Registration Portal. All rights reserved.</p>
            <div className="icons8">
              <a
                target="_blank"
                href="https://icons8.com/icon/xrwE2Qxg9XYK/hand-cursor"
              >
                Cursor
              </a>
              icon by{" "}
              <a target="_blank" href="https://icons8.com">
                Icons8
              </a>
            </div>
          </footer>
        </div>
      </>
    );
  }
  return (
    <>
      <div className={style.container}>
        <section className={style.login}>
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
              width={30}
              height={30}
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
              width={30}
              height={30}
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
