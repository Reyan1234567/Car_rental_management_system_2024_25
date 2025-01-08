// Price Management Script

const addPriceBtn = document.getElementById('addPriceBtn') as HTMLButtonElement;
const priceForm = document.getElementById('PriceForm') as HTMLDivElement;
const priceTableBody = document.getElementById('priceTableBody') as HTMLTableSectionElement;
const overlay = document.createElement('div');
overlay.id = 'overlay';
document.body.appendChild(overlay);

// Show form for adding price
addPriceBtn.addEventListener('click', () => {
  const formTitle = document.getElementById('formTitle') as HTMLHeadingElement;
  formTitle.textContent = 'Add Price';
  (document.getElementById('priceForm') as HTMLFormElement).reset();
  priceForm.style.display = 'block';
  overlay.style.display = 'block';
});

// Cancel form
document.getElementById('cancelForm')!.addEventListener('click', resetForm);

// Submit form
const priceFormElement = document.getElementById('priceForm') as HTMLFormElement;
priceFormElement.addEventListener('submit', (e) => {
  e.preventDefault();

  const priceID = (document.getElementById('priceID') as HTMLInputElement).value;
  const vehicleID = (document.getElementById('vehicleID') as HTMLInputElement).value;
  const rentalPrice = (document.getElementById('rentalPrice') as HTMLInputElement).value;

  addPriceToTable(priceID, vehicleID, rentalPrice);
  resetForm();
});

// Add price row
function addPriceToTable(id: string, vehicleID: string, rentalPrice: string) {
  const newRow = document.createElement('tr');
  newRow.dataset.priceId = id;
  newRow.innerHTML = `
    <td>${id}</td>
    <td>${vehicleID}</td>
    <td>${rentalPrice}</td>
    <td>
      <button class="btn btn-warning btn-sm">Edit</button>
      <button class="btn btn-danger btn-sm">Delete</button>
    </td>`;
  priceTableBody.appendChild(newRow);
}

// Reset form
function resetForm() {
  priceForm.style.display = 'none';
  overlay.style.display = 'none';
  priceFormElement.reset();
}
