// Employee Management Script
// Get elements
var addEmployeeBtn = document.getElementById('addEmployeeBtn');
var employeeForm = document.getElementById('EmployeeForm');
var employeeTableBody = document.getElementById('employeeTableBody');
var overlay = document.createElement('div');
overlay.id = 'overlay';
document.body.appendChild(overlay);
// Add Employee Button functionality
addEmployeeBtn.addEventListener('click', function () {
    // Clear the form fields for new entry
    var formTitle = document.getElementById('formTitle');
    formTitle.textContent = 'Add Employee';
    document.getElementById('employeeForm').reset();
    employeeForm.style.display = 'block';
    overlay.style.display = 'block';
});
// Cancel Button functionality
var cancelFormBtn = document.getElementById('cancelForm');
cancelFormBtn.addEventListener('click', function () {
    resetForm();
});
// Form Submit functionality
var employeeFormElement = document.getElementById('employeeForm');
employeeFormElement.addEventListener('submit', function (e) {
    e.preventDefault();
    // Gather data from the form fields
    var employeeID = document.getElementById('employeeID').value;
    var employeeName = document.getElementById('employeeName').value;
    var employeeRole = document.getElementById('employeeRole').value;
    var employeePhone = document.getElementById('employeePhone').value;
    var employeeEmail = document.getElementById('employeeEmail').value;
    var employeeStatus = document.getElementById('employeeStatus').value;
    if (isEdit && currentEditRow) {
        editEmployeeInTable(employeeID, employeeName, employeeRole, employeePhone, employeeEmail, employeeStatus);
    }
    else {
        addEmployeeToTable(employeeID, employeeName, employeeRole, employeePhone, employeeEmail, employeeStatus);
    }
    resetForm();
});
// Flag to check if we are editing
var isEdit = false;
var currentEditRow = null;
// Add Employee to Table
function addEmployeeToTable(employeeID, employeeName, employeeRole, employeePhone, employeeEmail, employeeStatus) {
    var newRow = document.createElement('tr');
    newRow.dataset.employeeId = employeeID;
    newRow.innerHTML = "\n    <td>".concat(employeeID, "</td>\n    <td>").concat(employeeName, "</td>\n    <td>").concat(employeeRole, "</td>\n    <td>").concat(employeePhone, "</td>\n    <td>").concat(employeeEmail, "</td>\n    <td>").concat(employeeStatus, "</td>\n    <td>\n      <button class=\"btn btn-warning btn-sm\" onclick=\"editEmployee(event)\">Edit</button>\n      <button class=\"btn btn-danger btn-sm\" onclick=\"deleteEmployee(event)\">Delete</button>\n    </td>\n  ");
    employeeTableBody.appendChild(newRow);
}
// Edit Employee functionality
function editEmployee(event) {
    var row = event.target.closest('tr');
    if (!row)
        return;
    var cells = row.getElementsByTagName('td');
    var _a = [
        cells[0].innerText,
        cells[1].innerText,
        cells[2].innerText,
        cells[3].innerText,
        cells[4].innerText,
        cells[5].innerText,
    ], employeeID = _a[0], employeeName = _a[1], employeeRole = _a[2], employeePhone = _a[3], employeeEmail = _a[4], employeeStatus = _a[5];
    document.getElementById('employeeID').value = employeeID;
    document.getElementById('employeeName').value = employeeName;
    document.getElementById('employeeRole').value = employeeRole;
    document.getElementById('employeePhone').value = employeePhone;
    document.getElementById('employeeEmail').value = employeeEmail;
    document.getElementById('employeeStatus').value = employeeStatus;
    var formTitle = document.getElementById('formTitle');
    formTitle.textContent = 'Edit Employee';
    employeeForm.style.display = 'block';
    overlay.style.display = 'block';
    isEdit = true;
    currentEditRow = row;
}
// Edit the employee row in the table
function editEmployeeInTable(employeeID, employeeName, employeeRole, employeePhone, employeeEmail, employeeStatus) {
    if (!currentEditRow)
        return;
    var cells = currentEditRow.getElementsByTagName('td');
    cells[0].innerText = employeeID;
    cells[1].innerText = employeeName;
    cells[2].innerText = employeeRole;
    cells[3].innerText = employeePhone;
    cells[4].innerText = employeeEmail;
    cells[5].innerText = employeeStatus;
}
// Delete Employee functionality
function deleteEmployee(event) {
    var row = event.target.closest('tr');
    row === null || row === void 0 ? void 0 : row.remove();
}
// Reset form and hide it after submission or cancel
function resetForm() {
    employeeForm.style.display = 'none';
    overlay.style.display = 'none';
    isEdit = false;
    currentEditRow = null;
    employeeFormElement.reset();
}
