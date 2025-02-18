import { createContext, useContext, useState } from 'react';

interface TeamsLeaguesContextType {
  teams: any[];
  leagues: any[];
  updateTeams: (newTeams: any[]) => void;
  updateLeagues: (newLeagues: any[]) => void;
}

const TeamsLeaguesContext = createContext<TeamsLeaguesContextType>({
  teams: [],
  leagues: [],
  updateTeams: () => {},
  updateLeagues: () => {},
});

export const TeamsLeaguesProvider = ({ children }: { children: React.ReactNode }) => {
  const [teams, setTeams] = useState<any[]>([]);
  const [leagues, setLeagues] = useState<any[]>([]);

  const updateTeams = (newTeams: any[]) => {
    setTeams(newTeams);
  };

  const updateLeagues = (newLeagues: any[]) => {
    setLeagues(newLeagues);
  };

  return (
    <TeamsLeaguesContext.Provider value={{ teams, leagues, updateTeams, updateLeagues }}>
      {children}
    </TeamsLeaguesContext.Provider>
  );
};

export const useTeamsLeagues = () => useContext(TeamsLeaguesContext); 