
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, MessageSquare } from "lucide-react";

const RecentActivity = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <p className="font-medium text-gray-900 dark:text-white">Profile Updated</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Your profile information has been updated</p>
          </div>
        </div>
        <div className="flex items-start space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <MessageSquare className="h-5 w-5 text-green-600 mt-0.5" />
          <div>
            <p className="font-medium text-gray-900 dark:text-white">Welcome to AcadNext</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Start exploring your academic portal</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
