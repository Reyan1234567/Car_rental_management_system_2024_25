const modal = document.getElementById("driver-modal") as HTMLElement;
const closeModalBtn = document.getElementById("close-modal") as HTMLElement;
const createDriverBtn = document.getElementById("create-driver-btn") as HTMLElement;
const driverForm = document.getElementById("driver-form") as HTMLFormElement;
const driverList = document.getElementById("driver-list") as HTMLElement;

let editingId: string | null = null;

// Show modal for creating a new driver
createDriverBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
  driverForm.reset();
  editingId = null;
  document.getElementById("modal-title")!.innerText = "Create Driver";
});

// Close the modal
closeModalBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// Handle form submission
driverForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(driverForm);
  const data = Object.fromEntries(formData) as any;

  if (editingId) {
    // Update existing driver
    await fetch(`http://localhost:3333/drivers/${editingId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } else {
    // Create new driver
    await fetch("http://localhost:3333/drivers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  }

  loadDrivers();
  modal.classList.add("hidden");
});

// Load all drivers
async function loadDrivers() {
  const response = await fetch("http://localhost:3333/drivers");
  const drivers = await response.json();
  driverList.innerHTML = "";

  drivers.forEach((driver: any) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${driver.driverID}</td>
      <td>${driver.name}</td>
      <td>${driver.licenseNumber}</td>
      <td>${driver.phone}</td>
      <td>${driver.email}</td>
      <td>${driver.status}</td>
      <td>
        <button class="btn btn-warning btn-sm" onclick="editDriver('${driver._id}')">Edit</button>
        <button class="btn btn-danger btn-sm" onclick="deleteDriver('${driver._id}')">Delete</button>
      </td>
    `;
    driverList.appendChild(row);
  });
}

// Edit a driver
(window as any).editDriver = async function (id: string) {
  const response = await fetch(`http://localhost:3333/drivers/${id}`);
  const driver = await response.json();

  (document.getElementById("driverID") as HTMLInputElement).value = driver.driverID;
  (document.getElementById("name") as HTMLInputElement).value = driver.name;
  (document.getElementById("licenseNumber") as HTMLInputElement).value = driver.licenseNumber;
  (document.getElementById("phone") as HTMLInputElement).value = driver.phone;
  (document.getElementById("email") as HTMLInputElement).value = driver.email;
  (document.getElementById("status") as HTMLSelectElement).value = driver.status;

  editingId = id;
  modal.classList.remove("hidden");
  document.getElementById("modal-title")!.innerText = "Update Driver";
};

// Delete a driver
(window as any).deleteDriver = async function (id: string) {
  await fetch(`http://localhost:3333/drivers/${id}`, { method: "DELETE" });
  loadDrivers();
};
