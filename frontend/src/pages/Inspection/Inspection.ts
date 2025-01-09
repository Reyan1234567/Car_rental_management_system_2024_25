// Inspection Management Script

const addInspectionBtn = document.getElementById('addInspectionBtn') as HTMLButtonElement;
const inspectionForm = document.getElementById('InspectionForm') as HTMLDivElement;
const inspectionTableBody = document.getElementById('inspectionTableBody') as HTMLTableSectionElement;
const overlay = document.createElement('div');
overlay.id = 'overlay';
document.body.appendChild(overlay);

// Show form for adding inspection
addInspectionBtn.addEventListener('click', () => {
  const formTitle = document.getElementById('formTitle') as HTMLHeadingElement;
  formTitle.textContent = 'Add Inspection';// Set the title of the form dynamically
  (document.getElementById('inspectionForm') as HTMLFormElement).reset();
  inspectionForm.style.display = 'block';
  overlay.style.display = 'block';
});

// Cancel form
document.getElementById('cancelForm')!.addEventListener('click', resetForm);

// Submit form
const inspectionFormElement = document.getElementById('inspectionForm') as HTMLFormElement;
inspectionFormElement.addEventListener('submit', (e) => {
  e.preventDefault();

  const inspectionID = (document.getElementById('inspectionID') as HTMLInputElement).value;
  const vehicleID = (document.getElementById('vehicleID') as HTMLInputElement).value;
  const inspectionDate = (document.getElementById('inspectionDate') as HTMLInputElement).value;
  const inspectorName = (document.getElementById('inspectorName') as HTMLInputElement).value;
  const inspectionStatus = (document.getElementById('inspectionStatus') as HTMLSelectElement).value;
  const inspectionPrice = (document.getElementById('inspectionPrice') as HTMLInputElement).value;
  const inspectionComments = (document.getElementById('inspectionComments') as HTMLTextAreaElement).value;

  addInspectionToTable(inspectionID, vehicleID, inspectionDate, inspectorName, inspectionStatus, inspectionPrice, inspectionComments);
  resetForm();
});

// Add inspection row
function addInspectionToTable(
  id: string,
  vehicleID: string,
  date: string,
  name: string,
  status: string,
  price: string,
  comments: string
) {
  const newRow = document.createElement('tr');
  newRow.dataset.inspectionId = id;
  newRow.innerHTML = `
    <td>${id}</td>
    <td>${vehicleID}</td>
    <td>${date}</td>
    <td>${name}</td>
    <td>${status}</td>
    <td>${price}</td>
    <td>${comments}</td>
    <td>
      <button class="btn btn-warning btn-sm">Edit</button>
      <button class="btn btn-danger btn-sm">Delete</button>
    </td>`;
  inspectionTableBody.appendChild(newRow);
}

// Reset form
function resetForm() {
  inspectionForm.style.display = 'none';
  overlay.style.display = 'none';
  inspectionFormElement.reset();
}
