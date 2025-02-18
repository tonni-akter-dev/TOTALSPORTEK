// import { useEffect, useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import EventForm from "@/components/forms/EventForm";
// import TeamForm from "@/components/forms/TeamForm";
// import LeagueForm from "@/components/forms/LeagueForm";
// import ChannelForm from "@/components/forms/ChannelForm";
// import CategoryForm from "@/components/forms/CategoryForm";
// import MatchForm from "@/components/forms/MatchForm";
// import { API_BASE_URL, API_CONFIG } from '@/config/api';

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState(null);
//   const hasCheckedUser = useRef(false); // Track if the check has been performed

//   useEffect(() => {
//     if (!hasCheckedUser.current) {
//       checkUser();
//       hasCheckedUser.current = true; // Mark the check as done
//     }
//   }, []); // Empty dependency array ensures it only runs once

//   const checkUser = async () => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/auth/check`, {
//         ...API_CONFIG,
//         method: 'GET'
//       });
      
//       if (!response.ok) {
//         if (response.status === 401) {
//           // Redirect to login if not authenticated
//           navigate("/login");
//           return;
//         }
//         throw new Error('Not authenticated');
//       }
      
//       const userData = await response.json();
//       setUser(userData);
//       setLoading(false);
//     } catch (error) {
//       console.error('Authentication error:', error);
//       navigate("/login");
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
//         ...API_CONFIG,
//         method: 'POST'
//       });

//       if (!response.ok) {
//         throw new Error('Logout failed');
//       }

//       // Clear any local state
//       setUser(null);
      
//       // Redirect to login
//       navigate('/login');
//     } catch (error) {
//       console.error('Logout error:', error);
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <nav className="bg-white border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16 items-center">
//             <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
//             <Button 
//               onClick={handleLogout} 
//               variant="outline" 
//               className="bg-white text-gray-900 border-gray-300 "
//             >
//               Logout
//             </Button>
//           </div>
//         </div>
//       </nav>

//       <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//         <Tabs defaultValue="matches" className="space-y-6">
//           <TabsList className="grid w-full grid-cols-6 bg-white">
//             <TabsTrigger 
//               value="matches"
//               className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
//             >
//               Matches
//             </TabsTrigger>
//             <TabsTrigger 
//               value="events"
//               className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
//             >
//               Events
//             </TabsTrigger>
//             <TabsTrigger 
//               value="teams"
//               className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
//             >
//               Teams
//             </TabsTrigger>
//             <TabsTrigger 
//               value="leagues"
//               className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
//             >
//               Leagues
//             </TabsTrigger>
//             <TabsTrigger 
//               value="channels"
//               className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
//             >
//               Channels
//             </TabsTrigger>
//             <TabsTrigger 
//               value="categories"
//               className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
//             >
//               Categories
//             </TabsTrigger>
//           </TabsList>
//           <div className="bg-white p-6 rounded-lg shadow-sm">
//             <TabsContent value="matches" className="mt-0">
//               <MatchForm />
//             </TabsContent>
//             <TabsContent value="events" className="mt-0">
//               <EventForm />
//             </TabsContent>
//             <TabsContent value="teams" className="mt-0">
//               <TeamForm />
//             </TabsContent>
//             <TabsContent value="leagues" className="mt-0">
//               <LeagueForm />
//             </TabsContent>
//             <TabsContent value="channels" className="mt-0">
//               <ChannelForm />
//             </TabsContent>
//             <TabsContent value="categories" className="mt-0">
//               <CategoryForm />
//             </TabsContent>
//           </div>
//         </Tabs>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;



import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EventForm from "@/components/forms/EventForm";
import TeamForm from "@/components/forms/TeamForm";
import LeagueForm from "@/components/forms/LeagueForm";
import ChannelForm from "@/components/forms/ChannelForm";
import CategoryForm from "@/components/forms/categoryForm";
import MatchForm from "@/components/forms/MatchForm";
import { API_BASE_URL, API_CONFIG } from "@/config/api";
import { useTheme } from "next-themes";

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
    <div className={`min-h-screen ${theme === "light" ? "bg-gray-50" : "bg-[#1a1a1a]"}`}>
      <nav className={`border-b ${theme === "light" ? "bg-white shadow-sm" : "bg-[#2a2a2a] border-[#3a3a3a]"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className={`text-xl font-bold ${theme === "light" ? "text-gray-900" : "text-white"}`}>
              Admin Dashboard
            </h1>
            <Button
              onClick={handleLogout}
              variant="outline"
              className={`${theme === "light" ? "bg-white text-gray-900 border-gray-300 hover:bg-gray-50" : "bg-[#2a2a2a] text-white border-[#3a3a3a] hover:bg-[#3a3a3a]"}`}
            >
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Tabs defaultValue="matches" className="space-y-6">
          <TabsList className={`grid w-full grid-cols-6 ${theme === "light" ? "bg-white shadow-sm" : "bg-[#2a2a2a] border-[#3a3a3a]"}`}>
            <TabsTrigger
              value="matches"
              className={`${theme === "light" ? "data-[state=active]:bg-gray-100 data-[state=active]:text-gray-900" : "data-[state=active]:bg-[#3a3a3a] data-[state=active]:text-white"}`}
            >
              Matches
            </TabsTrigger>
            <TabsTrigger 
              value="events"
              className={`${theme === "light" ? "data-[state=active]:bg-gray-100 data-[state=active]:text-gray-900" : "data-[state=active]:bg-[#3a3a3a] data-[state=active]:text-white"}`}
            >
              Events
            </TabsTrigger>
            <TabsTrigger 
              value="teams"
              className={`${theme === "light" ? "data-[state=active]:bg-gray-100 data-[state=active]:text-gray-900" : "data-[state=active]:bg-[#3a3a3a] data-[state=active]:text-white"}`}
            >
              Teams
            </TabsTrigger>
            <TabsTrigger 
              value="leagues"
              className={`${theme === "light" ? "data-[state=active]:bg-gray-100 data-[state=active]:text-gray-900" : "data-[state=active]:bg-[#3a3a3a] data-[state=active]:text-white"}`}
            >
              Leagues
            </TabsTrigger>
            <TabsTrigger 
              value="channels"
              className={`${theme === "light" ? "data-[state=active]:bg-gray-100 data-[state=active]:text-gray-900" : "data-[state=active]:bg-[#3a3a3a] data-[state=active]:text-white"}`}
            >
              Channels
            </TabsTrigger>
            <TabsTrigger 
              value="categories"
              className={`${theme === "light" ? "data-[state=active]:bg-gray-100 data-[state=active]:text-gray-900" : "data-[state=active]:bg-[#3a3a3a] data-[state=active]:text-white"}`}
            >
              Categories
            </TabsTrigger>
          </TabsList>
          <div className={`${theme === "light" ? "bg-white shadow-sm" : "bg-[#2a2a2a] border-[#3a3a3a]"} p-6 rounded-lg`}>
            <TabsContent value="matches" className="mt-0">
              <MatchForm />
            </TabsContent>
            <TabsContent value="events" className="mt-0">
              <EventForm />
            </TabsContent>
            <TabsContent value="teams" className="mt-0">
              <TeamForm />
            </TabsContent>
            <TabsContent value="leagues" className="mt-0">
              <LeagueForm />
            </TabsContent>
            <TabsContent value="channels" className="mt-0">
              <ChannelForm />
            </TabsContent>
            <TabsContent value="categories" className="mt-0">
              <CategoryForm />
            </TabsContent>
          </div>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
