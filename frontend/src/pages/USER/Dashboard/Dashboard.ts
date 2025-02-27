

import { getDriverCount } from '../../../services/dashboardService';
import { getVehicleCount } from '../../../services/dashboardService';
import { getInspectionCount } from '../../../services/dashboardService';

const totalDrivers = document.getElementById("totalDrivers") as HTMLElement;
const totalVehicles = document.getElementById("totalVehicles") as HTMLElement;
const totalInspections = document.getElementById("totalInspections") as HTMLElement;
const logoutBtn = document.getElementById("logoutBtn") as HTMLElement;

<<<<<<< HEAD:frontend/src/pages/USER/Dashboard/Dashboard.ts

=======
>>>>>>> 8e326ec7942ea9e7f7bdf0854bdc495ec63a76e3:frontend/src/pages/Dashboard/Dashboard.ts
async function populateDashboard() {
  try {
    totalDrivers.textContent = (await getDriverCount()).toString();
    totalVehicles.textContent = (await getVehicleCount()).toString();
    totalInspections.textContent = (await getInspectionCount()).toString();
  } catch (error) {
    console.error("Error populating dashboard:", error);
  }
}

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("authToken");
  window.location.href = "../Login/Login.html";
});

populateDashboard();
