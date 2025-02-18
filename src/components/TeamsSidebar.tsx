const TeamsSidebar = () => {
  const teams = [
    { name: "Cardiff City", image: "/teams/cardiff-city.avif" },
    { name: "Blackburn Rovers", image: "/teams/blackburn-rovers.avif" },
    { name: "Everton", image: "/teams/everton.avif" },
    { name: "Arsenal", image: "/teams/arsenal.avif" },
    { name: "Liverpool", image: "/teams/liverpool.avif" },
    { name: "Barcelona", image: "/teams/barcelona.avif" },
    { name: "Chelsea", image: "/teams/chelsea.avif" },
    { name: "Juventus", image: "/teams/juventus.avif" },
    { name: "Manchester City", image: "/teams/manchester-city.avif" },
    { name: "Tottenham Hotspur", image: "/teams/tottenham-hotspur.avif" },
    { name: "PSG", image: "/teams/psg.avif" },
    { name: "Manchester United", image: "/teams/manchester-united.avif" }
  ];

  return (
    <aside className="w-64 border-l p-4 space-y-2">
      <h2 className="font-semibold mb-4">Top Teams</h2>
      {teams.map((team, idx) => (
        <a
          key={idx}
          href="#"
          className="flex items-center space-x-3 p-2 rounded-lg hover:bg-accent/50 transition-colors"
        >
          <img 
            src={team.image} 
            alt={team.name} 
            className="w-6 h-6 object-contain rounded-sm"
          />
          <span className="text-sm">{team.name}</span>
        </a>
      ))}
    </aside>
  );
};

export default TeamsSidebar; 