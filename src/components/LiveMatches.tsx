// import { ExternalLink } from "lucide-react";
// import { Card } from "@/components/ui/card";
// import { useNavigate } from "react-router-dom";

// const LiveMatches = () => {
//   const navigate = useNavigate();
  
//   const matches = [
//     {
//       league: "UEFA Champions League",
//       icon: "/UEFA Champions League.avif",
//       matches: [
//         { id: "1", team1: "Club Brugge", team2: "Atalanta", status: "Event Ended" },
//         { id: "2", team1: "AS Monaco", team2: "Benfica", status: "Live Now!" },
//         { id: "3", team1: "Celtic", team2: "Bayern Munich", status: "Live Now!" },
//         { id: "4", team1: "Feyenoord", team2: "AC Milan", status: "Live Now!" },
//       ]
//     },
//     {
//       league: "Premier League",
//       icon: "/Premier League.avif",
//       matches: [
//         { id: "5", team1: "Everton", team2: "Liverpool", status: "Live Now!" },
//       ]
//     },
//     {
//       league: "English Championship",
//       icon: "/English Championship.avif",
//       matches: [
//         { id: "6", team1: "Sheffield United", team2: "Middlesbrough", status: "Live Now!" },
//       ]
//     },
//     {
//       league: "Saudi Pro League",
//       icon: "/Saudi Pro League.avif",
//       matches: [
//         { id: "7", team1: "Al Ahli", team2: "Al Nassr", time: "Starts In: 21:26:30" },
//       ]
//     },
//     {
//       league: "UEFA Conference League",
//       icon: "/UEFA Conference League.avif",
//       matches: [
//         { id: "8", team1: "Molde", team2: "Shamrock Rovers", time: "Starts In: 21:41:30" },
//         { id: "9", team1: "Celje", team2: "APOEL Nicosia", time: "Starts In: 21:41:30" },
//         { id: "10", team1: "Vikingur Reykjavik", team2: "Panathinaikos", time: "Starts In: 21:41:30" },
//         { id: "11", team1: "TSC Backa", team2: "Jagiellonia Bialystok", time: "Starts In: 21:41:30" },
//         { id: "12", team1: "AA Gent", team2: "Real Betis", time: "Starts In: 23:56:30" },
//         { id: "13", team1: "Omonia Nicosia", team2: "Palos FC", time: "Starts In: 23:56:30" },
//         { id: "14", team1: "Borac Banja Luka", team2: "Olimpija Ljubljana", time: "Starts In: 23:56:30" },
//         { id: "15", team1: "Copenhagen", team2: "Heidenheim", time: "Starts In: 23:56:30" },
//       ]
//     },
//     {
//       league: "UEFA Europa League",
//       icon: "/UEFA Europa League.avif",
//       matches: [
//         { id: "16", team1: "Fenerbahce", team2: "Anderlecht", time: "Starts In: 21:41:30" },
//         { id: "17", team1: "Midtjylland", team2: "Real Sociedad", time: "Starts In: 21:41:30" },
//         { id: "18", team1: "Union St Gilloise", team2: "Ajax", time: "Starts In: 21:41:30" },
//         { id: "19", team1: "Ferencvaros", team2: "Viktoria Plzen", time: "Starts In: 21:41:30" },
//         { id: "20", team1: "FC Porto", team2: "Roma", time: "Starts In: 23:56:30" },
//         { id: "21", team1: "AZ Alkmaar", team2: "Galatasaray", time: "Starts In: 23:56:30" },
//         { id: "22", team1: "PAOK Thessaloniki", team2: "FCSB", time: "Starts In: 23:56:30" },
//         { id: "23", team1: "Twente", team2: "Besiktas", time: "Starts In: 23:56:30" },
//       ]
//     },
//     {
//       league: "English League Two",
//       icon: "/English League Two.avif",
//       matches: [
//         { id: "24", team1: "Port Vale", team2: "Notts County", time: "Starts In: 23:56:30" },
//       ]
//     },
//   ];

//   const handleMatchClick = (matchId: string) => {
//     navigate(`/stream/${matchId}`);
//   };

//   return (
//     <div className="space-y-4">
//       {matches.map((league, idx) => (
//         <div key={idx} className="space-y-2">
//           <div className="flex items-center space-x-2">
//             <img 
//               src={league.icon} 
//               alt={league.league} 
//               className="w-6 h-6 object-contain rounded-sm"
//             />
//             <h2 className="text-lg font-semibold">{league.league}</h2>
//           </div>
//           {league.matches.map((match) => (
//             <Card 
//               key={match.id} 
//               className="bg-[#2a2a2a] hover:bg-[#333333] transition-colors cursor-pointer"
//               onClick={() => handleMatchClick(match.id)}
//             >
//               <div className="p-4 flex items-center justify-between">
//                 <div>
//                   <div className="flex items-center space-x-4">
//                     <span className="text-sm">{match.team1}</span>
//                     <span className="text-sm text-gray-400">vs</span>
//                     <span className="text-sm">{match.team2}</span>
//                   </div>
//                   <div className="text-sm text-orange-500 mt-1">
//                     {match.status || match.time}
//                   </div>
//                 </div>
//                 <ExternalLink className="h-4 w-4 text-gray-400" />
//               </div>
//             </Card>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default LiveMatches;



import { ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useTheme } from "next-themes";

const LiveMatches = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  
  const matches = [
    {
      league: "UEFA Champions League",
      icon: "/UEFA Champions League.avif",
      matches: [
        { id: "1", team1: "Club Brugge", team2: "Atalanta", status: "Event Ended" },
        { id: "2", team1: "AS Monaco", team2: "Benfica", status: "Live Now!" },
        { id: "3", team1: "Celtic", team2: "Bayern Munich", status: "Live Now!" },
        { id: "4", team1: "Feyenoord", team2: "AC Milan", status: "Live Now!" },
      ]
    },
    {
      league: "Premier League",
      icon: "/Premier League.avif",
      matches: [
        { id: "5", team1: "Everton", team2: "Liverpool", status: "Live Now!" },
      ]
    },
    {
      league: "English Championship",
      icon: "/English Championship.avif",
      matches: [
        { id: "6", team1: "Sheffield United", team2: "Middlesbrough", status: "Live Now!" },
      ]
    },
    {
      league: "Saudi Pro League",
      icon: "/Saudi Pro League.avif",
      matches: [
        { id: "7", team1: "Al Ahli", team2: "Al Nassr", time: "Starts In: 21:26:30" },
      ]
    },
    {
      league: "UEFA Conference League",
      icon: "/UEFA Conference League.avif",
      matches: [
        { id: "8", team1: "Molde", team2: "Shamrock Rovers", time: "Starts In: 21:41:30" },
        { id: "9", team1: "Celje", team2: "APOEL Nicosia", time: "Starts In: 21:41:30" },
        { id: "10", team1: "Vikingur Reykjavik", team2: "Panathinaikos", time: "Starts In: 21:41:30" },
        { id: "11", team1: "TSC Backa", team2: "Jagiellonia Bialystok", time: "Starts In: 21:41:30" },
        { id: "12", team1: "AA Gent", team2: "Real Betis", time: "Starts In: 23:56:30" },
        { id: "13", team1: "Omonia Nicosia", team2: "Palos FC", time: "Starts In: 23:56:30" },
        { id: "14", team1: "Borac Banja Luka", team2: "Olimpija Ljubljana", time: "Starts In: 23:56:30" },
        { id: "15", team1: "Copenhagen", team2: "Heidenheim", time: "Starts In: 23:56:30" },
      ]
    },
    {
      league: "UEFA Europa League",
      icon: "/UEFA Europa League.avif",
      matches: [
        { id: "16", team1: "Fenerbahce", team2: "Anderlecht", time: "Starts In: 21:41:30" },
        { id: "17", team1: "Midtjylland", team2: "Real Sociedad", time: "Starts In: 21:41:30" },
        { id: "18", team1: "Union St Gilloise", team2: "Ajax", time: "Starts In: 21:41:30" },
        { id: "19", team1: "Ferencvaros", team2: "Viktoria Plzen", time: "Starts In: 21:41:30" },
        { id: "20", team1: "FC Porto", team2: "Roma", time: "Starts In: 23:56:30" },
        { id: "21", team1: "AZ Alkmaar", team2: "Galatasaray", time: "Starts In: 23:56:30" },
        { id: "22", team1: "PAOK Thessaloniki", team2: "FCSB", time: "Starts In: 23:56:30" },
        { id: "23", team1: "Twente", team2: "Besiktas", time: "Starts In: 23:56:30" },
      ]
    },
    {
      league: "English League Two",
      icon: "/English League Two.avif",
      matches: [
        { id: "24", team1: "Port Vale", team2: "Notts County", time: "Starts In: 23:56:30" },
      ]
    },
  ];

  const handleMatchClick = (matchId: string) => {
    navigate(`/stream/${matchId}`);
  };

  return (
    <section className={`p-4 ${theme === "light" ? "bg-white" : "bg-[#1a1a1a]"}`}>
      <h2 className={`text-xl font-bold mb-4 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
        Live Matches
      </h2>
      <div className="space-y-4">
        {matches.map((league, idx) => (
          <div key={idx} className="space-y-2">
            <div className="flex items-center space-x-2">
              <img 
                src={league.icon} 
                alt={league.league} 
                className="w-6 h-6 object-contain rounded-sm"
              />
              <h2 className="text-lg font-semibold">{league.league}</h2>
            </div>
            {league.matches.map((match) => (
              <Card 
                key={match.id} 
                className={`${
                  theme === "light"
                    ? "bg-gray-100 hover:bg-gray-200"
                    : "bg-[#2a2a2a] hover:bg-[#3a3a3a]"
                } transition-colors duration-200 cursor-pointer`}
                onClick={() => handleMatchClick(match.id)}
              >
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm">{match.team1}</span>
                      <span className="text-sm text-gray-400">vs</span>
                      <span className="text-sm">{match.team2}</span>
                    </div>
                    <div className="text-sm text-orange-500 mt-1">
                      {match.status || match.time}
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-gray-400" />
                </div>
              </Card>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default LiveMatches;