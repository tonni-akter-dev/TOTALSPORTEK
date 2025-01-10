import { Card, CardContent } from "@/components/ui/card";

interface LeagueOrTeam {
  name: string;
  logo: string;
}

const topLeagues: LeagueOrTeam[] = [
  { name: "English Championship", logo: "/lovable-uploads/60e82299-8129-4e0d-b0d2-c3b0715318bc.png" },
  { name: "La Liga", logo: "/lovable-uploads/60e82299-8129-4e0d-b0d2-c3b0715318bc.png" },
  { name: "Serie A", logo: "/lovable-uploads/60e82299-8129-4e0d-b0d2-c3b0715318bc.png" },
  { name: "Formula 1", logo: "/lovable-uploads/60e82299-8129-4e0d-b0d2-c3b0715318bc.png" },
  { name: "UEFA Champions League", logo: "/lovable-uploads/60e82299-8129-4e0d-b0d2-c3b0715318bc.png" },
  { name: "Bundesliga", logo: "/lovable-uploads/60e82299-8129-4e0d-b0d2-c3b0715318bc.png" }
];

const topTeams: LeagueOrTeam[] = [
  { name: "Manchester United", logo: "/lovable-uploads/60e82299-8129-4e0d-b0d2-c3b0715318bc.png" },
  { name: "Liverpool", logo: "/lovable-uploads/60e82299-8129-4e0d-b0d2-c3b0715318bc.png" },
  { name: "Barcelona", logo: "/lovable-uploads/60e82299-8129-4e0d-b0d2-c3b0715318bc.png" },
  { name: "Manchester City", logo: "/lovable-uploads/60e82299-8129-4e0d-b0d2-c3b0715318bc.png" },
  { name: "Chelsea", logo: "/lovable-uploads/60e82299-8129-4e0d-b0d2-c3b0715318bc.png" },
  { name: "Arsenal", logo: "/lovable-uploads/60e82299-8129-4e0d-b0d2-c3b0715318bc.png" }
];

const TopSections = () => {
  return (
    <div className="container mx-auto px-4 py-12 grid md:grid-cols-2 gap-8">
      {/* Top Leagues Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Top Leagues</h2>
        <div className="grid grid-cols-2 gap-4">
          {topLeagues.map((league, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-4 flex items-center space-x-3">
                <img
                  src={league.logo}
                  alt={league.name}
                  className="w-8 h-8 object-contain"
                />
                <span className="text-sm font-medium">{league.name}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Top Teams Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Top Teams</h2>
        <div className="grid grid-cols-2 gap-4">
          {topTeams.map((team, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-4 flex items-center space-x-3">
                <img
                  src={team.logo}
                  alt={team.name}
                  className="w-8 h-8 object-contain"
                />
                <span className="text-sm font-medium">{team.name}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopSections;