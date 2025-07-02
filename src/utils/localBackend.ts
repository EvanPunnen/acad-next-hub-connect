
// Local Storage Backend - Alternative to Supabase
export interface Student {
  id: string;
  student_id: string;
  full_name: string;
  email: string;
  phone?: string;
  department: string;
  year: number;
  semester: number;
  faculty_id: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Assignment {
  id: string;
  title: string;
  description?: string;
  subject_code: string;
  subject_name: string;
  due_date?: string;
  student_id?: string;
  status: 'pending' | 'submitted' | 'graded';
  grade?: string;
  submission_url?: string;
  submitted_at?: string;
  created_at: string;
}

export interface Attendance {
  id: string;
  student_id: string;
  subject_code: string;
  subject_name: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  marked_at: string;
}

export interface Fee {
  id: string;
  student_id: string;
  fee_type: string;
  amount: number;
  due_date?: string;
  paid_date?: string;
  status: 'pending' | 'paid' | 'overdue';
  payment_method?: string;
  transaction_id?: string;
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  event_date: string;
  start_time: string;
  end_time: string;
  location?: string;
  event_type: string;
  created_by: string;
  max_participants?: number;
  created_at: string;
}

export interface Transport {
  id: string;
  bus_number: string;
  driver_name: string;
  driver_phone: string;
  route_name: string;
  route_details?: string;
  capacity: number;
  is_available: boolean;
  created_by: string;
  created_at: string;
}

class LocalBackend {
  private generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  private getFromStorage<T>(key: string): T[] {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  }

  private saveToStorage<T>(key: string, data: T[]): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  // Students CRUD
  getStudents(facultyId: string): Student[] {
    return this.getFromStorage<Student>('students').filter(s => s.faculty_id === facultyId);
  }

  addStudent(student: Omit<Student, 'id' | 'created_at' | 'updated_at'>): Student {
    const students = this.getFromStorage<Student>('students');
    const newStudent: Student = {
      ...student,
      id: this.generateId(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    students.push(newStudent);
    this.saveToStorage('students', students);
    return newStudent;
  }

  updateStudent(id: string, updates: Partial<Student>): Student | null {
    const students = this.getFromStorage<Student>('students');
    const index = students.findIndex(s => s.id === id);
    if (index === -1) return null;
    
    students[index] = { ...students[index], ...updates, updated_at: new Date().toISOString() };
    this.saveToStorage('students', students);
    return students[index];
  }

  deleteStudent(id: string): boolean {
    const students = this.getFromStorage<Student>('students');
    const filtered = students.filter(s => s.id !== id);
    if (filtered.length === students.length) return false;
    
    this.saveToStorage('students', filtered);
    return true;
  }

  // Assignments CRUD
  getAssignments(facultyId: string): Assignment[] {
    const students = this.getStudents(facultyId);
    const studentIds = students.map(s => s.id);
    return this.getFromStorage<Assignment>('assignments').filter(a => 
      !a.student_id || studentIds.includes(a.student_id)
    );
  }

  addAssignment(assignment: Omit<Assignment, 'id' | 'created_at'>): Assignment {
    const assignments = this.getFromStorage<Assignment>('assignments');
    const newAssignment: Assignment = {
      ...assignment,
      id: this.generateId(),
      created_at: new Date().toISOString()
    };
    assignments.push(newAssignment);
    this.saveToStorage('assignments', assignments);
    return newAssignment;
  }

  // Attendance CRUD
  getAttendance(facultyId: string): Attendance[] {
    const students = this.getStudents(facultyId);
    const studentIds = students.map(s => s.id);
    return this.getFromStorage<Attendance>('attendance').filter(a => 
      studentIds.includes(a.student_id)
    );
  }

  markAttendance(attendance: Omit<Attendance, 'id' | 'marked_at'>): Attendance {
    const attendanceList = this.getFromStorage<Attendance>('attendance');
    const newAttendance: Attendance = {
      ...attendance,
      id: this.generateId(),
      marked_at: new Date().toISOString()
    };
    attendanceList.push(newAttendance);
    this.saveToStorage('attendance', attendanceList);
    return newAttendance;
  }

  // Fees CRUD
  getFees(facultyId: string): Fee[] {
    const students = this.getStudents(facultyId);
    const studentIds = students.map(s => s.id);
    return this.getFromStorage<Fee>('fees').filter(f => 
      studentIds.includes(f.student_id)
    );
  }

  addFee(fee: Omit<Fee, 'id'>): Fee {
    const fees = this.getFromStorage<Fee>('fees');
    const newFee: Fee = {
      ...fee,
      id: this.generateId()
    };
    fees.push(newFee);
    this.saveToStorage('fees', fees);
    return newFee;
  }

  updateFee(id: string, updates: Partial<Fee>): Fee | null {
    const fees = this.getFromStorage<Fee>('fees');
    const index = fees.findIndex(f => f.id === id);
    if (index === -1) return null;
    
    fees[index] = { ...fees[index], ...updates };
    this.saveToStorage('fees', fees);
    return fees[index];
  }

  // Events CRUD
  getEvents(facultyId: string): Event[] {
    return this.getFromStorage<Event>('events').filter(e => e.created_by === facultyId);
  }

  addEvent(event: Omit<Event, 'id' | 'created_at'>): Event {
    const events = this.getFromStorage<Event>('events');
    const newEvent: Event = {
      ...event,
      id: this.generateId(),
      created_at: new Date().toISOString()
    };
    events.push(newEvent);
    this.saveToStorage('events', events);
    return newEvent;
  }

  // Transport CRUD
  getTransport(facultyId: string): Transport[] {
    return this.getFromStorage<Transport>('transport').filter(t => t.created_by === facultyId);
  }

  addTransport(transport: Omit<Transport, 'id' | 'created_at'>): Transport {
    const transports = this.getFromStorage<Transport>('transport');
    const newTransport: Transport = {
      ...transport,
      id: this.generateId(),
      created_at: new Date().toISOString()
    };
    transports.push(newTransport);
    this.saveToStorage('transport', transports);
    return newTransport;
  }

  updateTransport(id: string, updates: Partial<Transport>): Transport | null {
    const transports = this.getFromStorage<Transport>('transport');
    const index = transports.findIndex(t => t.id === id);
    if (index === -1) return null;
    
    transports[index] = { ...transports[index], ...updates };
    this.saveToStorage('transport', transports);
    return transports[index];
  }

  // Initialize with sample data
  initializeSampleData(facultyId: string): void {
    // Add sample students
    const sampleStudents: Omit<Student, 'id' | 'created_at' | 'updated_at'>[] = [
      {
        student_id: 'CS2024001',
        full_name: 'John Smith',
        email: 'john.smith@college.edu',
        phone: '+1234567890',
        department: 'Computer Science',
        year: 2,
        semester: 4,
        faculty_id: facultyId
      },
      {
        student_id: 'CS2024002',
        full_name: 'Sarah Johnson',
        email: 'sarah.johnson@college.edu',
        phone: '+1234567891',
        department: 'Computer Science',
        year: 2,
        semester: 4,
        faculty_id: facultyId
      }
    ];

    sampleStudents.forEach(student => this.addStudent(student));
  }
}

export const localBackend = new LocalBackend();
