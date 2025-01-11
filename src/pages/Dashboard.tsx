import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Define valid table names as a type
type TableName = "leagues" | "teams" | "events" | "channels" | "profiles" | "stream_links";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    events: 0,
    teams: 0,
    leagues: 0,
    channels: 0,
  });

  useEffect(() => {
    checkUser();
    fetchStats();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/login");
    } else {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    const fetchCount = async (table: TableName) => {
      const { count } = await supabase
        .from(table)
        .select("*", { count: "exact", head: true });
      return count || 0;
    };

    const [events, teams, leagues, channels] = await Promise.all([
      fetchCount("events"),
      fetchCount("teams"),
      fetchCount("leagues"),
      fetchCount("channels"),
    ]);

    setStats({ events, teams, leagues, channels });
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
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatsCard title="Total Events" value={stats.events} />
            <StatsCard title="Total Teams" value={stats.teams} />
            <StatsCard title="Total Leagues" value={stats.leagues} />
            <StatsCard title="Total Channels" value={stats.channels} />
          </div>
        </div>
      </main>
    </div>
  );
};

const StatsCard = ({ title, value }: { title: string; value: number }) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-xl">{title}</CardTitle>
      <CardDescription>Total count</CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-3xl font-bold">{value}</p>
    </CardContent>
  </Card>
);

export default Dashboard;