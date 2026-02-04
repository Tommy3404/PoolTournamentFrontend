"use client";

import style from "./page.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";

/* ---------------- types ---------------- */

type Player = {
  id: number;
  disName: string;
  wins: number;
  losses: number;
};

const BACKEND = "https://pool-tournament-challenge-backend.vercel.app";

/* ---------------- helpers ---------------- */

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
  const [wins, setWins] = useState<string>("");
  const [losses, setLosses] = useState<string>("");

  /* ---------- fetch players ---------- */

  const fetchPlayers = async () => {
    const res = await fetch(`${BACKEND}/players`);
    const data = await res.json();
    console.log(data);
    
    setPlayers(data);
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  /* ---------- handlers ---------- */

  const openAddPopup = () => {
    setEditingPlayer(null);
    setName("");
    setWins("");
    setLosses("");
    setShowPopup(true);
  };

  const openEditPopup = (player: Player) => {
    setEditingPlayer(player);
    setName(player.disName);
    setWins(player.wins.toString());
    setLosses(player.losses.toString());
    setShowPopup(true);
  };

  const savePlayer = async () => {
    const parsedWins = Number(wins) || 0;
    const parsedLosses = Number(losses) || 0;

    if (editingPlayer) {
      await fetch(`${BACKEND}/players/${editingPlayer.id}/record`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          newName: name,
          wins: parsedWins,
          losses: parsedLosses,
        }),
      });
    } else {
      await fetch(`${BACKEND}/players`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          displayName: name,
          wins: parsedWins,
          losses: parsedLosses,
          tournamentId: "f8cefaff-fedb-4775-ad05-8006cc2b3dbd"
        }),
      });
    }

    await fetchPlayers();
    setShowPopup(false);
  };

  const deletePlayer = async (id: number) => {
    await fetch(`${BACKEND}/players/${id}`, {
      method: "DELETE",
    });

    await fetchPlayers();
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

        <div className={style.playerinfo}>
          {players.length === 0 ? (
            <p>No players added yet.</p>
          ) : (
            <ul>
              {players.map((player) => (
                <li key={player.id}>
                  <strong>{player.disName}</strong> — {player.wins}W /{" "}
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
                onChange={(e) => setWins(e.target.value)}
              />
              <input
                type="number"
                placeholder="Losses"
                value={losses}
                onChange={(e) => setLosses(e.target.value)}
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
