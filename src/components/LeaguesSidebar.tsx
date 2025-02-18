const LeaguesSidebar = () => {
  const leagues = [
    { name: "English Championship", icon: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
    { name: "NHL", icon: "🏒" },
    { name: "NFL", icon: "🏈" },
    { name: "MMA", icon: "🥊" },
    { name: "Ligue 1", icon: "🇫🇷" },
    { name: "Bundesliga", icon: "🇩🇪" },
    { name: "UEFA Europa League", icon: "🏆" },
    { name: "UEFA Conference League", icon: "🏆" },
    { name: "UEFA Champions League", icon: "⭐" },
    { name: "Formula 1", icon: "🏎" },
    { name: "Serie A", icon: "🇮🇹" },
    { name: "La Liga", icon: "🇪🇸" },
    { name: "Premier League", icon: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  ];

  return (
    <aside className="w-64 border-r p-4 space-y-2">
      <h2 className="font-semibold mb-4">Top Leagues</h2>
      {leagues.map((league, idx) => (
        <a
          key={idx}
          href="#"
          className="flex items-center space-x-2 p-2 rounded-lg hover:bg-accent/50 transition-colors"
        >
          <span>{league.icon}</span>
          <span className="text-sm">{league.name}</span>
        </a>
      ))}
    </aside>
  );
};

export default LeaguesSidebar; 