type Driver = {
  _id:string;
  driverID: string;
  name: string;
  licenseNumber: string;
  phone: string;
  email: string;
  status: "Active" | "Inactive";
};

const addDriverBtn = document.getElementById("addDriverBtn") as HTMLButtonElement;
const cancelFormBtnn = document.getElementById("cancelForm") as HTMLButtonElement;
const driverForm = document.getElementById("driverForm") as HTMLFormElement;
const driverFormTitle = document.getElementById("formTitle") as HTMLHeadingElement;
const driverTableBody = document.getElementById("driverTableBody") as HTMLTableSectionElement;
const overlayy = document.getElementById("overlayy") as HTMLDivElement;
const driverFormContainer = document.getElementById("DriverForm") as HTMLDivElement;

let drivers: Driver[] = [];
let isEditing = false;
let currentDriverID: string | null = null;

const API_BASE_URL = "http://localhost:3333/drivers";

const toggleFormVisibility = (show: boolean) => {
  if (show) {
    driverFormContainer.style.display = "block";
    overlayy.style.display = "block";
  } else {
    driverFormContainer.style.display = "none";
    overlayy.style.display = "none";
    driverForm.reset();
    isEditing = false;
    currentDriverID = null;
  }
};

const populateForm = (driver: Driver) => {
  (driverForm.elements.namedItem("driverID") as HTMLInputElement).value = driver.driverID;
  (driverForm.elements.namedItem("driverName") as HTMLInputElement).value = driver.name;
  (driverForm.elements.namedItem("licenseNumber") as HTMLInputElement).value = driver.licenseNumber;
  (driverForm.elements.namedItem("driverPhone") as HTMLInputElement).value = driver.phone;
  (driverForm.elements.namedItem("driverEmail") as HTMLInputElement).value = driver.email;
  (driverForm.elements.namedItem("driverStatus") as HTMLSelectElement).value = driver.status;
};

const renderDrivers = () => {
  driverTableBody.innerHTML = "";
  drivers.forEach((driver) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${driver.driverID}</td>
      <td>${driver.name}</td>
      <td>${driver.licenseNumber}</td>
      <td>${driver.phone}</td>
      <td>${driver.email}</td>
      <td>${driver.status}</td>
      <td>
        <button class="btn btn-sm btn-warning edit-btn" data-id="${driver._id}">Edit</button>
        <button class="btn btn-sm btn-danger delete-btn" data-id="${driver._id}">Delete</button>
      </td>
    `;

    row.querySelector(".edit-btn")?.addEventListener("click", () => handleEdit(driver._id));
    row.querySelector(".delete-btn")?.addEventListener("click", () => handleDelete(driver._id));

    driverTableBody.appendChild(row);
  });
};

const fetchDrivers = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}`);
    if (!response.ok) throw new Error("Failed to fetch drivers");

    drivers = await response.json();
    renderDrivers();
  } catch (error) {
    console.error("Error fetching drivers:", error);
  }
};

const addDriver = async (driver: Driver) => {
  try {
    const response = await fetch(`${API_BASE_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(driver),
    });
    if (!response.ok) throw new Error("Failed to add driver");

    const newDriver = await response.json();
    drivers.push(newDriver);
    renderDrivers();
  } catch (error) {
    console.error("Error adding driver:", error);
  }
};

const updateDriver = async (driver: Driver) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${driver._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(driver),
    });
    if (!response.ok) throw new Error("Failed to update driver");

    const updatedDriver = await response.json();
    drivers = drivers.map((d) => (d.driverID === updatedDriver.driverID ? updatedDriver : d));
    renderDrivers();
  } catch (error) {
    console.error("Error updating driver:", error);
  }
};

const deleteDriver = async (id: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete driver");

    drivers = drivers.filter((d) => d.driverID !== id);
    renderDrivers();
  } catch (error) {
    console.error("Error deleting driver:", error);
  }
};

// Event Handlers
const handleAddDriver = () => {
  driverFormTitle.textContent = "Add Driver";
  toggleFormVisibility(true);
};

const handleEdit = (id: string) => {
  const driver = drivers.find((d) => d._id === id);
  if (!driver) return;

  driverFormTitle.textContent = "Edit Driver";
  populateForm(driver);
  isEditing = true;
  currentDriverID = id;
  toggleFormVisibility(true);
};

const handleDelete = async (id: string) => {
  if (confirm("Are you sure you want to delete this driver?")) {
    await deleteDriver(id);
  }
};

const handleFormSubmit = async (event: Event) => {
  event.preventDefault();

  const driver: Driver = {
    driverID: (driverForm.elements.namedItem("driverID") as HTMLInputElement).value.trim(),
    name: (driverForm.elements.namedItem("driverName") as HTMLInputElement).value.trim(),
    licenseNumber: (driverForm.elements.namedItem("licenseNumber") as HTMLInputElement).value.trim(),
    phone: (driverForm.elements.namedItem("driverPhone") as HTMLInputElement).value.trim(),
    email: (driverForm.elements.namedItem("driverEmail") as HTMLInputElement).value.trim(),
    status: (driverForm.elements.namedItem("driverStatus") as HTMLSelectElement).value as "Active" | "Inactive",
  };

  if (isEditing && currentDriverID) {
    await updateDriver(driver);
  } else {
    await addDriver(driver);
  }

  toggleFormVisibility(false);
};

const handleCancelForm = () => {
  toggleFormVisibility(false);
};

addDriverBtn.addEventListener("click", handleAddDriver);
cancelFormBtnn.addEventListener("click", handleCancelForm);
driverForm.addEventListener("submit", handleFormSubmit);

fetchDrivers();
