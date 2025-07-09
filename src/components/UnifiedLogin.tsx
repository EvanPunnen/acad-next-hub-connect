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
  BookOpen,
  Users,
  Shield,
  ArrowLeft,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/hooks/useAuth";
import { localBackend } from "@/utils/localBackend";

interface UnifiedLoginProps {
  onAuthSuccess: () => void;
}

const UnifiedLogin = ({ onAuthSuccess }: UnifiedLoginProps) => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { refreshUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [loginType, setLoginType] = useState<"student" | "faculty">("student");

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
      if (loginData.identifier && loginData.password) {
        console.log(
          `Attempting ${loginType} login with:`,
          loginData.identifier
        );

        if (loginType === "student") {
          // Create a mock student user session
          const mockUser = {
            id: "student-" + Date.now(),
            email: `${loginData.identifier}@acadnext.com`,
            user_metadata: {
              full_name: "Student User",
              student_id: loginData.identifier,
              role: "student",
            },
          };

          console.log("Created mock student user:", mockUser);
          localStorage.setItem("acadnext_user", JSON.stringify(mockUser));
          localStorage.setItem(
            "acadnext_session",
            JSON.stringify({ user: mockUser })
          );
        } else {
          // Create a mock faculty user session
          const mockUser = {
            id: "faculty-" + Date.now(),
            email: `${loginData.identifier}@faculty.acadnext.com`,
            user_metadata: {
              full_name:
                "Dr. " +
                loginData.identifier.charAt(0).toUpperCase() +
                loginData.identifier.slice(1),
              faculty_id: loginData.identifier,
              role: "faculty",
              department: "Computer Science",
              subjects: [
                "Database Systems",
                "Software Engineering",
                "Data Structures",
              ],
            },
          };

          console.log("Created mock faculty user:", mockUser);
          localStorage.setItem("acadnext_user", JSON.stringify(mockUser));
          localStorage.setItem(
            "acadnext_session",
            JSON.stringify({ user: mockUser })
          );

          // Initialize sample data for faculty
          localBackend.initializeSampleData(mockUser.id);
        }

        console.log("Stored session in localStorage");
        refreshUser();
        console.log("Refreshed auth state");

        setSuccess(
          `${
            loginType === "student" ? "Student" : "Faculty"
          } login successful! Redirecting...`
        );

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

  const switchLoginType = () => {
    setLoginType(loginType === "student" ? "faculty" : "student");
    setLoginData({ identifier: "", password: "" });
    setSuccess("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 flex items-center justify-center p-4">
      {/* Top Navigation */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
        <Link to="/">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg hover:bg-white/20 transition-all border border-white/20"
          >
            <div className="bg-white/20 p-1.5 rounded-full">
              <ArrowLeft className="h-4 w-4 text-white" />
            </div>
            <span className="font-medium text-white">Back to Home</span>
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

      <div className="w-full max-w-md">
        <Card className="shadow-2xl bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-6">
              <div
                className={`p-4 rounded-2xl shadow-xl ${
                  loginType === "student"
                    ? "bg-gradient-to-br from-blue-500 to-blue-600"
                    : "bg-gradient-to-br from-indigo-500 to-purple-600"
                }`}
              >
                {loginType === "student" ? (
                  <BookOpen className="h-10 w-10 text-white" />
                ) : (
                  <Users className="h-10 w-10 text-white" />
                )}
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-white">
              {loginType === "student" ? "Student Portal" : "Faculty Portal"}
            </CardTitle>
            <p className="text-white/80 text-lg">
              {loginType === "student"
                ? "Access your academic records and assignments"
                : "Manage students and academic processes"}
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="identifier" className="text-white font-medium">
                  {loginType === "student"
                    ? "Student ID or Email"
                    : "Faculty ID or Email"}
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-white/60" />
                  <Input
                    id="identifier"
                    type="text"
                    placeholder={
                      loginType === "student"
                        ? "Enter Student ID or Email"
                        : "Enter Faculty ID or Email"
                    }
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

              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <p className="text-sm text-white/80 text-center">
                  <strong className="text-white">Demo Access:</strong>
                  <br />
                  Enter any {loginType === "student" ? "Student" : "Faculty"} ID
                  and Password to login
                </p>
                <div className="mt-3 text-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const testId =
                        loginType === "student" ? "student123" : "faculty123";
                      setLoginData({
                        identifier: testId,
                        password: "password",
                      });
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
                <Alert className="bg-green-500/20 border-green-400/30 text-green-100">
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className={`w-full py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 ${
                  loginType === "student"
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                    : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                } text-white`}
                disabled={loading}
              >
                {loading
                  ? "Signing In..."
                  : `Login to ${
                      loginType === "student" ? "Student" : "Faculty"
                    } Portal`}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Button
                variant="link"
                onClick={switchLoginType}
                className="text-white/70 hover:text-white"
              >
                Switch to {loginType === "student" ? "Faculty" : "Student"}{" "}
                Login
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UnifiedLogin;
