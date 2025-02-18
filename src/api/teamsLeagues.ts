export const fetchTeams = async () => {
  const response = await fetch('/api/teams');
  return response.json();
};

export const fetchLeagues = async () => {
  const response = await fetch('/api/leagues');
  return response.json();
}; 