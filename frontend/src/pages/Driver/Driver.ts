// Employee Management Script

// Get elements
const addEmployeeBtn = document.getElementById('addEmployeeBtn') as HTMLButtonElement;
const employeeForm = document.getElementById('EmployeeForm') as HTMLDivElement;
const employeeTableBody = document.getElementById('employeeTableBody') as HTMLTableSectionElement;
const overlay = document.createElement('div');
overlay.id = 'overlay';
document.body.appendChild(overlay);

// Add Employee Button functionality
addEmployeeBtn.addEventListener('click', () => {
  // Clear the form fields for new entry
  const formTitle = document.getElementById('formTitle') as HTMLHeadingElement;
  formTitle.textContent = 'Add Employee';
  (document.getElementById('employeeForm') as HTMLFormElement).reset();
  employeeForm.style.display = 'block';
  overlay.style.display = 'block';
});

// Cancel Button functionality
const cancelFormBtn = document.getElementById('cancelForm') as HTMLButtonElement;
cancelFormBtn.addEventListener('click', () => {
  resetForm();
});

// Form Submit functionality
const employeeFormElement = document.getElementById('employeeForm') as HTMLFormElement;
employeeFormElement.addEventListener('submit', (e) => {
  e.preventDefault();

  // Gather data from the form fields
  const employeeID = (document.getElementById('employeeID') as HTMLInputElement).value;
  const employeeName = (document.getElementById('employeeName') as HTMLInputElement).value;
  const employeeRole = (document.getElementById('employeeRole') as HTMLInputElement).value;
  const employeePhone = (document.getElementById('employeePhone') as HTMLInputElement).value;
  const employeeEmail = (document.getElementById('employeeEmail') as HTMLInputElement).value;
  const employeeStatus = (document.getElementById('employeeStatus') as HTMLSelectElement).value;

  if (isEdit && currentEditRow) {
    editEmployeeInTable(employeeID, employeeName, employeeRole, employeePhone, employeeEmail, employeeStatus);
  } else {
    addEmployeeToTable(employeeID, employeeName, employeeRole, employeePhone, employeeEmail, employeeStatus);
  }

  resetForm();
});

// Flag to check if we are editing
let isEdit = false;
let currentEditRow: HTMLTableRowElement | null = null;

// Add Employee to Table
function addEmployeeToTable(employeeID: string, employeeName: string, employeeRole: string, employeePhone: string, employeeEmail: string, employeeStatus: string): void {
  const newRow = document.createElement('tr');
  newRow.dataset.employeeId = employeeID;

  newRow.innerHTML = `
    <td>${employeeID}</td>
    <td>${employeeName}</td>
    <td>${employeeRole}</td>
    <td>${employeePhone}</td>
    <td>${employeeEmail}</td>
    <td>${employeeStatus}</td>
    <td>
      <button class="btn btn-warning btn-sm" onclick="editEmployee(event)">Edit</button>
      <button class="btn btn-danger btn-sm" onclick="deleteEmployee(event)">Delete</button>
    </td>
  `;

  employeeTableBody.appendChild(newRow);
}

// Edit Employee functionality
function editEmployee(event: MouseEvent): void {
  const row = (event.target as HTMLElement).closest('tr') as HTMLTableRowElement;
  if (!row) return;

  const cells = row.getElementsByTagName('td');
  const [employeeID, employeeName, employeeRole, employeePhone, employeeEmail, employeeStatus] = [
    cells[0].innerText,
    cells[1].innerText,
    cells[2].innerText,
    cells[3].innerText,
    cells[4].innerText,
    cells[5].innerText,
  ];

  (document.getElementById('employeeID') as HTMLInputElement).value = employeeID;
  (document.getElementById('employeeName') as HTMLInputElement).value = employeeName;
  (document.getElementById('employeeRole') as HTMLInputElement).value = employeeRole;
  (document.getElementById('employeePhone') as HTMLInputElement).value = employeePhone;
  (document.getElementById('employeeEmail') as HTMLInputElement).value = employeeEmail;
  (document.getElementById('employeeStatus') as HTMLSelectElement).value = employeeStatus;

  const formTitle = document.getElementById('formTitle') as HTMLHeadingElement;
  formTitle.textContent = 'Edit Employee';

  employeeForm.style.display = 'block';
  overlay.style.display = 'block';

  isEdit = true;
  currentEditRow = row;
}

// Edit the employee row in the table
function editEmployeeInTable(employeeID: string, employeeName: string, employeeRole: string, employeePhone: string, employeeEmail: string, employeeStatus: string): void {
  if (!currentEditRow) return;

  const cells = currentEditRow.getElementsByTagName('td');
  cells[0].innerText = employeeID;
  cells[1].innerText = employeeName;
  cells[2].innerText = employeeRole;
  cells[3].innerText = employeePhone;
  cells[4].innerText = employeeEmail;
  cells[5].innerText = employeeStatus;
}

// Delete Employee functionality
function deleteEmployee(event: MouseEvent): void {
  const row = (event.target as HTMLElement).closest('tr') as HTMLTableRowElement;
  row?.remove();
}

// Reset form and hide it after submission or cancel
function resetForm(): void {
  employeeForm.style.display = 'none';
  overlay.style.display = 'none';
  isEdit = false;
  currentEditRow = null;
  employeeFormElement.reset();
}
