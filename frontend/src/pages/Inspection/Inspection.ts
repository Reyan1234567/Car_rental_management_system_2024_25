interface Inspection {
  id: number;
  vehicle: string;
  date: string;
  inspector: string;
  status: string;
  price: number;
  comments: string;
}

// Mock data for inspections
let inspections: Inspection[] = [
  { id: 1, vehicle: "ABC123", date: "2025-01-01", inspector: "John Doe", status: "Passed", price: 50, comments: "No issues" },
  { id: 2, vehicle: "XYZ456", date: "2025-01-02", inspector: "Jane Smith", status: "Failed", price: 60, comments: "Tire damage" },
];

// Select DOM elements
const inspectionTableBody = document.getElementById("inspectionTableBody")!;
const addInspectionBtn = document.getElementById("addInspectionBtn")!;
const inspectionForm = document.getElementById("inspectionForm") as HTMLFormElement;

// Render inspections in the table
function renderInspections() {
  inspectionTableBody.innerHTML = "";
  inspections.forEach((inspection) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${inspection.id}</td>
      <td>${inspection.vehicle}</td>
      <td>${inspection.date}</td>
      <td>${inspection.inspector}</td>
      <td>${inspection.status}</td>
      <td>${inspection.price}</td>
      <td>${inspection.comments}</td>
      <td>
        <button class="btn btn-sm btn-warning" onclick="editInspection(${inspection.id})">Edit</button>
        <button class="btn btn-sm btn-danger" onclick="deleteInspection(${inspection.id})">Delete</button>
      </td>
    `;

    inspectionTableBody.appendChild(row);
  });
}

// Add a new inspection
function addInspection(event: Event) {
  event.preventDefault();

  const vehicle = (document.getElementById("inspectionVehicle") as HTMLInputElement).value;
  const date = (document.getElementById("inspectionDate") as HTMLInputElement).value;
  const status = (document.getElementById("inspectionStatus") as HTMLSelectElement).value;

  const newInspection: Inspection = {
    id: inspections.length + 1,
    vehicle,
    date,
    inspector: "Default Inspector",
    status,
    price: 0, // Default price
    comments: "No comments", 
  };

  inspections.push(newInspection);
  renderInspections();
  (document.getElementById("inspectionModal") as any).modal("hide");
  inspectionForm.reset();
}

// Edit an inspection
(window as any).editInspection = (id: number) => {
  const inspection = inspections.find((ins) => ins.id === id);
  if (!inspection) return;

  (document.getElementById("inspectionVehicle") as HTMLInputElement).value = inspection.vehicle;
  (document.getElementById("inspectionDate") as HTMLInputElement).value = inspection.date;
  (document.getElementById("inspectionStatus") as HTMLSelectElement).value = inspection.status;

  // Update the save button to handle editing
  const saveButton = inspectionForm.querySelector("button[type='submit']")!;
  saveButton.textContent = "Update";
  saveButton.onclick = (e) => {
    e.preventDefault();
    inspection.vehicle = (document.getElementById("inspectionVehicle") as HTMLInputElement).value;
    inspection.date = (document.getElementById("inspectionDate") as HTMLInputElement).value;
    inspection.status = (document.getElementById("inspectionStatus") as HTMLSelectElement).value;

    renderInspections();
    (document.getElementById("inspectionModal") as any).modal("hide");
    inspectionForm.reset();
    saveButton.textContent = "Save";
    saveButton.onclick = addInspection;
  };

  (document.getElementById("inspectionModal") as any).modal("show");
};

// Delete an inspection
(window as any).deleteInspection = (id: number) => {
  inspections = inspections.filter((ins) => ins.id !== id);
  renderInspections();
};

// Initialize event listeners
addInspectionBtn.addEventListener("click", () => {
  inspectionForm.reset();
  (document.getElementById("inspectionModal") as any).modal("show");
});

inspectionForm.addEventListener("submit", addInspection);

renderInspections();
