"use client";
import { Rubik } from "next/font/google";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const rubik = Rubik({
  weight: "400",
  subsets: ["latin"],
});

export default function LandingPage({ params }) {
  const [session, setSession] = useState();
  const router = useRouter();

  useEffect(() => {
    setSession(JSON.parse(decodeURIComponent(params.session)));
  }, [params]);

  if (!session) {
    return <p>Loading...</p>;
  }

  return (
    <div className={`${"wrapper"} ${rubik.className}`}>
      <div className="header">
        <abbr title="Logout">
          <div className="menu">
            <button
              className={rubik.className}
              onClick={() => {
                signOut({ callbackUrl: "/" }).then(() => {
                  router.push("/");
                });
                {
                  /*Relying solely on callbackUrl might not always guarantee redirection due to potential issues with next-auth's internal handling. Using only router.push('/') might bypass next-auth's built-in sign-out process, which could lead to inconsistencies. Combining both ensures the user is redirected reliably while also leveraging next-auth's built-in functionality.
                  normally callbackUrl should handle the redirection after sign-out if next-auth is functioning correctly. It is designed to direct users to the specified route once the sign-out process completes. However, using router.push('/') as a fallback ensures that redirection happens even if there are issues with next-auth's handling, providing a more reliable user experience. */
                }
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
        <img src={session.user.image} alt="User's Image" />
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
                <button className={rubik.className}>Research</button>
              </a>
              <a href="/Business">
                <button className={rubik.className}>Business</button>
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
  );
}
