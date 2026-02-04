"use client";

import { useState } from "react";
import Link from "next/link";
import style from "./page.module.css";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Replace these with your desired credentials
  const ADMIN_USERNAME = "adminonly";
  const ADMIN_PASSWORD = "#BeATiger";

  // Check if entered credentials match
  const isAdminValid =
    username === ADMIN_USERNAME && password === ADMIN_PASSWORD;

  return (
    <section className={style.loginpage}>
      <div className={style.header}>
        <h1>ADET Pool Tournament</h1>
      </div>

      <div className={style.body}>
        <div className={style.adminonly}>
          <h2>Admin Only</h2>
        </div>

        <div className={style.login1}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className={style.login2}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className={style.loginbutton}>
          {isAdminValid ? (
            <Link href="/PlayersAdmin">
              <button>Login</button>
            </Link>
          ) : (
            <button disabled style={{ opacity: 0.5, cursor: "not-allowed" }}>
              Login
            </button>
          )}
        </div>

        <div className={style.guestlink}>
          <Link href="/PlayersGuest">Continue as Guest</Link>
        </div>
      </div>
    </section>
  );
}
