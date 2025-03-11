import { API_BASE_URL } from "@/config/api";

export const fetchTeams = async () => {
  const response = await fetch(`${API_BASE_URL}/api/teams`);
  const teams = await response.json();
  return teams.sort((a, b) => a.order - b.order); // Sort teams by order
};

export const fetchLeagues = async () => {
  const response = await fetch(`${API_BASE_URL}/api/leagues`);
  const leagues = await response.json();
  return leagues.sort((a, b) => a.order - b.order); // Sort leagues by order
};
