const API_BASE_URL = "http://localhost:8080/api"; // Matches your Spring Boot Port

export interface Job {
    id: number;
    title: string;
    department: string;
    location: string;
    type: string;
    description: string;
    requirements: string;
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

export const api = {
    // Fetch all active jobs
    getJobs: async (): Promise<Job[]> => {
        const response = await fetch(`${API_BASE_URL}/jobs`);
        if (!response.ok) throw new Error("Failed to fetch jobs");
        return response.json();
    },

    // Submit a job application
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

    // Send a contact message
    sendContactMessage: async (data: ContactDTO) => {
        const response = await fetch(`${API_BASE_URL}/contact`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error("Failed to send message");
        return response.json();
    },
};