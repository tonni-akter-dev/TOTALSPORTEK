import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Users, Star, TrendingUp } from "lucide-react";

interface LeagueOrTeam {
  name: string;
  logo: string;
  description?: string;
  stats?: string;
  activeTeams?: number;
  ranking?: number;
}

const topLeagues: LeagueOrTeam[] = [
  { 
    name: "English Championship", 
    logo: "/lovable-uploads/60e82299-8129-4e0d-b0d2-c3b0715318bc.png",
    description: "England's top football division",
    activeTeams: 20
  },
  { 
    name: "La Liga", 
    logo: "/lovable-uploads/60e82299-8129-4e0d-b0d2-c3b0715318bc.png",
    description: "Spanish premier football league",
    activeTeams: 20
  },
  { 
    name: "Serie A", 
    logo: "/lovable-uploads/60e82299-8129-4e0d-b0d2-c3b0715318bc.png",
    description: "Italian professional football league",
    activeTeams: 20
  },
  { 
    name: "Formula 1", 
    logo: "/lovable-uploads/60e82299-8129-4e0d-b0d2-c3b0715318bc.png",
    description: "Premier motorsport championship",
    activeTeams: 10
  },
  { 
    name: "UEFA Champions League", 
    logo: "/lovable-uploads/60e82299-8129-4e0d-b0d2-c3b0715318bc.png",
    description: "Elite European club competition",
    activeTeams: 32
  },
  { 
    name: "Bundesliga", 
    logo: "/lovable-uploads/60e82299-8129-4e0d-b0d2-c3b0715318bc.png",
    description: "German professional football league",
    activeTeams: 18
  }
];

const topTeams: LeagueOrTeam[] = [
  { 
    name: "Manchester United", 
    logo: "/lovable-uploads/60e82299-8129-4e0d-b0d2-c3b0715318bc.png",
    ranking: 1,
    stats: "Won last 5 matches"
  },
  { 
    name: "Liverpool", 
    logo: "/lovable-uploads/60e82299-8129-4e0d-b0d2-c3b0715318bc.png",
    ranking: 2,
    stats: "3 wins, 2 draws"
  },
  { 
    name: "Barcelona", 
    logo: "/lovable-uploads/60e82299-8129-4e0d-b0d2-c3b0715318bc.png",
    ranking: 3,
    stats: "Top scorer in La Liga"
  },
  { 
    name: "Manchester City", 
    logo: "/lovable-uploads/60e82299-8129-4e0d-b0d2-c3b0715318bc.png",
    ranking: 4,
    stats: "League champions"
  },
  { 
    name: "Chelsea", 
    logo: "/lovable-uploads/60e82299-8129-4e0d-b0d2-c3b0715318bc.png",
    ranking: 5,
    stats: "Unbeaten in 10 games"
  },
  { 
    name: "Arsenal", 
    logo: "/lovable-uploads/60e82299-8129-4e0d-b0d2-c3b0715318bc.png",
    ranking: 6,
    stats: "Best defense record"
  }
];

const TopSections = () => {
  return (
    <div className="container mx-auto px-4 py-12 space-y-12">
      <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
        Leagues & Top Teams
      </h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Top Leagues Section */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-6">
            <Trophy className="w-6 h-6 text-gray-700" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Top Leagues</h2>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {topLeagues.map((league, index) => (
              <Card 
                key={index} 
                className="hover:shadow-lg transition-shadow duration-200 animate-fadeIn"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-4 flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <img
                      src={league.logo}
                      alt={league.name}
                      className="w-12 h-12 object-contain"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{league.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{league.description}</p>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Users className="w-4 h-4" />
                    <span>{league.activeTeams} teams</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Top Teams Section */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-6">
            <Star className="w-6 h-6 text-gray-700" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Top Teams</h2>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {topTeams.map((team, index) => (
              <Card 
                key={index} 
                className="hover:shadow-lg transition-shadow duration-200 animate-fadeIn"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-4 flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <img
                      src={team.logo}
                      alt={team.name}
                      className="w-12 h-12 object-contain"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{team.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{team.stats}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium text-gray-700">Rank {team.ranking}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopSections;