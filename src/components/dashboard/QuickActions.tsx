
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Calendar, CreditCard, MessageSquare } from "lucide-react";

interface QuickActionsProps {
  onSectionChange: (section: string) => void;
}

const QuickActions = ({ onSectionChange }: QuickActionsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button variant="outline" className="justify-start" onClick={() => onSectionChange('assignments')}>
          <FileText className="h-4 w-4 mr-2" />
          View Assignments
        </Button>
        <Button variant="outline" className="justify-start" onClick={() => onSectionChange('timetable')}>
          <Calendar className="h-4 w-4 mr-2" />
          Check Timetable
        </Button>
        <Button variant="outline" className="justify-start" onClick={() => onSectionChange('fees')}>
          <CreditCard className="h-4 w-4 mr-2" />
          Pay Fees
        </Button>
        <Button variant="outline" className="justify-start" onClick={() => onSectionChange('faculty-chat')}>
          <MessageSquare className="h-4 w-4 mr-2" />
          Contact Faculty
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
