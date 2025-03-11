import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EventForm from "@/components/forms/EventForm";
import TeamForm from "@/components/forms/TeamForm";
import LeagueForm from "@/components/forms/LeagueForm";
import ChannelForm from "@/components/forms/ChannelForm";
import CategoryForm from "@/components/forms/categoryForm"; // Fixed case sensitivity
import MatchForm from "@/components/forms/MatchForm";
import { API_BASE_URL, API_CONFIG } from "@/config/api";
import { useTheme } from "next-themes";
import AdminMatchesTable from "@/components/AdminMatchesTable";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const hasCheckedUser = useRef(false);
  const { theme } = useTheme();

  useEffect(() => {
    if (!hasCheckedUser.current) {
      checkUser();
      hasCheckedUser.current = true;
    }
  }, []);

  const checkUser = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/check`, {
        ...API_CONFIG,
        method: "GET",
      });

      if (!response.ok) {
        if (response.status === 401) {
          navigate("/login");
          return;
        }
        throw new Error("Not authenticated");
      }

      const userData = await response.json();
      setUser(userData);
      setLoading(false);
    } catch (error) {
      console.error("Authentication error:", error);
      navigate("/login");
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        ...API_CONFIG,
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className={`min-h-screen ${
        theme === "light" ? "bg-gray-50" : "bg-[#1a1a1a]"
      }`}
    >
      <nav
        className={`border-b ${
          theme === "light"
            ? "bg-white shadow-sm"
            : "bg-[#2a2a2a] border-[#3a3a3a]"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1
              className={`text-xl font-bold ${
                theme === "light" ? "text-gray-900" : "text-white"
              }`}
            >
              Admin Dashboard
            </h1>
            <Button
              onClick={handleLogout}
              variant="outline"
              className={`${
                theme === "light"
                  ? "bg-white text-gray-900 border-gray-300 hover:bg-gray-50"
                  : "bg-[#2a2a2a] text-white border-[#3a3a3a] hover:bg-[#3a3a3a]"
              }`}
            >
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs defaultValue="matches" className="w-full">
          <TabsList className="flex overflow-x-auto whitespace-nowrap p-1 mb-4 gap-1 sm:gap-2 border-b border-border/40">
            <TabsTrigger
              value="matches"
              className={`${
                theme === "light"
                  ? "data-[state=active]:bg-gray-100 data-[state=active]:text-gray-900"
                  : "data-[state=active]:bg-[#3a3a3a] data-[state=active]:text-white"
              }`}
            >
              Matches
            </TabsTrigger>
            <TabsTrigger
              value="events"
              className="flex-shrink-0 px-3 py-1.5 text-sm"
            >
              Events
            </TabsTrigger>
            <TabsTrigger
              value="teams"
              className="flex-shrink-0 px-3 py-1.5 text-sm"
            >
              Teams
            </TabsTrigger>
            <TabsTrigger
              value="leagues"
              className="flex-shrink-0 px-3 py-1.5 text-sm"
            >
              Leagues
            </TabsTrigger>
            <TabsTrigger
              value="channels"
              className="flex-shrink-0 px-3 py-1.5 text-sm"
            >
              Channels
            </TabsTrigger>
            <TabsTrigger
              value="categories"
              className="flex-shrink-0 px-3 py-1.5 text-sm"
            >
              Categories
            </TabsTrigger>
          </TabsList>
          <div
            className={`${
              theme === "light"
                ? "bg-white shadow-sm"
                : "bg-[#2a2a2a] border-[#3a3a3a]"
            } p-6 rounded-lg`}
          >
            <TabsContent value="matches" className="mt-4">
              <AdminMatchesTable />
            </TabsContent>
            <TabsContent value="events" className="mt-4">
              <EventForm />
            </TabsContent>
            <TabsContent value="teams" className="mt-4">
              <TeamForm />
            </TabsContent>
            <TabsContent value="leagues" className="mt-4">
              <LeagueForm />
            </TabsContent>
            <TabsContent value="channels" className="mt-4">
              <ChannelForm />
            </TabsContent>
            <TabsContent value="categories" className="mt-4">
              <CategoryForm />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
