import Image from "next/image";
import style from "./page.module.css";
import Link from "next/dist/client/link";

export default function Home() {
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
        <input type="text" placeholder="Username" />
      </div>
      <div className={style.login2}>
        <input type="password" placeholder="Password" />
      </div>
      <div className={style.loginbutton}>
        {/* <button>Login</button> */}
        <Link href="/PlayersAdmin">Login</Link>
      </div>
      <div className={style.guestlink}>
        <Link href="/PlayersGuest">Continue as Guest</Link>
      </div>
    </div>

    </section>
    
  );
}
