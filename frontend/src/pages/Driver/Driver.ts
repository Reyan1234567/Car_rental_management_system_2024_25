// pages/Driver/Driver.ts

import {
    fetchDrivers,
    fetchDriver,
    addDriver,
    updateDriver,
    deleteDriver,
  } from "../../services/driverService";
  
  const driverTableBody = document.getElementById("driverTableBody") as HTMLElement;
  const addDriverBtn = document.getElementById("addDriverBtn") as HTMLElement;
  const driverModal = document.getElementById("driverModal") as HTMLElement;
  const driverForm = document.getElementById("driverForm") as HTMLFormElement;
  
  let editingDriverId: string | null = null;
  
  // Load and display drivers
  async function loadDrivers() {
    driverTableBody.innerHTML = "";
    try {
      const drivers = await fetchDrivers();
      drivers.forEach((driver, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${index + 1}</td>
          <td>${driver.name}</td>
          <td>${driver.phone}</td>
          <td>${driver.licenseNumber}</td>
          <td>
            <button class="btn btn-warning btn-sm edit-btn" data-id="${driver.id}">Edit</button>
            <button class="btn btn-danger btn-sm delete-btn" data-id="${driver.id}">Delete</button>
          </td>
        `;
        driverTableBody.appendChild(row);
      });
    } catch (error) {
      console.error("Error loading drivers:", error);
    }
  }
  
  // Handle form submission
  driverForm.addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const name = (document.getElementById("driverName") as HTMLInputElement).value;
    const phone = (document.getElementById("driverPhone") as HTMLInputElement).value;
    const licenseNumber = (document.getElementById("driverLicense") as HTMLInputElement).value;
  
    try {
      if (editingDriverId) {
        await updateDriver(editingDriverId, { name, phone, licenseNumber });
      } else {
        await addDriver({ name, phone, licenseNumber });
      }
      loadDrivers();
      driverForm.reset();
      driverModal.style.display = "none";
    } catch (error) {
      console.error("Error saving driver:", error);
    }
  });
  
  // Handle add button click
  addDriverBtn.addEventListener("click", () => {
    editingDriverId = null;
    driverForm.reset();
    driverModal.style.display = "block";
  });
  
  // Handle edit and delete actions
  driverTableBody.addEventListener("click", async (e) => {
    const target = e.target as HTMLElement;
  
    if (target.classList.contains("edit-btn")) {
      editingDriverId = target.dataset.id!;
      const driver = await fetchDriver(editingDriverId);
      (document.getElementById("driverName") as HTMLInputElement).value = driver.name;
      (document.getElementById("driverPhone") as HTMLInputElement).value = driver.phone;
      (document.getElementById("driverLicense") as HTMLInputElement).value = driver.licenseNumber;
      driverModal.style.display = "block";
    } else if (target.classList.contains("delete-btn")) {
      const driverId = target.dataset.id!;
      await deleteDriver(driverId);
      loadDrivers();
    }
  });
  
  // Initialize page
  loadDrivers();
  