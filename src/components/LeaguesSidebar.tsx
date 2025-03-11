const LeaguesSidebar = ({ leagues }) => {

  console.log(leagues,"leagues");

  
  return (
    <div className="w-[250px] p-4">
      <h2 className="text-lg font-semibold mb-4">Leagues</h2>
      {/* Mobile scroll view */}
      <div className="md:hidden overflow-y-auto max-h-[60vh] scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
        <div className="space-y-2">
          {leagues
            ?.sort((a, b) => a.order - b.order)
            .map((league) => (
              <div
                key={league._id}
                className="flex items-center p-2 rounded-lg hover:bg-accent cursor-pointer transition-colors"
              >
                <img
                  src={league.image}
                  alt={league.name}
                  className="w-6 h-6 mr-3 rounded-full"
                />
                <span className="text-sm">{league.name}</span>
              </div>
            ))}

        </div>
      </div>

      {/* Desktop view without scroll */}
      <div className="hidden md:block">
        <div className="space-y-2">
          {leagues.map((league) => (
            <div
              key={league.name}
              className="flex items-center p-2 rounded-lg hover:bg-accent cursor-pointer transition-colors"
            >
              <img
                src={league.image}
                alt={league.name}
                className="w-6 h-6 mr-3 rounded-full"
              />
              <span className="text-sm">{league.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeaguesSidebar; 