// services/staffService.ts

const API_URL = "http://localhost:3000/api/staff"; // Update this URL to match your project's backend API

// Fetch all staff data
export const fetchStaff = async (): Promise<any[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error("Failed to fetch staff");
    }
    return await response.json();
};

// Fetch a single staff member by ID
export const fetchStaffMember = async (id: string): Promise<any> => {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch staff member with ID ${id}`);
    }
    return await response.json();
};

// Add a new staff member
export const addStaff = async (staff: any): Promise<any> => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(staff),
    });

    if (!response.ok) {
        throw new Error("Failed to add staff");
    }

    return await response.json();
};

// Update an existing staff member
export const updateStaff = async (id: string, staff: any): Promise<any> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(staff),
    });

    if (!response.ok) {
        throw new Error(`Failed to update staff with ID ${id}`);
    }

    return await response.json();
};

// Delete a staff member by ID
export const deleteStaff = async (id: string): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error(`Failed to delete staff with ID ${id}`);
    }
};
