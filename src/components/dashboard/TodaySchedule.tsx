
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

const TodaySchedule = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Schedule</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center py-8 text-gray-500">
          <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
          <p>No classes scheduled for today</p>
          <p className="text-sm">Check your timetable for upcoming classes</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TodaySchedule;
