// services/vehicleService.ts

const API_URL = "http://localhost:3333/vehicles"; // Update this URL to match your project's backend API

// Fetch all vehicles
export const fetchVehicles = async (): Promise<any[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error("Failed to fetch vehicles");
    }
    return await response.json();
};

// Fetch a single vehicle by ID
export const fetchVehicle = async (id: string): Promise<any> => {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch vehicle with ID ${id}`);
    }
    return await response.json();
};

// Add a new vehicle
export const addVehicle = async (vehicle: any): Promise<any> => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(vehicle),
    });

    if (!response.ok) {
        throw new Error("Failed to add vehicle");
    }

    return await response.json();
};

// Update an existing vehicle
export const updateVehicle = async (id: string, vehicle: any): Promise<any> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(vehicle),
    });

    if (!response.ok) {
        throw new Error(`Failed to update vehicle with ID ${id}`);
    }

    return await response.json();
};

// Delete a vehicle by ID
export const deleteVehicle = async (id: string): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error(`Failed to delete vehicle with ID ${id}`);
    }
};
