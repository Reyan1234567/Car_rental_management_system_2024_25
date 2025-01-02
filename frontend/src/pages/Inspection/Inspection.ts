// pages/Inspection/Inspection.ts

import { fetchInspections, fetchInspection, addInspection, updateInspection, deleteInspection } from "../../services/inspectionService";

const inspectionTableBody = document.getElementById("inspection-table-body") as HTMLElement;
const addInspectionBtn = document.getElementById("add-inspection-btn") as HTMLElement;
const inspectionModal = document.getElementById("inspection-modal") as HTMLElement;
const inspectionForm = document.getElementById("inspection-form") as HTMLFormElement;

// Load and display inspections
async function loadInspections() {
  inspectionTableBody.innerHTML = "";
  try {
    const inspections = await fetchInspections();
    inspections.forEach((inspection: any) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${inspection.id}</td>
        <td>${inspection.vehicle}</td>
        <td>${inspection.inspector}</td>
        <td>${new Date(inspection.date).toLocaleDateString()}</td>
        <td>${inspection.status}</td>
        <td>
          <button class="btn btn-sm btn-warning edit-inspection-btn" data-id="${inspection.id}">Edit</button>
          <button class="btn btn-sm btn-danger delete-inspection-btn" data-id="${inspection.id}">Delete</button>
        </td>
      `;
      inspectionTableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Error loading inspections:", error);
  }
}

// Handle edit and delete actions
inspectionTableBody.addEventListener("click", async (e) => {
  const target = e.target as HTMLElement;
  
  if (target.classList.contains("edit-inspection-btn")) {
    const id = target.dataset.id!;
    const inspection = await fetchInspection(id);
    openModal(inspection);
  } else if (target.classList.contains("delete-inspection-btn")) {
    const id = target.dataset.id!;
    await deleteInspection(id);
    loadInspections(); // Reload inspections after deletion
  }
});

// Handle form submission
inspectionForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const formData = new FormData(e.target as HTMLFormElement);
  const data = Object.fromEntries(formData.entries());

  try {
    if (data.id) {
      await updateInspection(data.id as string, data);
    } else {
      await addInspection(data);
    }
    loadInspections();
    inspectionForm.reset();
    inspectionModal.style.display = "none";
  } catch (error) {
    console.error("Error saving inspection:", error);
  }
});

// Handle add inspection button click
addInspectionBtn.addEventListener("click", () => {
  openModal();
});

// Function to open modal for adding/editing an inspection
function openModal(inspection: any = null) {
  inspectionModal.innerHTML = `
    <div class="modal-content">
      <form id="inspection-form">
        <input type="hidden" name="id" value="${inspection?.id || ""}" />
        <label>Vehicle</label>
        <input type="text" name="vehicle" value="${inspection?.vehicle || ""}" required />
        <label>Inspector</label>
        <input type="text" name="inspector" value="${inspection?.inspector || ""}" required />
        <label>Date</label>
        <input type="date" name="date" value="${inspection?.date || ""}" required />
        <label>Status</label>
        <select name="status" required>
          <option value="Pending" ${inspection?.status === "Pending" ? "selected" : ""}>Pending</option>
          <option value="Completed" ${inspection?.status === "Completed" ? "selected" : ""}>Completed</option>
        </select>
        <button type="submit" class="btn btn-primary">Save</button>
        <button type="button" class="btn btn-secondary" id="close-modal">Cancel</button>
      </form>
    </div>
  `;
  
  inspectionModal.style.display = "block";
  document.getElementById("close-modal")!.addEventListener("click", () => {
    inspectionModal.style.display = "none";
  });
}

// Initialize page
loadInspections();
