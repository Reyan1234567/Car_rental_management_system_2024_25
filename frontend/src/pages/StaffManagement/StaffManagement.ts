// pages/StaffManagement/StaffManagement.ts

import { fetchStaff, addStaff, updateStaff, deleteStaff } from '../../services/staffService';

const loadStaff = async () => {
    try {
        const staff = await fetchStaff();
        console.log("Staff loaded:", staff);
        // Handle the display of staff on your page here
    } catch (error) {
        console.error("Error loading staff:", error);
    }
};

// Example usage for adding a new staff member
const newStaff = { name: "John Doe", role: "Driver", email: "john.doe@example.com" };
const addNewStaff = async () => {
    try {
        const addedStaff = await addStaff(newStaff);
        console.log("Staff added:", addedStaff);
    } catch (error) {
        console.error("Error adding staff:", error);
    }
};

// Example usage for updating a staff member
const updatedStaff = { name: "John Doe", role: "Manager", email: "john.doe@example.com" };
const updateExistingStaff = async (id: string) => {
    try {
        const updatedStaffData = await updateStaff(id, updatedStaff);
        console.log("Staff updated:", updatedStaffData);
    } catch (error) {
        console.error("Error updating staff:", error);
    }
};

// Example usage for deleting a staff member
const deleteExistingStaff = async (id: string) => {
    try {
        await deleteStaff(id);
        console.log("Staff deleted");
    } catch (error) {
        console.error("Error deleting staff:", error);
    }
};

loadStaff(); // Call the loadStaff function when the page is loaded
