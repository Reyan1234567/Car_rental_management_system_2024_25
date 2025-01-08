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
  employeeForm.style.display = 'none';
  overlay.style.display = 'none';
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

  // Check if it's an edit or add operation
  if (employeeID && isEdit) {
    editEmployeeInTable(employeeID, employeeName, employeeRole, employeePhone, employeeEmail, employeeStatus);
  } else {
    // Create a new employee row in the table
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

  // Reset and hide the form
  resetForm();
});

// Flag to check if we are editing
let isEdit = false;
let currentEditRow: HTMLTableRowElement | null = null;

// Edit Employee functionality
function editEmployee(event: MouseEvent) {
  const row = (event.target as HTMLElement).closest('tr') as HTMLTableRowElement;
  const cells = row?.getElementsByTagName('td');

  if (cells) {
    const employeeID = cells[0].innerText;
    const employeeName = cells[1].innerText;
    const employeeRole = cells[2].innerText;
    const employeePhone = cells[3].innerText;
    const employeeEmail = cells[4].innerText;
    const employeeStatus = cells[5].innerText;

    // Fill the form with the current employee data
    (document.getElementById('employeeID') as HTMLInputElement).value = employeeID;
    (document.getElementById('employeeName') as HTMLInputElement).value = employeeName;
    (document.getElementById('employeeRole') as HTMLInputElement).value = employeeRole;
    (document.getElementById('employeePhone') as HTMLInputElement).value = employeePhone;
    (document.getElementById('employeeEmail') as HTMLInputElement).value = employeeEmail;
    (document.getElementById('employeeStatus') as HTMLSelectElement).value = employeeStatus;

    // Change form title to 'Edit Employee'
    const formTitle = document.getElementById('formTitle') as HTMLHeadingElement;
    formTitle.textContent = 'Edit Employee';

    // Show the form and overlay
    employeeForm.style.display = 'block';
    overlay.style.display = 'block';

    // Set flag to indicate edit mode
    isEdit = true;
    currentEditRow = row;
  }
}

// Edit the employee row in the table after submitting the form
function editEmployeeInTable(employeeID: string, employeeName: string, employeeRole: string, employeePhone: string, employeeEmail: string, employeeStatus: string) {
  if (currentEditRow) {
    const cells = currentEditRow.getElementsByTagName('td');
    cells[0].innerText = employeeID;
    cells[1].innerText = employeeName;
    cells[2].innerText = employeeRole;
    cells[3].innerText = employeePhone;
    cells[4].innerText = employeeEmail;
    cells[5].innerText = employeeStatus;

    // Reset edit flag and current row
    resetForm();
  }
}

// Delete Employee functionality
function deleteEmployee(event: MouseEvent) {
  const row = (event.target as HTMLElement).closest('tr') as HTMLTableRowElement;
  if (row) {
    row.remove();
  }
}

// Reset form and hide it after submission or cancel
function resetForm() {
  employeeForm.style.display = 'none';
  overlay.style.display = 'none';
  isEdit = false;
  currentEditRow = null;
  const employeeFormElement = document.getElementById('employeeForm') as HTMLFormElement;
  employeeFormElement?.reset();
}
