
document.addEventListener("DOMContentLoaded", () => {
  const addDriverBtn = document.getElementById("addDriverBtn") as HTMLButtonElement;
  const driverForm = document.getElementById("driverForm") as HTMLFormElement;
  const driverTableBody = document.getElementById("driverTableBody") as HTMLTableSectionElement;
  const driverFormContainer = document.getElementById("DriverForm") as HTMLDivElement;
  const cancelFormBtn = document.getElementById("cancelForm") as HTMLButtonElement;

  let isEditing = false;
  let editingRow: HTMLTableRowElement | null = null;

  interface Driver {
    id: string;
    name: string;
    licenseNumber: string;
    phone: string;
    email: string;
    status: string;
  }

  const drivers: Driver[] = [];

  const showDriverForm = () => {
    driverFormContainer.style.display = "block";
  };

  const hideDriverForm = () => {
    driverFormContainer.style.display = "none";
    driverForm.reset();
    isEditing = false;
    editingRow = null;
  };

  const populateTable = () => {
    driverTableBody.innerHTML = "";
    drivers.forEach((driver) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${driver.id}</td>
        <td>${driver.name}</td>
        <td>${driver.licenseNumber}</td>
        <td>${driver.phone}</td>
        <td>${driver.email}</td>
        <td>${driver.status}</td>
        <td>
          <button class="btn btn-warning btn-sm edit-btn">Edit</button>
          <button class="btn btn-danger btn-sm delete-btn">Delete</button>
        </td>
      `;

      const editBtn = row.querySelector(".edit-btn") as HTMLButtonElement;
      const deleteBtn = row.querySelector(".delete-btn") as HTMLButtonElement;

      editBtn.addEventListener("click", () => editDriver(row, driver));
      deleteBtn.addEventListener("click", () => deleteDriver(row, driver.id));

      driverTableBody.appendChild(row);
    });
  };

  driverForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(driverForm);
    const driver: Driver = {
      id: formData.get("driverID") as string,
      name: formData.get("driverName") as string,
      licenseNumber: formData.get("licenseNumber") as string,
      phone: formData.get("driverPhone") as string,
      email: formData.get("driverEmail") as string,
      status: formData.get("driverStatus") as string,
    };

    if (isEditing && editingRow) {
      // Update existing driver
      const index = drivers.findIndex((d) => d.id === driver.id);
      drivers[index] = driver;
    } else {
      // Add new driver
      drivers.push(driver);
    }

    populateTable();
    hideDriverForm();
  });

  const editDriver = (row: HTMLTableRowElement, driver: Driver) => {
    isEditing = true;
    editingRow = row;

    (driverForm["driverID"] as HTMLInputElement).value = driver.id;
    (driverForm["driverName"] as HTMLInputElement).value = driver.name;
    (driverForm["licenseNumber"] as HTMLInputElement).value = driver.licenseNumber;
    (driverForm["driverPhone"] as HTMLInputElement).value = driver.phone;
    (driverForm["driverEmail"] as HTMLInputElement).value = driver.email;
    (driverForm["driverStatus"] as HTMLSelectElement).value = driver.status;

    showDriverForm();
  };

  const deleteDriver = (row: HTMLTableRowElement, driverId: string) => {
    const index = drivers.findIndex((driver) => driver.id === driverId);
    if (index !== -1) {
      drivers.splice(index, 1);
      row.remove();
    }
  };

  // Event listeners
  addDriverBtn.addEventListener("click", showDriverForm);
  cancelFormBtn.addEventListener("click", hideDriverForm);
});
