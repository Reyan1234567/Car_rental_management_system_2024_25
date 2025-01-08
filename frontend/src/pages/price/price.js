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
    priceForm.style.display = 'block';
    overlay.style.display = 'block';
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
    addPriceToTable(priceID, vehicleID, rentalPrice);
    resetForm();
});
// Add price row
function addPriceToTable(id, vehicleID, rentalPrice) {
    var newRow = document.createElement('tr');
    newRow.dataset.priceId = id;
    newRow.innerHTML = "\n    <td>".concat(id, "</td>\n    <td>").concat(vehicleID, "</td>\n    <td>").concat(rentalPrice, "</td>\n    <td>\n      <button class=\"btn btn-warning btn-sm\">Edit</button>\n      <button class=\"btn btn-danger btn-sm\">Delete</button>\n    </td>");
    priceTableBody.appendChild(newRow);
}
// Reset form
function resetForm() {
    priceForm.style.display = 'none';
    overlay.style.display = 'none';
    priceFormElement.reset();
}
