import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { API_BASE_URL, API_CONFIG } from "@/config/api";
import { useTheme } from "next-themes";
import { useToast } from "@/components/ui/use-toast";

interface LoginError {
  status?: number;
  message: string;
}

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';
  const { toast } = useToast();
  const { theme } = useTheme();

  const getErrorMessage = (error: LoginError) => {
    switch (error.status) {
      case 400:
        return "Invalid email or password. Please check your credentials and try again.";
      case 422:
        return "Email format is invalid. Please enter a valid email address.";
      case 429:
        return "Too many login attempts. Please try again later.";
      default:
        return error.message || "An unexpected error occurred. Please try again.";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('Login attempt with:', { email });
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log('Login response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      toast({
        title: "Success",
        description: "Logged in successfully",
      });

      // Role-based navigation
      if (data.user.role === "admin") {
        console.log('Redirecting to admin dashboard');
        navigate("/dashboard", { replace: true });
      } else if (data.user.role === "user") {
        console.log('Redirecting to user dashboard');
        navigate("/user-dashboard", { replace: true });
      } else {
        console.log('Redirecting to fallback');
        navigate(from, { replace: true });
      }

    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Login failed",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        theme === "light" ? "bg-gray-50" : "bg-[#1a1a1a]"
      } p-4`}
    >
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2">
          <CardTitle
            className={`text-2xl text-center ${
              theme === "light" ? "text-gray-900" : "text-white"
            }`}
          >
            Admin Dashboard Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label
                className={theme === "light" ? "text-gray-900" : "text-white"}
                htmlFor="email"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={theme === "light" ? "bg-white" : "bg-[#2a2a2a]"}
                required
              />
            </div>
            <div className="space-y-2">
              <Label
                className={theme === "light" ? "text-gray-900" : "text-white"}
                htmlFor="password"
              >
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={theme === "light" ? "bg-white" : "bg-[#2a2a2a]"}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <Button
              variant="link"
              onClick={() => navigate("/signup")}
              className="text-sm"
            >
              Don't have an account? Sign Up
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;