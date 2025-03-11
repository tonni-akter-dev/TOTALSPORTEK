/* eslint-disable react-hooks/exhaustive-deps */
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import LeaguesSidebar from "@/components/LeaguesSidebar";
import TeamsSidebar from "@/components/TeamsSidebar";
import Footer from "@/components/Footer";
import { useEffect, useState } from 'react';
import { useTeamsLeagues } from '@/context/TeamsLeaguesContext';
import { fetchLeagues, fetchTeams } from "@/api/teamsLeagues";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { fetchEvents } from "@/api/events";
import LiveMatch from "./LiveMatch";
import { API_BASE_URL, API_CONFIG } from "@/config/api";
interface Match {
  _id: string;
  match: string;
  link: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedBy: string;
  submittedAt: string;
}


const Index = () => {
  const { theme, setTheme } = useTheme();
  const { leagues, updateTeams, updateLeagues } = useTeamsLeagues();
  const [events, setEvents] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const teamsData = await fetchTeams();
      const leaguesData = await fetchLeagues();
      const eventsData = await fetchEvents();
      setEvents(eventsData)
      updateTeams(teamsData);
      updateLeagues(leaguesData);
    };
    fetchData();
  }, []);
  console.log(events, "events");
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b sticky top-0 z-50 bg-background">
        <div className="flex items-center justify-between px-4 py-3 max-w-[2000px] mx-auto">
          <h1 className="text-xl font-bold text-orange-500">TOTALSPORTEK</h1>
          <div className="flex items-center gap-2 md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[80%] sm:w-[385px]">
                <nav className="flex flex-col space-y-4 mt-4">
                  <a href="#" className="text-sm font-medium hover:text-orange-500 transition-colors">FOOTBALL</a>
                  <a href="#" className="text-sm font-medium hover:text-orange-500 transition-colors">F1</a>
                  <a href="#" className="text-sm font-medium hover:text-orange-500 transition-colors">NFL</a>
                  <a href="#" className="text-sm font-medium hover:text-orange-500 transition-colors">NBA</a>
                  <a href="#" className="text-sm font-medium hover:text-orange-500 transition-colors">NHL</a>
                  <a href="#" className="text-sm font-medium hover:text-orange-500 transition-colors">UFC</a>
                  <a href="#" className="text-sm font-medium hover:text-orange-500 transition-colors">BOXING</a>
                  <a href="#" className="text-sm font-medium hover:text-orange-500 transition-colors">RUGBY</a>
                </nav>
              </SheetContent>
            </Sheet>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-sm font-medium hover:text-orange-500 transition-colors">FOOTBALL</a>
            <a href="#" className="text-sm font-medium hover:text-orange-500 transition-colors">F1</a>
            <a href="#" className="text-sm font-medium hover:text-orange-500 transition-colors">NFL</a>
            <a href="#" className="text-sm font-medium hover:text-orange-500 transition-colors">NBA</a>
            <a href="#" className="text-sm font-medium hover:text-orange-500 transition-colors">NHL</a>
            <a href="#" className="text-sm font-medium hover:text-orange-500 transition-colors">UFC</a>
            <a href="#" className="text-sm font-medium hover:text-orange-500 transition-colors">BOXING</a>
            <a href="#" className="text-sm font-medium hover:text-orange-500 transition-colors">RUGBY</a>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="hidden md:flex"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </nav>
        </div>
      </header>

      <div className="flex flex-1 max-w-[2000px] mx-auto w-full relative">
        <div className="md:hidden w-full">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="fixed left-4 top-20 z-40"
              >
                Leagues & Teams
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[80%] sm:w-[385px]">
              <div className="space-y-4 py-4">
                <LeaguesSidebar leagues={leagues} />
                <TeamsSidebar />
              </div>
            </SheetContent>
          </Sheet>

          <div className="pt-16">
            <main className="flex-1 p-4">
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Live Matches</h2>
                {events.length > 0 ? (
                  <div className="flex flex-col gap-2">
                    {events.map(event => (
                    <div key={event._id} className={`${theme == 'light' ? 'bg-white' : 'bg-gray-800'}  p-3 rounded-lg flex items-center justify-between mb-2 shadow-md border `}>
                      {/* Left Side: Live Indicator & Teams */}
                      <div className="flex items-start gap-10">
                        {/* Live Now Indicator */}
                        <div className="border-l-4 border-orange-500 pl-2">
                          <p className="text-orange-500 text-xs font-semibold">Starts in:  {new Date(event.startDate).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}</p>
                        </div>

                        {/* Teams */}
                        <div className="flex flex-col gap-1">
                          {/* Match Name */}
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`text-sm font-medium ${theme == 'light' ? 'text-black' : 'text-white'} `}>{event.teamA}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {/* <img src={} alt="" /> */}
                            <span className={`text-sm ${theme == 'light' ? 'text-black' : 'text-white'}`}>{event.teamA}</span>
                          </div>
                        </div>
                      </div>
                      {/* External Link Icon */}
                      <a href={event.eventUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={16} className={`opacity-75 hover:opacity-100 cursor-pointer ${theme == "dark" ? 'text-white' : "text-black"}`} />                      </a>
                    </div>
                  ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-400">No live matches available</p>
                )}
              </section>
            </main>
          </div>

          {/* // live matches component */}
          <LiveMatch theme={theme} />

        </div>

        <div className="hidden md:flex w-full">
          <div className="hidden md:block">
            <LeaguesSidebar leagues={leagues} />
          </div>

          <main className="flex-1 p-4 min-h-[calc(100vh-64px)]">
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Live Matches</h2>
              {events.length > 0 ? (
                <div className="flex flex-col gap-2">
                  {events.map(event => (
                    <div key={event._id} className={`${theme == 'light' ? 'bg-white' : 'bg-gray-800'}  p-3 rounded-lg flex items-center justify-between mb-2 shadow-md border `}>
                      {/* Left Side: Live Indicator & Teams */}
                      <div className="flex items-start gap-10">
                        {/* Live Now Indicator */}
                        <div className="border-l-4 border-orange-500 pl-2">
                          <p className="text-orange-500 text-xs font-semibold">Starts in:  {new Date(event.startDate).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}</p>
                        </div>

                        {/* Teams */}
                        <div className="flex flex-col gap-1">
                          {/* Match Name */}
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`text-sm font-medium ${theme == 'light' ? 'text-black' : 'text-white'} `}>{event.teamA}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {/* <img src={} alt="" /> */}
                            <span className={`text-sm ${theme == 'light' ? 'text-black' : 'text-white'}`}>{event.teamA}</span>
                          </div>
                        </div>
                      </div>
                      {/* External Link Icon */}
                      <a href={event.eventUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={16} className={`opacity-75 hover:opacity-100 cursor-pointer ${theme == "dark" ? 'text-white' : "text-black"}`} />                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-400">No live matches available</p>
              )}
            </section>
            {/* // live matches component */}
            <LiveMatch  theme={theme}/>
          </main>

          <div className="hidden md:block">
            <TeamsSidebar />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
