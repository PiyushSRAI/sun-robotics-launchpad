//
const API_BASE_URL = "http://localhost:8080/api";

export interface Job {
    id?: number;
    title: string;
    department: string;
    location: string;
    type: string;
    description: string;
    requirements: string;
    active: boolean;
}

export interface Application {
    id: number;
    job: Job;
    fullName: string;
    email: string;
    phone: string;
    resumeUrl: string;
    coverLetter: string;
    status: string;
    appliedAt: string;
}

export interface ContactMessage {
    id: number;
    name: string;
    email: string;
    company: string;
    phone: string;
    subject: string;
    message: string;
    read: boolean;
    createdAt: string;
}

export interface ApplicationDTO {
    jobId: number;
    fullName: string;
    email: string;
    phone: string;
    resumeUrl: string;
    coverLetter: string;
}

export interface ContactDTO {
    name: string;
    email: string;
    company?: string;
    phone?: string;
    subject?: string;
    message: string;
}

// --- HELPER: Get Headers with Token ---
const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        "Content-Type": "application/json",
        ...(token ? { "Authorization": `Bearer ${token}` } : {})
    };
};

export const api = {
    // --- AUTHENTICATION ---
    login: async (username: string, password: string) => {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });
        if (!response.ok) throw new Error("Login failed");

        const data = await response.json();
        localStorage.setItem("token", data.token); // Save token for future requests
        return data;
    },

    logout: () => {
        localStorage.removeItem("token");
        window.location.href = "/admin/login";
    },

    // --- PUBLIC ENDPOINTS (No Token Needed) ---
    getJobs: async (): Promise<Job[]> => {
        const response = await fetch(`${API_BASE_URL}/jobs`);
        if (!response.ok) throw new Error("Failed to fetch jobs");
        return response.json();
    },

    getJobById: async (id: string): Promise<Job> => {
        const response = await fetch(`${API_BASE_URL}/jobs/${id}`);
        if (!response.ok) throw new Error("Failed to fetch job");
        return response.json();
    },

    applyForJob: async (data: ApplicationDTO) => {
        const response = await fetch(`${API_BASE_URL}/applications/apply`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || "Failed to submit application");
        }
        return response.json();
    },

    sendContactMessage: async (data: ContactDTO) => {
        const response = await fetch(`${API_BASE_URL}/contact`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error("Failed to send message");
        return response.json();
    },

    // --- ADMIN ENDPOINTS (Protected with Token) ---

    // Jobs
    getAllJobsAdmin: async (): Promise<Job[]> => {
        const response = await fetch(`${API_BASE_URL}/admin/jobs`, {
            headers: getAuthHeaders()
        });
        if (!response.ok) throw new Error("Failed to fetch admin jobs");
        return response.json();
    },

    createJob: async (job: Job) => {
        const response = await fetch(`${API_BASE_URL}/admin/jobs`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(job),
        });
        if (!response.ok) throw new Error("Failed to create job");
        return response.json();
    },

    updateJob: async (id: number, job: Job) => {
        const response = await fetch(`${API_BASE_URL}/admin/jobs/${id}`, {
            method: "PUT",
            headers: getAuthHeaders(),
            body: JSON.stringify(job),
        });
        if (!response.ok) throw new Error("Failed to update job");
        return response.json();
    },

    deleteJob: async (id: number) => {
        const response = await fetch(`${API_BASE_URL}/admin/jobs/${id}`, {
            method: "DELETE",
            headers: getAuthHeaders(),
        });
        if (!response.ok) throw new Error("Failed to delete job");
        return response.json();
    },

    // Applications
    getApplications: async (): Promise<Application[]> => {
        const response = await fetch(`${API_BASE_URL}/admin/applications`, {
            headers: getAuthHeaders()
        });
        if (!response.ok) throw new Error("Failed to fetch applications");
        return response.json();
    },

    updateApplicationStatus: async (id: number, status: string) => {
        const response = await fetch(`${API_BASE_URL}/admin/applications/${id}/status`, {
            method: "PATCH",
            headers: getAuthHeaders(),
            body: JSON.stringify({ status }),
        });
        if (!response.ok) throw new Error("Failed to update status");
        return response.json();
    },

    // Messages
    getMessages: async (): Promise<ContactMessage[]> => {
        const response = await fetch(`${API_BASE_URL}/admin/messages`, {
            headers: getAuthHeaders()
        });
        if (!response.ok) throw new Error("Failed to fetch messages");
        return response.json();
    },

    markMessageRead: async (id: number) => {
        const response = await fetch(`${API_BASE_URL}/admin/messages/${id}/read`, {
            method: "PATCH",
            headers: getAuthHeaders(),
        });
        if (!response.ok) throw new Error("Failed to mark read");
        return response.json();
    },

    deleteMessage: async (id: number) => {
        const response = await fetch(`${API_BASE_URL}/admin/messages/${id}`, {
            method: "DELETE",
            headers: getAuthHeaders(),
        });
        if (!response.ok) throw new Error("Failed to delete message");
        return response.json();
    }
};