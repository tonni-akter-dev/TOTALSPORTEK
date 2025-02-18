import  MatchForm  from "@/components/forms/MatchForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const UserDashboard = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
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
      </div>
    </div>
  );
};

export default UserDashboard;