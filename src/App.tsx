import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import StreamDetails from "./pages/StreamDetails";
import Signup from "./pages/Signup";
import UserDashboard from "./pages/UserDashboard";
import { TeamsLeaguesProvider } from './context/TeamsLeaguesContext';
import { EventsProvider } from '@/context/EventsContext';
import EventDetails from "./pages/EventDetails";

const App = () => (
  <EventsProvider>
    <TeamsLeaguesProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <TooltipProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/user-dashboard" element={<UserDashboard />} />
              <Route path="/stream/:streamId" element={<StreamDetails />} />
              <Route path="/events/:eventId" element={<EventDetails />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </ThemeProvider>
    </TeamsLeaguesProvider>
  </EventsProvider>
);

export default App;