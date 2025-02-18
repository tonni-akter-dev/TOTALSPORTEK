import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import MatchForm from "@/components/forms/MatchForm";

const UserDashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background p-8">
      {/* Logout Button */}
      <div className="absolute top-4 right-4">
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="flex items-center gap-2"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>

      {/* Dashboard Content */}
      <main className="max-w-7xl mx-auto space-y-8">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>User Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <MatchForm />
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default UserDashboard;