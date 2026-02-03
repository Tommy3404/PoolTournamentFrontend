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

const savePlayers = (players: Player[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(players));
};

const getWinPercentage = (wins: number, losses: number) => {
  const total = wins + losses;
  if (total === 0) return 0;
  return Math.round((wins / total) * 100);
};

/* ---------------- page ---------------- */

export default function PlayersAdmin() {
    const [open, setOpen] = useState(false);
    
  const [players, setPlayers] = useState<Player[]>([]);
  const [editMode, setEditMode] = useState(false);

  const [showPopup, setShowPopup] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);

  const [name, setName] = useState("");
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);

  useEffect(() => {
    setPlayers(getPlayers());
  }, []);

  /* ---------- handlers ---------- */

  const openAddPopup = () => {
    setEditingPlayer(null);
    setName("");
    setWins(0);
    setLosses(0);
    setShowPopup(true);
  };

  const openEditPopup = (player: Player) => {
    setEditingPlayer(player);
    setName(player.name);
    setWins(player.wins);
    setLosses(player.losses);
    setShowPopup(true);
  };

  const savePlayer = () => {
    let updatedPlayers: Player[];

    if (editingPlayer) {
      updatedPlayers = players.map((p) =>
        p.id === editingPlayer.id
          ? { ...p, name, wins, losses }
          : p
      );
    } else {
      updatedPlayers = [
        ...players,
        {
          id: Date.now(),
          name,
          wins,
          losses,
        },
      ];
    }

    setPlayers(updatedPlayers);
    savePlayers(updatedPlayers);
    setShowPopup(false);
  };

  const deletePlayer = (id: number) => {
    const updatedPlayers = players.filter((p) => p.id !== id);
    setPlayers(updatedPlayers);
    savePlayers(updatedPlayers);
  };

  /* ---------------- render ---------------- */

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
          <h2>
            <Link href="/">Back to Login</Link>
          </h2>

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

        {/* ---------- Buttons ---------- */}
        <div className={style.buttons}>
          <div className={style.button1}>
            <button onClick={() => setEditMode(!editMode)}>
              {editMode ? "Done" : "Edit"}
            </button>
          </div>
          <div className={style.button2}>
            <button onClick={openAddPopup}>Add</button>
          </div>
        </div>

        {/* ---------- Player List ---------- */}
        <div className={style.playerinfo}>
          {players.length === 0 ? (
            <p>No players added yet.</p>
          ) : (
            <ul>
              {players.map((player) => (
                <li key={player.id}>
                  <strong>{player.name}</strong> — {player.wins}W /{" "}
                  {player.losses}L (
                  {getWinPercentage(player.wins, player.losses)}%)

                  {editMode && (
                    <div className={style.playerActions}>
                      <button onClick={() => openEditPopup(player)}>
                        Edit
                      </button>
                      <button onClick={() => deletePlayer(player.id)}>
                        Delete
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* ---------- Popup ---------- */}
      {showPopup && (
        <div className={style.popup}>
          <div className={style.popupinner}>
            <h2>{editingPlayer ? "Edit Player" : "Add Player"}</h2>

            <div className={style.popupfields}>
              <input
                type="text"
                placeholder="Player name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                type="number"
                placeholder="Wins"
                value={wins}
                onChange={(e) => setWins(Number(e.target.value))}
              />

              <input
                type="number"
                placeholder="Losses"
                value={losses}
                onChange={(e) => setLosses(Number(e.target.value))}
              />
            </div>

            <div className={style.popupbuttons}>
              <button onClick={savePlayer}>
                {editingPlayer ? "Save" : "Add"}
              </button>
              <button onClick={() => setShowPopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
