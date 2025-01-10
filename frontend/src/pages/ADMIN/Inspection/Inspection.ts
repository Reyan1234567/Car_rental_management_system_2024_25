const modal = document.getElementById("inspection-modal") as HTMLElement;
const closeModalBtn = document.getElementById("close-modal") as HTMLElement;
const createInspectionBtn = document.getElementById("create-inspection-btn") as HTMLElement;
const inspectionForm = document.getElementById("inspection-form") as HTMLFormElement;
const inspectionList = document.getElementById("inspection-list") as HTMLElement;

let editingId: string | null = null;

// Show modal for creating a new inspection
createInspectionBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
  inspectionForm.reset();
  editingId = null;
  document.getElementById("modal-title")!.innerText = "Create Inspection";
});

// Close the modal
closeModalBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// Handle form submission
inspectionForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(inspectionForm);
  const data = Object.fromEntries(formData) as any;

  if (editingId) {
    // Update existing inspection
    await fetch(`http://localhost:3333/inspections/${editingId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } else {
    // Create new inspection
    await fetch("http://localhost:3333/inspections", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  }

  loadInspections();
  modal.classList.add("hidden");
});

// Load all inspections
async function loadInspections() {
  const response = await fetch("http://localhost:3333/inspections");
  const inspections = await response.json();
  inspectionList.innerHTML = "";

  inspections.forEach((inspection: any) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${inspection.inspectionID}</td>
      <td>${inspection.vehicleID}</td>
      <td>${new Date(inspection.date).toLocaleDateString()}</td>
      <td>${inspection.inspectorName}</td>
      <td>${inspection.status}</td>
      <td>${inspection.price.toFixed(2)}</td>
      <td>${inspection.comments}</td>
      <td>
        <button class="btn btn-warning btn-sm" onclick="editInspection('${inspection._id}')">Edit</button>
        <button class="btn btn-danger btn-sm" onclick="deleteInspection('${inspection._id}')">Delete</button>
      </td>
    `;
    inspectionList.appendChild(row);
  });
}

// Edit an inspection
(window as any).editInspection = async function (id: string) {
  const response = await fetch(`http://localhost:3333/inspections/${id}`);
  const inspection = await response.json();

  (document.getElementById("inspectionID") as HTMLInputElement).value = inspection.inspectionID;
  (document.getElementById("vehicleID") as HTMLInputElement).value = inspection.vehicleID;
  (document.getElementById("date") as HTMLInputElement).value = new Date(inspection.date).toISOString().split("T")[0];
  (document.getElementById("inspectorName") as HTMLInputElement).value = inspection.inspectorName;
  (document.getElementById("status") as HTMLSelectElement).value = inspection.status;
  (document.getElementById("price") as HTMLInputElement).value = inspection.price.toString();
  (document.getElementById("comments") as HTMLTextAreaElement).value = inspection.comments;

  editingId = id;
  modal.classList.remove("hidden");
  document.getElementById("modal-title")!.innerText = "Update Inspection";
};

// Delete an inspection
(window as any).deleteInspection = async function (id: string) {
  await fetch(`http://localhost:3333/inspections/${id}`, { method: "DELETE" });
  loadInspections();
};

// Initial load
loadInspections();

