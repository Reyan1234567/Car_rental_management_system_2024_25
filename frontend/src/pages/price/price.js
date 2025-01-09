// Price Management Script
var addPriceBtn = document.getElementById('addPriceBtn');
var priceForm = document.getElementById('PriceForm');
var priceTableBody = document.getElementById('priceTableBody');
var overlay = document.createElement('div');
overlay.id = 'overlay';
document.body.appendChild(overlay);
// Show form for adding price
addPriceBtn.addEventListener('click', function () {
    var formTitle = document.getElementById('formTitle');
    formTitle.textContent = 'Add Price';
    document.getElementById('priceForm').reset();
    priceForm.style.display = 'block';// Display the form
    overlay.style.display = 'block';// Display the overlay
});
// Cancel form
document.getElementById('cancelForm').addEventListener('click', resetForm);
// Submit form
var priceFormElement = document.getElementById('priceForm');
priceFormElement.addEventListener('submit', function (e) {
    e.preventDefault();
    var priceID = document.getElementById('priceID').value;
    var vehicleID = document.getElementById('vehicleID').value;
    var rentalPrice = document.getElementById('rentalPrice').value;
    
     // Validate inputs
    if (!priceID || !vehicleID || !rentalPrice) {
        alert('All fields are required!');
        return;
    }

    addPriceToTable(priceID, vehicleID, rentalPrice);
    resetForm();
});
// Add price row
function addPriceToTable(id, vehicleID, rentalPrice) {
    var newRow = document.createElement('tr');
    newRow.dataset.priceId = id;
    newRow.innerHTML = "\n    <td>".concat(id, "</td>\n    <td>").concat(vehicleID, "</td>\n    <td>").concat(rentalPrice, "</td>\n    <td>\n      <button class=\"btn btn-warning btn-sm\">Edit</button>\n      <button class=\"btn btn-danger btn-sm\">Delete</button>\n    </td>");
    // Add functionality to edit and delete buttons
    var editButton = newRow.querySelector('.edit-btn');
    var deleteButton = newRow.querySelector('.delete-btn');

    editButton.addEventListener('click', function () {
        populateFormForEdit(id, vehicleID, rentalPrice);
    });

    deleteButton.addEventListener('click', function () {
        if (confirm('Are you sure you want to delete this entry?')) {
            newRow.remove(); // Remove the row
        }
    });
    priceTableBody.appendChild(newRow);
}
// Populate form for editing
function populateFormForEdit(id, vehicleID, rentalPrice) {
    var formTitle = document.getElementById('formTitle');
    formTitle.textContent = 'Edit Price';

    document.getElementById('priceID').value = id;
    document.getElementById('vehicleID').value = vehicleID;
    document.getElementById('rentalPrice').value = rentalPrice;

    priceForm.style.display = 'block';
    overlay.style.display = 'block';
}
// Reset form
function resetForm() {
    priceForm.style.display = 'none';
    overlay.style.display = 'none';
    priceFormElement.reset();
}
