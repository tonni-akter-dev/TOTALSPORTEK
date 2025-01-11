import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EventForm from "@/components/forms/EventForm";
import TeamForm from "@/components/forms/TeamForm";
import LeagueForm from "@/components/forms/LeagueForm";
import ChannelForm from "@/components/forms/ChannelForm";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/login");
    } else {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
            <Button onClick={handleLogout} variant="outline">
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Tabs defaultValue="events" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="teams">Teams</TabsTrigger>
            <TabsTrigger value="leagues">Leagues</TabsTrigger>
            <TabsTrigger value="channels">Channels</TabsTrigger>
          </TabsList>
          <TabsContent value="events">
            <EventForm />
          </TabsContent>
          <TabsContent value="teams">
            <TeamForm />
          </TabsContent>
          <TabsContent value="leagues">
            <LeagueForm />
          </TabsContent>
          <TabsContent value="channels">
            <ChannelForm />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;