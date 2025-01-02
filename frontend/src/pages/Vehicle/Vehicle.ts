// pages/Vehicle/Vehicle.ts

import { fetchVehicles, addVehicle, updateVehicle, deleteVehicle } from '../../services/vehicleService';

// Function to load and display all vehicles
const loadVehicles = async () => {
    try {
        const vehicles = await fetchVehicles();
        console.log("Vehicles loaded:", vehicles);
        // Handle the display of vehicles on your page here
        displayVehicles(vehicles);
    } catch (error) {
        console.error("Error loading vehicles:", error);
    }
};

// Function to display vehicles (for example, in a table)
const displayVehicles = (vehicles: any[]) => {
    const vehicleTable = document.getElementById("vehicleTable");
    if (!vehicleTable) return;

    vehicles.forEach(vehicle => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${vehicle.model}</td>
            <td>${vehicle.brand}</td>
            <td>${vehicle.year}</td>
            <td><button onclick="editVehicle(${vehicle.id})">Edit</button></td>
            <td><button onclick="deleteVehicle(${vehicle.id})">Delete</button></td>
        `;
        vehicleTable.appendChild(row);
    });
};

// Example usage for adding a new vehicle
const newVehicle = { model: "Toyota Corolla", brand: "Toyota", year: 2020 };
const addNewVehicle = async () => {
    try {
        const addedVehicle = await addVehicle(newVehicle);
        console.log("Vehicle added:", addedVehicle);
        loadVehicles();  // Reload vehicles after adding
    } catch (error) {
        console.error("Error adding vehicle:", error);
    }
};

// Example usage for updating a vehicle
const updatedVehicle = { model: "Toyota Corolla", brand: "Toyota", year: 2021 };
const updateExistingVehicle = async (id: string) => {
    try {
        const updatedVehicleData = await updateVehicle(id, updatedVehicle);
        console.log("Vehicle updated:", updatedVehicleData);
        loadVehicles();  // Reload vehicles after update
    } catch (error) {
        console.error("Error updating vehicle:", error);
    }
};

// Example usage for deleting a vehicle
const deleteExistingVehicle = async (id: string) => {
    try {
        await deleteVehicle(id);
        console.log("Vehicle deleted");
        loadVehicles();  // Reload vehicles after deletion
    } catch (error) {
        console.error("Error deleting vehicle:", error);
    }
};

// Call the loadVehicles function when the page is loaded
loadVehicles();
