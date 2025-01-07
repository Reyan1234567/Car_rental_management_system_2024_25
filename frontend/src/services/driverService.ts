// services/driverService.ts

const API_URL = "http://localhost:3333"; // Update to match your backend API URL

// Fetch all drivers
export const fetchDrivers = async (): Promise<any[]> => {
  const response = await fetch(`${API_URL}/drivers`);
  if (!response.ok) {
    throw new Error("Failed to fetch drivers");
  }
  return await response.json();
};

// Fetch a single driver by ID
export const fetchDriver = async (id: string): Promise<any> => {
  const response = await fetch(`${API_URL}/drivers/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch driver");
  }
  return await response.json();
};

// Add a new driver
export const addDriver = async (driver: { name: string; phone: string; licenseNumber: string }): Promise<void> => {
  const response = await fetch(`${API_URL}/drivers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(driver),
  });
  if (!response.ok) {
    throw new Error("Failed to add driver");
  }
};

// Update a driver by ID
export const updateDriver = async (id: string, driver: { name: string; phone: string; licenseNumber: string }): Promise<void> => {
  const response = await fetch(`${API_URL}/drivers/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(driver),
  });
  if (!response.ok) {
    throw new Error("Failed to update driver");
  }
};

// Delete a driver by ID
export const deleteDriver = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/drivers/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error("Failed to delete driver");
  }
};
