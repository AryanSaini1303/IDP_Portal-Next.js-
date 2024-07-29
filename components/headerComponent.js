"use client"
import styles from "./headerComponent.module.css";
import { Rubik } from "next/font/google";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";// always import "useRouter" from "next/navigation"

const rubik = Rubik({
  weight: "400",
  subsets: ["latin"],
});

export default function HeaderComponent({studentData, session, flag, sessionImage}) {
  const router=useRouter();
  return (
    <div className={`${styles.header} ${rubik.className}`}>
      <abbr
        title="Logout"
        style={studentData||flag ? { opacity: 1 } : { opacity: 0 }}
      >
        <div className={styles.menu}>
          <button
            className={rubik.className}
            onClick={() => {
              signOut({ callbackUrl: "/" }).then(() => {
                router.push("/");
              });
            }}
          >
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <path d="M14 8V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2h7a2 2 0 002-2v-2" />
              <path d="M7 12h14l-3-3m0 6l3-3" />
            </svg>
          </button>
        </div>
      </abbr>
      <header>IDP Registration Portal</header>
      <img
        src={!sessionImage?session.user.image:sessionImage}
        alt="User's Image"
        style={studentData||flag ? { opacity: 1 } : { opacity: 0 }}
      />
    </div>
  );
}
