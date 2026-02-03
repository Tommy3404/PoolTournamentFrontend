"use client";

import style from "./page.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";

/* ---------------- types ---------------- */

type Player = {
  id: number;
  name: string;
};

const STORAGE_KEY = "players";

/* ---------------- helpers ---------------- */

const getPlayers = (): Player[] => {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
};

/* ---------------- page ---------------- */

export default function PlayersGuest() {
  const [open, setOpen] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    // initial load
    setPlayers(getPlayers());

    // listen for updates from other pages / tabs
    const handleStorageChange = () => {
      setPlayers(getPlayers());
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <section className={style.playerpage}>
      {/* ---------- Header ---------- */}
      <div className={style.header}>
        <h1>ADET Pool Tournament</h1>

        <div className={style.options}>
          <button onClick={() => setOpen(true)}>Open Popup</button>

          {open && (
            <div className={style.popup}>
              <div className={style.popupinner}>
                <h2>Testing Popup</h2>
                <button onClick={() => setOpen(false)}>close</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ---------- Body ---------- */}
      <div className={style.body}>
        <div className={style.player}>
          <h2>Player List</h2>
        </div>

        <div className={style.playerinfo}>
          {players.length === 0 ? (
            <p>No players have been added yet.</p>
          ) : (
            <ul>
              {players.map((player) => (
                <li key={player.id}>
                  <Link href={`/players/${player.id}`}>
                    {player.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
