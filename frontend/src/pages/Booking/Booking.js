// Get elements
var addBookingBtn = document.getElementById('addBookingBtn');
var bookingForm = document.getElementById('BookingForm');
var bookingTableBody = document.getElementById('bookingTableBody');
var overlay = document.createElement('div');
overlay.id = 'overlay';
document.body.appendChild(overlay);
// Add Booking Button functionality
addBookingBtn.addEventListener('click', function () {
    // Clear the form fields for new entry
    var formTitle = document.getElementById('formTitle');
    formTitle.textContent = 'Add Booking';
    document.getElementById('bookingForm').reset();
    bookingForm.style.display = 'block';
    overlay.style.display = 'block';
});
// Cancel Button functionality
var cancelFormBtn = document.getElementById('cancelForm');
cancelFormBtn.addEventListener('click', function () {
    bookingForm.style.display = 'none';
    overlay.style.display = 'none';
});
// Form Submit functionality
var bookingFormElement = document.getElementById('bookingForm');
bookingFormElement.addEventListener('submit', function (e) {
    e.preventDefault();
    // Gather data from the form fields
    var bookingID = document.getElementById('bookingID').value;
    var vehicleID = document.getElementById('vehicleID').value;
    var driverID = document.getElementById('driverID').value;
    var startDate = document.getElementById('startDate').value;
    var endDate = document.getElementById('endDate').value;
    var totalPrice = document.getElementById('totalPrice').value;
    var status = document.getElementById('status').value;
    // Check if it's an edit or add operation
    if (bookingID && isEdit) {
        editBookingInTable(bookingID, vehicleID, driverID, startDate, endDate, totalPrice, status);
    }
    else {
        // Create a new booking row in the table
        var newRow = document.createElement('tr');
        newRow.dataset.bookingId = bookingID;
        newRow.innerHTML = "\n      <td>".concat(bookingID, "</td>\n      <td>").concat(vehicleID, "</td>\n      <td>").concat(driverID, "</td>\n      <td>").concat(startDate, "</td>\n      <td>").concat(endDate, "</td>\n      <td>").concat(totalPrice, "</td>\n      <td>").concat(status, "</td>\n      <td>\n        <button class=\"btn btn-warning btn-sm\" onclick=\"editBooking(event)\">Edit</button>\n        <button class=\"btn btn-danger btn-sm\" onclick=\"deleteBooking(event)\">Delete</button>\n      </td>\n    ");
        bookingTableBody.appendChild(newRow);
    }
    // Reset and hide the form
    resetForm();
});
// Flag to check if we are editing
var isEdit = false;
var currentEditRow = null;
// Edit Booking functionality
function editBooking(event) {
    var row = event.target.closest('tr');
    var cells = row === null || row === void 0 ? void 0 : row.getElementsByTagName('td');
    if (cells) {
        var bookingID = cells[0].innerText;
        var vehicleID = cells[1].innerText;
        var driverID = cells[2].innerText;
        var startDate = cells[3].innerText;
        var endDate = cells[4].innerText;
        var totalPrice = cells[5].innerText;
        var status_1 = cells[6].innerText;
        // Fill the form with the current booking data
        document.getElementById('bookingID').value = bookingID;
        document.getElementById('vehicleID').value = vehicleID;
        document.getElementById('driverID').value = driverID;
        document.getElementById('startDate').value = startDate;
        document.getElementById('endDate').value = endDate;
        document.getElementById('totalPrice').value = totalPrice;
        document.getElementById('status').value = status_1;
        isEdit = true;
        currentEditRow = row;
        bookingForm.style.display = 'block';
        overlay.style.display = 'block';
    }
}
// Delete Booking functionality
function deleteBooking(event) {
    var row = event.target.closest('tr');
    if (row) {
        row.remove();
    }
}
// Edit the booking in the table after form submission
function editBookingInTable(bookingID, vehicleID, driverID, startDate, endDate, totalPrice, status) {
    if (currentEditRow) {
        var cells = currentEditRow.getElementsByTagName('td');
        cells[0].innerText = bookingID;
        cells[1].innerText = vehicleID;
        cells[2].innerText = driverID;
        cells[3].innerText = startDate;
        cells[4].innerText = endDate;
        cells[5].innerText = totalPrice;
        cells[6].innerText = status;
    }
    resetForm();
}
// Reset the form and hide it
function resetForm() {
    bookingForm.style.display = 'none';
    overlay.style.display = 'none';
    isEdit = false;
    currentEditRow = null;
}
