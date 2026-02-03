"use client";

import style from "./page.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";

/* ---------------- types ---------------- */

type Player = {
  id: number;
  name: string;
  wins: number;
  losses: number;
};

const STORAGE_KEY = "players";

/* ---------------- helpers ---------------- */

const getPlayers = (): Player[] => {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
};

const getWinPercentage = (wins: number, losses: number) => {
  const total = wins + losses;
  if (total === 0) return 0;
  return Math.round((wins / total) * 100);
};

/* ---------------- page ---------------- */

export default function PlayersGuest() {
  const [open, setOpen] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    setPlayers(getPlayers());

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

          {/* ---------- Popup ---------- */}
          {open && (
            <div className={style.popup}>
              <div className={style.popupinner}>
                <h2>
                  <Link href="/">Back to Login</Link>
                </h2>
                <button onClick={() => setOpen(false)}>Close</button>
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
                  <p data-player-id={player.id}>
                    <strong>{player.name}</strong> — {player.wins}W /{" "}
                    {player.losses}L (
                    {getWinPercentage(player.wins, player.losses)}%)
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
