const addEmployeeBtn = document.getElementById('addEmployeeBtn') as HTMLButtonElement;
const employeeForm = document.getElementById('EmployeeForm') as HTMLDivElement;
const employeeTableBody = document.getElementById('employeeTableBody') as HTMLTableSectionElement;
const overlay = document.createElement('div');
overlay.id = 'overlay';
document.body.appendChild(overlay);


addEmployeeBtn.addEventListener('click', () => {

  const formTitle = document.getElementById('formTitle') as HTMLHeadingElement;
  formTitle.textContent = 'Add Employee';
  (document.getElementById('employeeForm') as HTMLFormElement).reset();
  employeeForm.style.display = 'block';
  overlay.style.display = 'block';
});


const cancelFormBtn = document.getElementById('cancelForm') as HTMLButtonElement;
cancelFormBtn.addEventListener('click', () => {
  employeeForm.style.display = 'none';
  overlay.style.display = 'none';
});


const employeeFormElement = document.getElementById('employeeForm') as HTMLFormElement;
employeeFormElement.addEventListener('submit', (e) => {
  e.preventDefault();


  const employeeID = (document.getElementById('employeeID') as HTMLInputElement).value;
  const employeeName = (document.getElementById('employeeName') as HTMLInputElement).value;
  const employeeRole = (document.getElementById('employeeRole') as HTMLInputElement).value;
  const employeePhone = (document.getElementById('employeePhone') as HTMLInputElement).value;
  const employeeEmail = (document.getElementById('employeeEmail') as HTMLInputElement).value;
  const employeeStatus = (document.getElementById('employeeStatus') as HTMLSelectElement).value;


  if (employeeID && isEdit) {
    editEmployeeInTable(employeeID, employeeName, employeeRole, employeePhone, employeeEmail, employeeStatus);
  } else {
  
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

 
  resetForm();
});

let isEdit = false;
let currentEditRow: HTMLTableRowElement | null = null;


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
}


function editEmployeeInTable(employeeID: string, employeeName: string, employeeRole: string, employeePhone: string, employeeEmail: string, employeeStatus: string) {
  if (currentEditRow) {
    const cells = currentEditRow.getElementsByTagName('td');
    cells[0].innerText = employeeID;
    cells[1].innerText = employeeName;
    cells[2].innerText = employeeRole;
    cells[3].innerText = employeePhone;
    cells[4].innerText = employeeEmail;
    cells[5].innerText = employeeStatus;

  
    resetForm();
  }
}


function deleteEmployee(event: MouseEvent) {
  const row = (event.target as HTMLElement).closest('tr') as HTMLTableRowElement;
  if (row) {
    row.remove();
  }
}


function resetForm() {
  employeeForm.style.display = 'none';
  overlay.style.display = 'none';
  isEdit = false;
  currentEditRow = null;
  const employeeFormElement = document.getElementById('employeeForm') as HTMLFormElement;
  employeeFormElement?.reset();
}
