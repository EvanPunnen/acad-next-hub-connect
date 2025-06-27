
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTheme } from "@/contexts/ThemeContext";
import { Moon, Sun, Monitor, School, Bell, User, Globe } from "lucide-react";
import { useState } from "react";

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const [selectedCollege, setSelectedCollege] = useState("mit-college");
  const [notifications, setNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);

  const colleges = [
    { id: "mit-college", name: "MIT College of Engineering" },
    { id: "stanford-uni", name: "Stanford University" },
    { id: "harvard-uni", name: "Harvard University" },
    { id: "oxford-uni", name: "Oxford University" },
    { id: "cambridge-uni", name: "Cambridge University" }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Settings</h2>
        <p className="text-gray-600 dark:text-gray-400">Manage your preferences and account settings</p>
      </div>

      {/* Theme Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Sun className="h-5 w-5 mr-2" />
            Appearance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="theme-select">Theme</Label>
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">
                  <div className="flex items-center">
                    <Sun className="h-4 w-4 mr-2" />
                    Light
                  </div>
                </SelectItem>
                <SelectItem value="dark">
                  <div className="flex items-center">
                    <Moon className="h-4 w-4 mr-2" />
                    Dark
                  </div>
                </SelectItem>
                <SelectItem value="system">
                  <div className="flex items-center">
                    <Monitor className="h-4 w-4 mr-2" />
                    System
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* College Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <School className="h-5 w-5 mr-2" />
            College Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="college-select">Select College</Label>
            <Select value={selectedCollege} onValueChange={setSelectedCollege}>
              <SelectTrigger className="w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {colleges.map((college) => (
                  <SelectItem key={college.id} value={college.id}>
                    {college.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="h-5 w-5 mr-2" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="push-notifications">Push Notifications</Label>
            <Switch
              id="push-notifications"
              checked={notifications}
              onCheckedChange={setNotifications}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="email-notifications">Email Notifications</Label>
            <Switch
              id="email-notifications"
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
          </div>
        </CardContent>
      </Card>

      {/* Account Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="h-5 w-5 mr-2" />
            Account
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full">
            Change Password
          </Button>
          <Button variant="outline" className="w-full">
            Update Profile
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
