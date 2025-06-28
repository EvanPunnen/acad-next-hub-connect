
// Postman Integration - Mock API Client
// Replace these endpoints with your actual Postman Mock Server URLs

const API_BASE_URL = 'https://your-postman-mock-server.com/api';

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

class ApiClient {
  private baseURL: string;
  private headers: Record<string, string>;

  constructor() {
    this.baseURL = API_BASE_URL;
    this.headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
  }

  // Generic request method
  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const config = {
        ...options,
        headers: {
          ...this.headers,
          ...options.headers,
        },
      };

      console.log(`API Request: ${options.method || 'GET'} ${url}`);
      
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error('API Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Student Management APIs
  async getStudents(filters?: { class?: string; search?: string }) {
    const params = new URLSearchParams();
    if (filters?.class) params.append('class', filters.class);
    if (filters?.search) params.append('search', filters.search);
    
    return this.request(`/students?${params.toString()}`);
  }

  async getStudent(studentId: string) {
    return this.request(`/students/${studentId}`);
  }

  async updateStudent(studentId: string, data: any) {
    return this.request(`/students/${studentId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async createStudent(data: any) {
    return this.request('/students', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Attendance APIs
  async getAttendance(studentId: string, filters?: { subject?: string; date?: string }) {
    const params = new URLSearchParams();
    if (filters?.subject) params.append('subject', filters.subject);
    if (filters?.date) params.append('date', filters.date);
    
    return this.request(`/students/${studentId}/attendance?${params.toString()}`);
  }

  async markAttendance(data: { studentIds: string[]; subject: string; date: string; status: string }) {
    return this.request('/attendance', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Grades APIs
  async getGrades(studentId: string) {
    return this.request(`/students/${studentId}/grades`);
  }

  async updateGrades(studentId: string, grades: any[]) {
    return this.request(`/students/${studentId}/grades`, {
      method: 'PUT',
      body: JSON.stringify({ grades }),
    });
  }

  // Fee Management APIs
  async getFees(studentId: string) {
    return this.request(`/students/${studentId}/fees`);
  }

  async processPayment(data: { studentId: string; amount: number; type: string }) {
    return this.request('/payments', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Assignment APIs
  async getAssignments(studentId?: string) {
    const endpoint = studentId ? `/students/${studentId}/assignments` : '/assignments';
    return this.request(endpoint);
  }

  async submitAssignment(data: { assignmentId: string; studentId: string; submission: any }) {
    return this.request('/assignments/submit', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Messaging APIs
  async getMessages(userId: string) {
    return this.request(`/messages/${userId}`);
  }

  async sendMessage(data: { from: string; to: string; message: string; type: string }) {
    return this.request('/messages', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Notifications APIs
  async getNotifications(userId: string) {
    return this.request(`/notifications/${userId}`);
  }

  async sendNotification(data: { recipients: string[]; title: string; message: string; type: string }) {
    return this.request('/notifications', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Money Collection APIs
  async getCollections(studentId?: string) {
    const endpoint = studentId ? `/students/${studentId}/collections` : '/collections';
    return this.request(endpoint);
  }

  async processCollectionPayment(data: { collectionId: string; studentId: string; amount: number }) {
    return this.request('/collections/payment', {
      method: 'POST', 
      body: JSON.stringify(data),
    });
  }

  // Library APIs
  async getLibraryBooks(filters?: { search?: string; available?: boolean }) {
    const params = new URLSearchParams();
    if (filters?.search) params.append('search', filters.search);
    if (filters?.available !== undefined) params.append('available', filters.available.toString());
    
    return this.request(`/library/books?${params.toString()}`);
  }

  async borrowBook(data: { studentId: string; bookId: string }) {
    return this.request('/library/borrow', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async returnBook(data: { studentId: string; bookId: string }) {
    return this.request('/library/return', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Events APIs
  async getEvents() {
    return this.request('/events');
  }

  async registerForEvent(data: { studentId: string; eventId: string }) {
    return this.request('/events/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Transport APIs
  async getTransportRoutes() {
    return this.request('/transport/routes');
  }

  async bookSeat(data: { studentId: string; routeId: string; date: string }) {
    return this.request('/transport/book', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export types for use in components
export type { ApiResponse };
