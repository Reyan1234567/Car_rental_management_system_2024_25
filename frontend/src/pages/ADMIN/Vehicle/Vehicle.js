// Vehicle Management Script
var addVehicleBtn = document.getElementById('addVehicleBtn');
var vehicleForm = document.getElementById('VehicleForm');
var vehicleTableBody = document.getElementById('vehicleTableBody');
var overlay = document.createElement('div');
overlay.id = 'overlay';
document.body.appendChild(overlay);
// Show form for adding a vehicle
addVehicleBtn.addEventListener('click', function () {
    var formTitle = document.getElementById('formTitle');
    formTitle.textContent = 'Add Vehicle';
    document.getElementById('vehicleForm').reset();
    vehicleForm.style.display = 'flex';
    overlay.style.display = 'block';
});
// Cancel form
document.getElementById('cancelForm').addEventListener('click', resetForm);
// Submit form
var vehicleFormElement = document.getElementById('vehicleForm');
vehicleFormElement.addEventListener('submit', function (e) {
    e.preventDefault();
    var vehicleID = document.getElementById('vehicleID').value;
    var licensePlate = document.getElementById('licensePlate').value;
    var make = document.getElementById('make').value;
    var year = document.getElementById('year').value;
    var mileage = document.getElementById('mileage').value;
    var isOccupied = document.getElementById('isOccupied').value;
    var rentalPrice = document.getElementById('rentalPrice').value;
    var startDate = document.getElementById('startDate').value;
    var endDate = document.getElementById('endDate').value;
    addVehicleToTable(vehicleID, licensePlate, make, year, mileage, isOccupied, rentalPrice, startDate, endDate);
    resetForm();
});
// Add vehicle row
function addVehicleToTable(id, licensePlate, make, year, mileage, isOccupied, rentalPrice, startDate, endDate) {
    var newRow = document.createElement('tr');
    newRow.dataset.vehicleId = id;
    newRow.innerHTML = "\n    <td>".concat(id, "</td>\n    <td>").concat(licensePlate, "</td>\n    <td>").concat(make, "</td>\n    <td>").concat(year, "</td>\n    <td>").concat(mileage, "</td>\n    <td>").concat(isOccupied === 'true' ? 'Yes' : 'No', "</td>\n    <td>").concat(rentalPrice, "</td>\n    <td>").concat(startDate, "</td>\n    <td>").concat(endDate, "</td>\n    <td>\n      <button class=\"btn btn-warning btn-sm\">Edit</button>\n      <button class=\"btn btn-danger btn-sm\">Delete</button>\n    </td>");
    vehicleTableBody.appendChild(newRow);
}
// Reset form
function resetForm() {
    vehicleForm.style.display = 'none';
    overlay.style.display = 'none';
    vehicleFormElement.reset();
}
