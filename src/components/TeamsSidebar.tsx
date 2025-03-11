import { useEffect, useState } from 'react';
import { fetchTeams } from '@/api/teamsLeagues';

const TeamsSidebar = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const data = await fetchTeams();
        const sortedTeams = [...data].sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));
        setTeams(sortedTeams);
      } catch (error) {
        console.error("Failed to fetch teams:", error);
      }
    };
    loadTeams();
  }, []);

  return (
    <div className="w-[250px] p-4">
      <h2 className="text-lg font-semibold mb-4">Teams</h2>

      {/* Mobile scroll view */}
      <div className="md:hidden overflow-y-auto max-h-[60vh] scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
        <div className="space-y-2">
          {teams.map((team) => (
            <div
              key={team._id}
              className="flex items-center p-2 rounded-lg hover:bg-accent cursor-pointer transition-colors"
            >
              <img
                src={team.logo}
                alt={team.name}
                className="w-6 h-6 mr-3"
              />
              <span className="text-sm">{team.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop view without scroll */}
      <div className="hidden md:block">
        <div className="space-y-2">
          {teams.map((team) => (
            <div
              key={team._id}
              className="flex items-center p-2 rounded-lg hover:bg-accent cursor-pointer transition-colors"
            >
              <img
                src={team.team_image}
                alt={team.name}
                className="w-6 h-6 mr-3 rounded-full"
              />
              <span className="text-sm">{team.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamsSidebar;
