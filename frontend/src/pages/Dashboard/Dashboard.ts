// pages/Dashboard/Dashboard.ts

import { getDriverCount } from '../../services/dashboardService';
import { getVehicleCount } from '../../services/dashboardService';
import { getInspectionCount } from '../../services/dashboardService';

const totalDrivers = document.getElementById("totalDrivers") as HTMLElement;
const totalVehicles = document.getElementById("totalVehicles") as HTMLElement;
const totalInspections = document.getElementById("totalInspections") as HTMLElement;
const logoutBtn = document.getElementById("logoutBtn") as HTMLElement;

// Fetch data and populate the dashboard
async function populateDashboard() {
  try {
    totalDrivers.textContent = (await getDriverCount()).toString();
    totalVehicles.textContent = (await getVehicleCount()).toString();
    totalInspections.textContent = (await getInspectionCount()).toString();
  } catch (error) {
    console.error("Error populating dashboard:", error);
  }
}

// Handle logout
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("authToken");
  window.location.href = "../Login/Login.html";
});

// Initialize the dashboard
populateDashboard();
