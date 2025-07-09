import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Eye,
  EyeOff,
  GraduationCap,
  Lock,
  User,
  Home,
  Moon,
  Sun,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/hooks/useAuth";

interface AuthPageProps {
  onAuthSuccess: () => void;
}

const AuthPage = ({ onAuthSuccess }: AuthPageProps) => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { refreshUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  // Login form state
  const [loginData, setLoginData] = useState({
    identifier: "",
    password: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    try {
      // Accept any credentials for login
      if (loginData.identifier && loginData.password) {
        console.log("Attempting login with:", loginData.identifier);

        // Create a mock user session
        const mockUser = {
          id: "student-" + Date.now(),
          email: `${loginData.identifier}@acadnext.com`,
          user_metadata: {
            full_name: "Student User",
            student_id: loginData.identifier,
            role: "student",
          },
        };

        console.log("Created mock user:", mockUser);

        // Store mock session in localStorage
        localStorage.setItem("acadnext_user", JSON.stringify(mockUser));
        localStorage.setItem(
          "acadnext_session",
          JSON.stringify({ user: mockUser })
        );

        console.log("Stored session in localStorage");

        // Refresh the auth state
        refreshUser();

        console.log("Refreshed auth state");

        setSuccess("Login successful! Redirecting...");

        // Force immediate redirect
        setTimeout(() => {
          console.log("Redirecting after login...");
          onAuthSuccess();
        }, 1000);
        return;
      }
    } catch (err) {
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 flex items-center justify-center p-4">
      {/* Top Navigation */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
        <Link to="/">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg hover:bg-white/20 transition-all border border-white/20"
          >
            <div className="bg-white/20 p-1.5 rounded-full">
              <Home className="h-4 w-4 text-white" />
            </div>
            <span className="font-medium text-white">Home</span>
          </Button>
        </Link>

        <Button
          variant="ghost"
          size="sm"
          onClick={toggleTheme}
          className="bg-white/10 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white/20 transition-all border border-white/20"
        >
          {theme === "light" ? (
            <Moon className="h-4 w-4 text-white" />
          ) : (
            <Sun className="h-4 w-4 text-white" />
          )}
        </Button>
      </div>

      <Card className="w-full max-w-md relative shadow-2xl bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-2xl shadow-xl">
              <GraduationCap className="h-10 w-10 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-white">
            Welcome Back
          </CardTitle>
          <p className="text-white/80 text-lg">Student Portal Access</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="identifier" className="text-white font-medium">
                Student ID or Email
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-white/60" />
                <Input
                  id="identifier"
                  type="text"
                  placeholder="Enter Student ID or Email"
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white/40 rounded-xl"
                  value={loginData.identifier}
                  onChange={(e) =>
                    setLoginData({ ...loginData, identifier: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white font-medium">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-white/60" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white/40 rounded-xl"
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-white/60 hover:text-white"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Login to Portal"}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
            <p className="text-sm text-white/80 text-center">
              <strong className="text-white">Quick Access:</strong>
              <br />
              Enter any Student ID and Password to login
            </p>
            <div className="mt-3 text-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setLoginData({ identifier: "test123", password: "password" });
                  setTimeout(() => {
                    const form = document.querySelector("form");
                    if (form) {
                      const submitEvent = new Event("submit", {
                        bubbles: true,
                        cancelable: true,
                      });
                      form.dispatchEvent(submitEvent);
                    }
                  }, 100);
                }}
                className="text-white/70 hover:text-white border-white/30"
              >
                Test Login (Auto-fill)
              </Button>
            </div>
          </div>

          {success && (
            <Alert className="mt-4 bg-green-500/20 border-green-400/30 text-green-100">
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <div className="mt-6 text-center">
            <Link to="/faculty">
              <Button variant="link" className="text-white/70 hover:text-white">
                Faculty Login →
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;
