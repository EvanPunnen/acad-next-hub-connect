
// Backend API Service for AcadNext College Management System
// This provides a complete REST API that can be tested in Postman

const API_BASE_URL = 'http://localhost:3000/api'; // Change this to your server URL

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

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
  registrations_count?: number;
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

export interface Timetable {
  id: string;
  subject_code: string;
  subject_name: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  room_number?: string;
  faculty_id: string;
  faculty_name?: string;
  semester?: number;
}

class BackendApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();
      
      if (!response.ok) {
        return {
          success: false,
          error: data.error || 'Request failed',
        };
      }

      return {
        success: true,
        data: data.data || data,
        message: data.message,
      };
    } catch (error) {
      console.error('API Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error',
      };
    }
  }

  // Faculty Authentication
  async facultyLogin(facultyId: string, password: string): Promise<ApiResponse<any>> {
    return this.request('/auth/faculty/login', {
      method: 'POST',
      body: JSON.stringify({ faculty_id: facultyId, password }),
    });
  }

  // Student Management APIs
  async getStudents(facultyId: string): Promise<ApiResponse<Student[]>> {
    return this.request(`/faculty/${facultyId}/students`);
  }

  async addStudent(facultyId: string, student: Omit<Student, 'id' | 'created_at' | 'updated_at' | 'faculty_id'>): Promise<ApiResponse<Student>> {
    return this.request(`/faculty/${facultyId}/students`, {
      method: 'POST',
      body: JSON.stringify(student),
    });
  }

  async updateStudent(studentId: string, updates: Partial<Student>): Promise<ApiResponse<Student>> {
    return this.request(`/students/${studentId}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deleteStudent(studentId: string): Promise<ApiResponse<void>> {
    return this.request(`/students/${studentId}`, {
      method: 'DELETE',
    });
  }

  // Assignment Management APIs
  async getAssignments(facultyId: string): Promise<ApiResponse<Assignment[]>> {
    return this.request(`/faculty/${facultyId}/assignments`);
  }

  async createAssignment(facultyId: string, assignment: Omit<Assignment, 'id' | 'created_at'>): Promise<ApiResponse<Assignment>> {
    return this.request(`/faculty/${facultyId}/assignments`, {
      method: 'POST',
      body: JSON.stringify(assignment),
    });
  }

  async updateAssignment(assignmentId: string, updates: Partial<Assignment>): Promise<ApiResponse<Assignment>> {
    return this.request(`/assignments/${assignmentId}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deleteAssignment(assignmentId: string): Promise<ApiResponse<void>> {
    return this.request(`/assignments/${assignmentId}`, {
      method: 'DELETE',
    });
  }

  // Attendance Management APIs
  async getAttendance(facultyId: string, date?: string): Promise<ApiResponse<Attendance[]>> {
    const query = date ? `?date=${date}` : '';
    return this.request(`/faculty/${facultyId}/attendance${query}`);
  }

  async markAttendance(facultyId: string, attendance: Omit<Attendance, 'id' | 'marked_at'>): Promise<ApiResponse<Attendance>> {
    return this.request(`/faculty/${facultyId}/attendance`, {
      method: 'POST',
      body: JSON.stringify(attendance),
    });
  }

  async bulkMarkAttendance(facultyId: string, attendanceList: Omit<Attendance, 'id' | 'marked_at'>[]): Promise<ApiResponse<Attendance[]>> {
    return this.request(`/faculty/${facultyId}/attendance/bulk`, {
      method: 'POST',
      body: JSON.stringify({ attendance: attendanceList }),
    });
  }

  // Fee Management APIs
  async getFees(facultyId: string): Promise<ApiResponse<Fee[]>> {
    return this.request(`/faculty/${facultyId}/fees`);
  }

  async addFee(facultyId: string, fee: Omit<Fee, 'id'>): Promise<ApiResponse<Fee>> {
    return this.request(`/faculty/${facultyId}/fees`, {
      method: 'POST',
      body: JSON.stringify(fee),
    });
  }

  async updateFeeStatus(feeId: string, status: string, paymentDetails?: any): Promise<ApiResponse<Fee>> {
    return this.request(`/fees/${feeId}`, {
      method: 'PUT',
      body: JSON.stringify({ status, ...paymentDetails }),
    });
  }

  async sendFeeReminder(facultyId: string, studentIds: string[]): Promise<ApiResponse<void>> {
    return this.request(`/faculty/${facultyId}/fees/reminder`, {
      method: 'POST',
      body: JSON.stringify({ student_ids: studentIds }),
    });
  }

  // Event Management APIs
  async getEvents(facultyId: string): Promise<ApiResponse<Event[]>> {
    return this.request(`/faculty/${facultyId}/events`);
  }

  async createEvent(facultyId: string, event: Omit<Event, 'id' | 'created_at' | 'created_by'>): Promise<ApiResponse<Event>> {
    return this.request(`/faculty/${facultyId}/events`, {
      method: 'POST',
      body: JSON.stringify(event),
    });
  }

  async updateEvent(eventId: string, updates: Partial<Event>): Promise<ApiResponse<Event>> {
    return this.request(`/events/${eventId}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deleteEvent(eventId: string): Promise<ApiResponse<void>> {
    return this.request(`/events/${eventId}`, {
      method: 'DELETE',
    });
  }

  async getEventRegistrations(eventId: string): Promise<ApiResponse<any[]>> {
    return this.request(`/events/${eventId}/registrations`);
  }

  // Transport Management APIs
  async getTransport(facultyId: string): Promise<ApiResponse<Transport[]>> {
    return this.request(`/faculty/${facultyId}/transport`);
  }

  async addTransport(facultyId: string, transport: Omit<Transport, 'id' | 'created_at' | 'created_by'>): Promise<ApiResponse<Transport>> {
    return this.request(`/faculty/${facultyId}/transport`, {
      method: 'POST',
      body: JSON.stringify(transport),
    });
  }

  async updateTransport(transportId: string, updates: Partial<Transport>): Promise<ApiResponse<Transport>> {
    return this.request(`/transport/${transportId}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deleteTransport(transportId: string): Promise<ApiResponse<void>> {
    return this.request(`/transport/${transportId}`, {
      method: 'DELETE',
    });
  }

  // Timetable Management APIs
  async getTimetable(facultyId: string): Promise<ApiResponse<Timetable[]>> {
    return this.request(`/faculty/${facultyId}/timetable`);
  }

  async addTimetableEntry(facultyId: string, entry: Omit<Timetable, 'id' | 'faculty_id'>): Promise<ApiResponse<Timetable>> {
    return this.request(`/faculty/${facultyId}/timetable`, {
      method: 'POST',
      body: JSON.stringify(entry),
    });
  }

  async updateTimetableEntry(entryId: string, updates: Partial<Timetable>): Promise<ApiResponse<Timetable>> {
    return this.request(`/timetable/${entryId}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deleteTimetableEntry(entryId: string): Promise<ApiResponse<void>> {
    return this.request(`/timetable/${entryId}`, {
      method: 'DELETE',
    });
  }

  // Notification APIs
  async sendNotification(facultyId: string, notification: {
    title: string;
    message: string;
    type?: string;
    target_students?: string[];
    target_all?: boolean;
  }): Promise<ApiResponse<void>> {
    return this.request(`/faculty/${facultyId}/notifications`, {
      method: 'POST',
      body: JSON.stringify(notification),
    });
  }

  // Analytics and Reports APIs
  async getAttendanceReport(facultyId: string, filters: {
    student_id?: string;
    subject_code?: string;
    from_date?: string;
    to_date?: string;
  }): Promise<ApiResponse<any>> {
    const query = new URLSearchParams(filters).toString();
    return this.request(`/faculty/${facultyId}/reports/attendance?${query}`);
  }

  async getFeeReport(facultyId: string, filters: {
    status?: string;
    fee_type?: string;
    from_date?: string;
    to_date?: string;
  }): Promise<ApiResponse<any>> {
    const query = new URLSearchParams(filters).toString();
    return this.request(`/faculty/${facultyId}/reports/fees?${query}`);
  }

  async getStudentProfile(studentId: string): Promise<ApiResponse<any>> {
    return this.request(`/students/${studentId}/profile`);
  }
}

export const backendApi = new BackendApiService();

// Export API endpoints for Postman testing
export const API_ENDPOINTS = {
  // Authentication
  FACULTY_LOGIN: 'POST /api/auth/faculty/login',
  
  // Student Management
  GET_STUDENTS: 'GET /api/faculty/:facultyId/students',
  ADD_STUDENT: 'POST /api/faculty/:facultyId/students',
  UPDATE_STUDENT: 'PUT /api/students/:studentId',
  DELETE_STUDENT: 'DELETE /api/students/:studentId',
  
  // Assignment Management
  GET_ASSIGNMENTS: 'GET /api/faculty/:facultyId/assignments',
  CREATE_ASSIGNMENT: 'POST /api/faculty/:facultyId/assignments',
  UPDATE_ASSIGNMENT: 'PUT /api/assignments/:assignmentId',
  DELETE_ASSIGNMENT: 'DELETE /api/assignments/:assignmentId',
  
  // Attendance Management
  GET_ATTENDANCE: 'GET /api/faculty/:facultyId/attendance',
  MARK_ATTENDANCE: 'POST /api/faculty/:facultyId/attendance',
  BULK_MARK_ATTENDANCE: 'POST /api/faculty/:facultyId/attendance/bulk',
  
  // Fee Management
  GET_FEES: 'GET /api/faculty/:facultyId/fees',
  ADD_FEE: 'POST /api/faculty/:facultyId/fees',
  UPDATE_FEE_STATUS: 'PUT /api/fees/:feeId',
  SEND_FEE_REMINDER: 'POST /api/faculty/:facultyId/fees/reminder',
  
  // Event Management
  GET_EVENTS: 'GET /api/faculty/:facultyId/events',
  CREATE_EVENT: 'POST /api/faculty/:facultyId/events',
  UPDATE_EVENT: 'PUT /api/events/:eventId',
  DELETE_EVENT: 'DELETE /api/events/:eventId',
  GET_EVENT_REGISTRATIONS: 'GET /api/events/:eventId/registrations',
  
  // Transport Management
  GET_TRANSPORT: 'GET /api/faculty/:facultyId/transport',
  ADD_TRANSPORT: 'POST /api/faculty/:facultyId/transport',
  UPDATE_TRANSPORT: 'PUT /api/transport/:transportId',
  DELETE_TRANSPORT: 'DELETE /api/transport/:transportId',
  
  // Timetable Management
  GET_TIMETABLE: 'GET /api/faculty/:facultyId/timetable',
  ADD_TIMETABLE_ENTRY: 'POST /api/faculty/:facultyId/timetable',
  UPDATE_TIMETABLE_ENTRY: 'PUT /api/timetable/:entryId',
  DELETE_TIMETABLE_ENTRY: 'DELETE /api/timetable/:entryId',
  
  // Notifications
  SEND_NOTIFICATION: 'POST /api/faculty/:facultyId/notifications',
  
  // Reports
  GET_ATTENDANCE_REPORT: 'GET /api/faculty/:facultyId/reports/attendance',
  GET_FEE_REPORT: 'GET /api/faculty/:facultyId/reports/fees',
  GET_STUDENT_PROFILE: 'GET /api/students/:studentId/profile',
};

console.log('AcadNext API Endpoints for Postman Testing:', API_ENDPOINTS);
