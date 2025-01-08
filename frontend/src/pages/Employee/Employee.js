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
    employeeForm.style.display = 'none';
    overlay.style.display = 'none';
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
    // Check if it's an edit or add operation
    if (employeeID && isEdit) {
        editEmployeeInTable(employeeID, employeeName, employeeRole, employeePhone, employeeEmail, employeeStatus);
    }
    else {
        // Create a new employee row in the table
        var newRow = document.createElement('tr');
        newRow.dataset.employeeId = employeeID;
        newRow.innerHTML = "\n      <td>".concat(employeeID, "</td>\n      <td>").concat(employeeName, "</td>\n      <td>").concat(employeeRole, "</td>\n      <td>").concat(employeePhone, "</td>\n      <td>").concat(employeeEmail, "</td>\n      <td>").concat(employeeStatus, "</td>\n      <td>\n        <button class=\"btn btn-warning btn-sm\" onclick=\"editEmployee(event)\">Edit</button>\n        <button class=\"btn btn-danger btn-sm\" onclick=\"deleteEmployee(event)\">Delete</button>\n      </td>\n    ");
        employeeTableBody.appendChild(newRow);
    }
    // Reset and hide the form
    resetForm();
});
// Flag to check if we are editing
var isEdit = false;
var currentEditRow = null;
// Edit Employee functionality
function editEmployee(event) {
    var row = event.target.closest('tr');
    var cells = row === null || row === void 0 ? void 0 : row.getElementsByTagName('td');
    if (cells) {
        var employeeID = cells[0].innerText;
        var employeeName = cells[1].innerText;
        var employeeRole = cells[2].innerText;
        var employeePhone = cells[3].innerText;
        var employeeEmail = cells[4].innerText;
        var employeeStatus = cells[5].innerText;
        // Fill the form with the current employee data
        document.getElementById('employeeID').value = employeeID;
        document.getElementById('employeeName').value = employeeName;
        document.getElementById('employeeRole').value = employeeRole;
        document.getElementById('employeePhone').value = employeePhone;
        document.getElementById('employeeEmail').value = employeeEmail;
        document.getElementById('employeeStatus').value = employeeStatus;
        // Change form title to 'Edit Employee'
        var formTitle = document.getElementById('formTitle');
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
function editEmployeeInTable(employeeID, employeeName, employeeRole, employeePhone, employeeEmail, employeeStatus) {
    if (currentEditRow) {
        var cells = currentEditRow.getElementsByTagName('td');
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
function deleteEmployee(event) {
    var row = event.target.closest('tr');
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
    var employeeFormElement = document.getElementById('employeeForm');
    employeeFormElement === null || employeeFormElement === void 0 ? void 0 : employeeFormElement.reset();
}
