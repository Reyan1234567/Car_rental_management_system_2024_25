// services/inspectionService.ts

import { FetchWrapper } from "../utils/fetchWrapper";


const inspectionApi = "http://localhost:3000/api/inspections";

// Function to fetch all inspections
async function fetchInspections() {
  return FetchWrapper.get(inspectionApi);
}

// Function to get a single inspection by ID
async function fetchInspection(id: string) {
  return FetchWrapper.get(`${inspectionApi}/${id}`);
}

// Function to add a new inspection
async function addInspection(data: any) {
  return FetchWrapper.post(inspectionApi, data);
}

// Function to update an existing inspection
async function updateInspection(id: string, data: any) {
  return FetchWrapper.put(`${inspectionApi}/${String(id)}`, data); // Ensure id is treated as string
}

// Function to delete an inspection
async function deleteInspection(id: string) {
  if (confirm("Are you sure you want to delete this inspection?")) {
    await FetchWrapper.delete(`${inspectionApi}/${String(id)}`); // Ensure id is treated as string
  }
}

export { fetchInspections, fetchInspection, addInspection, updateInspection, deleteInspection };
