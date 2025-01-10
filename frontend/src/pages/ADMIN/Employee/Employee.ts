const employeeModal = document.getElementById("employee-modal") as HTMLElement;
const closeEmployeeModalBtn = document.getElementById("close-employee-modal") as HTMLElement;
const createEmployeeBtn = document.getElementById("create-employee-btn") as HTMLElement;
const employeeForm = document.getElementById("employee-form") as HTMLFormElement;
const employeeList = document.getElementById("employee-list") as HTMLElement;

let editingEmployeeId: string | null = null;

// Show modal for creating a new employee
createEmployeeBtn.addEventListener("click", () => {
  employeeModal.classList.remove("hidden");
  employeeForm.reset();
  editingEmployeeId = null;
  document.getElementById("employee-modal-title")!.innerText = "Create Employee";
});

// Close the modal
closeEmployeeModalBtn.addEventListener("click", () => {
  employeeModal.classList.add("hidden");
});

// Handle form submission
employeeForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(employeeForm);
  const data = Object.fromEntries(formData) as any;

  try {
    if (editingEmployeeId) {
      // Update existing employee
      await fetch(`http://localhost:3333/employees/${editingEmployeeId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } else {
      // Create new employee
      await fetch("http://localhost:3333/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    }
    loadEmployees();
    employeeModal.classList.add("hidden");
  } catch (error) {
    console.error("Error saving employee:", error);
  }
});

// Load all employees
async function loadEmployees() {
  try {
    const response = await fetch("http://localhost:3333/employees");
    const employees = await response.json();
    employeeList.innerHTML = "";

    employees.forEach((employee: any) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${employee.employeeID}</td>
        <td>${employee.name}</td>
        <td>${employee.role}</td>
        <td>${employee.phoneNumber}</td>
        <td>${employee.email}</td>
        <td>${employee.status}</td>
        <td>
          <button class="btn btn-warning btn-sm" onclick="editEmployee('${employee._id}')">Edit</button>
          <button class="btn btn-danger btn-sm" onclick="deleteEmployee('${employee._id}')">Delete</button>
        </td>
      `;
      employeeList.appendChild(row);
    });
  } catch (error) {
    console.error("Error loading employees:", error);
  }
}

// Edit an employee
(window as any).editEmployee = async function (id: string) {
  try {
    const response = await fetch(`http://localhost:3333/employees/${id}`);
    const employee = await response.json();

    (document.getElementById("employeeID") as HTMLInputElement).value = employee.employeeID;
    (document.getElementById("name") as HTMLInputElement).value = employee.name;
    (document.getElementById("role") as HTMLInputElement).value = employee.role;
    (document.getElementById("phoneNumber") as HTMLInputElement).value = employee.phoneNumber;
    (document.getElementById("email") as HTMLInputElement).value = employee.email;
    (document.getElementById("status") as HTMLSelectElement).value = employee.status;

    editingEmployeeId = id;
    employeeModal.classList.remove("hidden");
    document.getElementById("employee-modal-title")!.innerText = "Update Employee";
  } catch (error) {
    console.error("Error editing employee:", error);
  }
};

// Delete an employee
(window as any).deleteEmployee = async function (id: string) {
  try {
    await fetch(`http://localhost:3333/employees/${id}`, { method: "DELETE" });
    loadEmployees();
  } catch (error) {
    console.error("Error deleting employee:", error);
  }
};

// Initial load of employees
loadEmployees();
