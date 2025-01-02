// services/dashboardService.ts

const API_URL = "http://localhost:3000/api"; // Update this URL to match your backend API

// Fetch total drivers count
export const getDriverCount = async (): Promise<number> => {
  const response = await fetch(`${API_URL}/drivers/count`);
  if (!response.ok) {
    throw new Error("Failed to fetch driver count");
  }
  const data = await response.json();
  return data.count;
};

// Fetch total vehicles count
export const getVehicleCount = async (): Promise<number> => {
  const response = await fetch(`${API_URL}/vehicles/count`);
  if (!response.ok) {
    throw new Error("Failed to fetch vehicle count");
  }
  const data = await response.json();
  return data.count;
};

// Fetch total inspections count
export const getInspectionCount = async (): Promise<number> => {
  const response = await fetch(`${API_URL}/inspections/count`);
  if (!response.ok) {
    throw new Error("Failed to fetch inspection count");
  }
  const data = await response.json();
  return data.count;
};
