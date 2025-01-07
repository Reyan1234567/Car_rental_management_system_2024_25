// services/priceService.ts

const API_URL = "http://localhost:3333/prices"; // Update this URL to the correct one for your project

// Fetch all price data
export const fetchPrices = async (): Promise<any[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error("Failed to fetch prices");
    }
    return await response.json();
};

// Get a single price by ID
export const fetchPrice = async (id: string): Promise<any> => {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch price with ID ${id}`);
    }
    return await response.json();
};

// Add a new price
export const addPrice = async (price: any): Promise<any> => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(price),
    });

    if (!response.ok) {
        throw new Error("Failed to add price");
    }

    return await response.json();
};

// Update an existing price
export const updatePrice = async (id: string, price: any): Promise<any> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(price),
    });

    if (!response.ok) {
        throw new Error(`Failed to update price with ID ${id}`);
    }

    return await response.json();
};

// Delete a price by ID
export const deletePrice = async (id: string): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error(`Failed to delete price with ID ${id}`);
    }
};
