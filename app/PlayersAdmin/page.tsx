import Image from "next/image";
import style from "./page.module.css";
import Link from "next/dist/client/link";

export default function PlayersAdmin() {
    
  return (
    <section className={style.playerpage}>
         <div className={style.header}>
      <h1>ADET Pool Tournament</h1>
    </div>
    <div className={style.body}>
        <div className={style.player}>
            <h2>Player List</h2>
        </div>
        <div className={style.buttons}>
                <div className={style.button1}>
                <button>Edit</button>
            </div>
            <div className={style.button2}>
                <button>Add</button>
            </div>
            </div>
        <div className={style.playerinfo}>
            <p>placeholder</p>
        </div>
        </div>
    </section>
    
  );
}
