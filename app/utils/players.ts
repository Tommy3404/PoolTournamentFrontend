export type Player = {
  id: number;
  name: string;
};

const KEY = "players";

export const getPlayers = (): Player[] => {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(KEY) || "[]");
};

export const savePlayers = (players: Player[]) => {
  localStorage.setItem(KEY, JSON.stringify(players));
};
