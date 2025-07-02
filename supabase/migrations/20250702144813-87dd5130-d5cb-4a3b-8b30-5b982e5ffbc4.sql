
-- Create students table for faculty to manage
CREATE TABLE public.students (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  department TEXT NOT NULL,
  year INTEGER NOT NULL,
  semester INTEGER NOT NULL,
  faculty_id UUID REFERENCES public.profiles(id),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create events table
CREATE TABLE public.events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  event_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  location TEXT,
  event_type TEXT DEFAULT 'general',
  created_by UUID REFERENCES public.profiles(id),
  max_participants INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create event registrations table
CREATE TABLE public.event_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
  registered_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(event_id, student_id)
);

-- Create transport table for bus management
CREATE TABLE public.transport (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  bus_number TEXT NOT NULL UNIQUE,
  driver_name TEXT NOT NULL,
  driver_phone TEXT NOT NULL,
  route_name TEXT NOT NULL,
  route_details TEXT,
  capacity INTEGER NOT NULL,
  is_available BOOLEAN DEFAULT true,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create bus bookings table
CREATE TABLE public.bus_bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  transport_id UUID REFERENCES public.transport(id) ON DELETE CASCADE,
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
  booking_date DATE NOT NULL,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Update existing tables to link with students
ALTER TABLE public.assignments ADD COLUMN student_id UUID REFERENCES public.students(id);
ALTER TABLE public.attendance ADD COLUMN student_id UUID REFERENCES public.students(id);
ALTER TABLE public.fees ADD COLUMN student_id UUID REFERENCES public.students(id);
ALTER TABLE public.timetable ADD COLUMN faculty_id UUID REFERENCES public.profiles(id);

-- Enable RLS on all new tables
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transport ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bus_bookings ENABLE ROW LEVEL SECURITY;

-- RLS policies for students table
CREATE POLICY "Faculty can manage their students" ON public.students
  FOR ALL USING (faculty_id = auth.uid());

-- RLS policies for events table
CREATE POLICY "Faculty can manage events" ON public.events
  FOR ALL USING (created_by = auth.uid());

CREATE POLICY "Students can view events" ON public.events
  FOR SELECT USING (true);

-- RLS policies for event registrations
CREATE POLICY "Anyone can view event registrations" ON public.event_registrations
  FOR SELECT USING (true);

CREATE POLICY "Students can register for events" ON public.event_registrations
  FOR INSERT WITH CHECK (true);

-- RLS policies for transport
CREATE POLICY "Faculty can manage transport" ON public.transport
  FOR ALL USING (created_by = auth.uid());

CREATE POLICY "Students can view transport" ON public.transport
  FOR SELECT USING (true);

-- RLS policies for bus bookings
CREATE POLICY "Anyone can manage bus bookings" ON public.bus_bookings
  FOR ALL USING (true);

-- Create indexes for better performance
CREATE INDEX idx_students_faculty_id ON public.students(faculty_id);
CREATE INDEX idx_events_created_by ON public.events(created_by);
CREATE INDEX idx_event_registrations_event_id ON public.event_registrations(event_id);
CREATE INDEX idx_transport_created_by ON public.transport(created_by);
CREATE INDEX idx_assignments_student_id ON public.assignments(student_id);
CREATE INDEX idx_attendance_student_id ON public.attendance(student_id);
CREATE INDEX idx_fees_student_id ON public.fees(student_id);
CREATE INDEX idx_timetable_faculty_id ON public.timetable(faculty_id);
