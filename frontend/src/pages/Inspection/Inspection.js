// Inspection Management Script
var addInspectionBtn = document.getElementById('addInspectionBtn');
var inspectionForm = document.getElementById('InspectionForm');
var inspectionTableBody = document.getElementById('inspectionTableBody');
var overlay = document.createElement('div');
overlay.id = 'overlay';
document.body.appendChild(overlay);
// Show form for adding inspection
addInspectionBtn.addEventListener('click', function () {
    var formTitle = document.getElementById('formTitle');
    formTitle.textContent = 'Add Inspection';
    document.getElementById('inspectionForm').reset();
    inspectionForm.style.display = 'block';
    overlay.style.display = 'block';
});
// Cancel form
document.getElementById('cancelForm').addEventListener('click', resetForm);
// Submit form
var inspectionFormElement = document.getElementById('inspectionForm');
inspectionFormElement.addEventListener('submit', function (e) {
    e.preventDefault();
    var inspectionID = document.getElementById('inspectionID').value;
    var vehicleID = document.getElementById('vehicleID').value;
    var inspectionDate = document.getElementById('inspectionDate').value;
    var inspectorName = document.getElementById('inspectorName').value;
    var inspectionStatus = document.getElementById('inspectionStatus').value;
    var inspectionPrice = document.getElementById('inspectionPrice').value;
    var inspectionComments = document.getElementById('inspectionComments').value;
    addInspectionToTable(inspectionID, vehicleID, inspectionDate, inspectorName, inspectionStatus, inspectionPrice, inspectionComments);
    resetForm();
});
// Add inspection row
function addInspectionToTable(id, vehicleID, date, name, status, price, comments) {
    var newRow = document.createElement('tr');
    newRow.dataset.inspectionId = id;
    newRow.innerHTML = "\n    <td>".concat(id, "</td>\n    <td>").concat(vehicleID, "</td>\n    <td>").concat(date, "</td>\n    <td>").concat(name, "</td>\n    <td>").concat(status, "</td>\n    <td>").concat(price, "</td>\n    <td>").concat(comments, "</td>\n    <td>\n      <button class=\"btn btn-warning btn-sm\">Edit</button>\n      <button class=\"btn btn-danger btn-sm\">Delete</button>\n    </td>");
    inspectionTableBody.appendChild(newRow);
}
// Reset form
function resetForm() {
    inspectionForm.style.display = 'none';
    overlay.style.display = 'none';
    inspectionFormElement.reset();
}
