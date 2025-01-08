// Get elements
const addBookingBtn = document.getElementById('addBookingBtn') as HTMLButtonElement;
const bookingForm = document.getElementById('BookingForm') as HTMLDivElement;
const bookingTableBody = document.getElementById('bookingTableBody') as HTMLTableSectionElement;
const overlay = document.createElement('div');
overlay.id = 'overlay';
document.body.appendChild(overlay);

// Add Booking Button functionality
addBookingBtn.addEventListener('click', () => {
  // Clear the form fields for new entry
  const formTitle = document.getElementById('formTitle') as HTMLHeadingElement;
  formTitle.textContent = 'Add Booking';
  (document.getElementById('bookingForm') as HTMLFormElement).reset();
  bookingForm.style.display = 'block';
  overlay.style.display = 'block';
});

// Cancel Button functionality
const cancelFormBtn = document.getElementById('cancelForm') as HTMLButtonElement;
cancelFormBtn.addEventListener('click', () => {
  bookingForm.style.display = 'none';
  overlay.style.display = 'none';
});

// Form Submit functionality
const bookingFormElement = document.getElementById('bookingForm') as HTMLFormElement;
bookingFormElement.addEventListener('submit', (e) => {
  e.preventDefault();

  // Gather data from the form fields
  const bookingID = (document.getElementById('bookingID') as HTMLInputElement).value;
  const vehicleID = (document.getElementById('vehicleID') as HTMLInputElement).value;
  const driverID = (document.getElementById('driverID') as HTMLInputElement).value;
  const startDate = (document.getElementById('startDate') as HTMLInputElement).value;
  const endDate = (document.getElementById('endDate') as HTMLInputElement).value;
  const totalPrice = (document.getElementById('totalPrice') as HTMLInputElement).value;
  const status = (document.getElementById('status') as HTMLSelectElement).value;

  // Check if it's an edit or add operation
  if (bookingID && isEdit) {
    editBookingInTable(bookingID, vehicleID, driverID, startDate, endDate, totalPrice, status);
  } else {
    // Create a new booking row in the table
    const newRow = document.createElement('tr');
    newRow.dataset.bookingId = bookingID;

    newRow.innerHTML = `
      <td>${bookingID}</td>
      <td>${vehicleID}</td>
      <td>${driverID}</td>
      <td>${startDate}</td>
      <td>${endDate}</td>
      <td>${totalPrice}</td>
      <td>${status}</td>
      <td>
        <button class="btn btn-warning btn-sm" onclick="editBooking(event)">Edit</button>
        <button class="btn btn-danger btn-sm" onclick="deleteBooking(event)">Delete</button>
      </td>
    `;

    bookingTableBody.appendChild(newRow);
  }

  // Reset and hide the form
  resetForm();
});

// Flag to check if we are editing
let isEdit = false;
let currentEditRow: HTMLTableRowElement | null = null;

// Edit Booking functionality
function editBooking(event: MouseEvent) {
  const row = (event.target as HTMLElement).closest('tr') as HTMLTableRowElement;
  const cells = row?.getElementsByTagName('td');

  if (cells) {
    const bookingID = cells[0].innerText;
    const vehicleID = cells[1].innerText;
    const driverID = cells[2].innerText;
    const startDate = cells[3].innerText;
    const endDate = cells[4].innerText;
    const totalPrice = cells[5].innerText;
    const status = cells[6].innerText;

    // Fill the form with the current booking data
    (document.getElementById('bookingID') as HTMLInputElement).value = bookingID;
    (document.getElementById('vehicleID') as HTMLInputElement).value = vehicleID;
    (document.getElementById('driverID') as HTMLInputElement).value = driverID;
    (document.getElementById('startDate') as HTMLInputElement).value = startDate;
    (document.getElementById('endDate') as HTMLInputElement).value = endDate;
    (document.getElementById('totalPrice') as HTMLInputElement).value = totalPrice;
    (document.getElementById('status') as HTMLSelectElement).value = status;

    isEdit = true;
    currentEditRow = row;

    bookingForm.style.display = 'block';
    overlay.style.display = 'block';
  }
}

// Delete Booking functionality
function deleteBooking(event: MouseEvent) {
  const row = (event.target as HTMLElement).closest('tr') as HTMLTableRowElement;
  if (row) {
    row.remove();
  }
}

// Edit the booking in the table after form submission
function editBookingInTable(bookingID: string, vehicleID: string, driverID: string, startDate: string, endDate: string, totalPrice: string, status: string) {
  if (currentEditRow) {
    const cells = currentEditRow.getElementsByTagName('td');

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
