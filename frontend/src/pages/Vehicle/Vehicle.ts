// Vehicle Management Script

const addVehicleBtn = document.getElementById('addVehicleBtn') as HTMLButtonElement;
const vehicleForm = document.getElementById('VehicleForm') as HTMLDivElement;
const vehicleTableBody = document.getElementById('vehicleTableBody') as HTMLTableSectionElement;
const overlay = document.createElement('div');
overlay.id = 'overlay';
document.body.appendChild(overlay);

// Show form for adding a vehicle
addVehicleBtn.addEventListener('click', () => {
  const formTitle = document.getElementById('formTitle') as HTMLHeadingElement;
  formTitle.textContent = 'Add Vehicle';
  (document.getElementById('vehicleForm') as HTMLFormElement).reset();
  vehicleForm.style.display = 'block';
  overlay.style.display = 'block';
});

// Cancel form
document.getElementById('cancelForm')!.addEventListener('click', resetForm);

// Submit form
const vehicleFormElement = document.getElementById('vehicleForm') as HTMLFormElement;
vehicleFormElement.addEventListener('submit', (e) => {
  e.preventDefault();

  const vehicleID = (document.getElementById('vehicleID') as HTMLInputElement).value;
  const licensePlate = (document.getElementById('licensePlate') as HTMLInputElement).value;
  const make = (document.getElementById('make') as HTMLInputElement).value;
  const year = (document.getElementById('year') as HTMLInputElement).value;
  const mileage = (document.getElementById('mileage') as HTMLInputElement).value;
  const isOccupied = (document.getElementById('isOccupied') as HTMLSelectElement).value;
  const rentalPrice = (document.getElementById('rentalPrice') as HTMLInputElement).value;
  const startDate = (document.getElementById('startDate') as HTMLInputElement).value;
  const endDate = (document.getElementById('endDate') as HTMLInputElement).value;

  addVehicleToTable(vehicleID, licensePlate, make, year, mileage, isOccupied, rentalPrice, startDate, endDate);
  resetForm();
});

// Add vehicle row
function addVehicleToTable(
  id: string,
  licensePlate: string,
  make: string,
  year: string,
  mileage: string,
  isOccupied: string,
  rentalPrice: string,
  startDate: string,
  endDate: string
) {
  const newRow = document.createElement('tr');
  newRow.dataset.vehicleId = id;
  newRow.innerHTML = `
    <td>${id}</td>
    <td>${licensePlate}</td>
    <td>${make}</td>
    <td>${year}</td>
    <td>${mileage}</td>
    <td>${isOccupied === 'true' ? 'Yes' : 'No'}</td>
    <td>${rentalPrice}</td>
    <td>${startDate}</td>
    <td>${endDate}</td>
    <td>
      <button class="btn btn-warning btn-sm">Edit</button>
      <button class="btn btn-danger btn-sm">Delete</button>
    </td>`;
  vehicleTableBody.appendChild(newRow);
}

// Reset form
function resetForm() {
  vehicleForm.style.display = 'none';
  overlay.style.display = 'none';
  vehicleFormElement.reset();
}
