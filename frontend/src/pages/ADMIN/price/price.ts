const priceModal = document.getElementById("price-modal") as HTMLElement;
const closePriceModalBtn = document.getElementById("close-price-modal") as HTMLElement;
const createPriceBtn = document.getElementById("create-price-btn") as HTMLElement;
const priceForm = document.getElementById("price-form") as HTMLFormElement;
const priceList = document.getElementById("price-list") as HTMLElement;

let editingPriceId: string | null = null;

// Show modal for creating a new price
createPriceBtn.addEventListener("click", () => {
  priceModal.classList.remove("hidden");
  priceForm.reset();
  editingPriceId = null;
  document.getElementById("price-modal-title")!.innerText = "Create Price";
});

// Close the modal
closePriceModalBtn.addEventListener("click", () => {
  priceModal.classList.add("hidden");
});

// Handle form submission
priceForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(priceForm);
  const data = Object.fromEntries(formData) as any;

  try {
    if (editingPriceId) {
      // Update existing price
      await fetch(`http://localhost:3333/prices/${editingPriceId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } else {
      // Create new price
      await fetch("http://localhost:3333/prices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    }
    loadPrices();
    priceModal.classList.add("hidden");
  } catch (error) {
    console.error("Error saving price:", error);
  }
});

// Load all prices
async function loadPrices() {
  try {
    const response = await fetch("http://localhost:3333/prices");
    const prices = await response.json();
    priceList.innerHTML = "";

    prices.forEach((price: any) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${price.priceID}</td>
        <td>${price.vehicleID}</td>
        <td>${price.rentalPricePerDay}</td>
        <td>
          <button class="btn btn-warning btn-sm" onclick="editPrice('${price._id}')">Edit</button>
          <button class="btn btn-danger btn-sm" onclick="deletePrice('${price._id}')">Delete</button>
        </td>
      `;
      priceList.appendChild(row);
    });
  } catch (error) {
    console.error("Error loading prices:", error);
  }
}

// Edit a price
(window as any).editPrice = async function (id: string) {
  try {
    const response = await fetch(`http://localhost:3333/prices/${id}`);
    const price = await response.json();

    (document.getElementById("priceID") as HTMLInputElement).value = price.priceID;
    (document.getElementById("vehicleID") as HTMLInputElement).value = price.vehicleID;
    (document.getElementById("rentalPricePerDay") as HTMLInputElement).value = price.rentalPricePerDay;

    editingPriceId = id;
    priceModal.classList.remove("hidden");
    document.getElementById("price-modal-title")!.innerText = "Update Price";
  } catch (error) {
    console.error("Error editing price:", error);
  }
};

// Delete a price
(window as any).deletePrice = async function (id: string) {
  try {
    await fetch(`http://localhost:3333/prices/${id}`, { method: "DELETE" });
    loadPrices();
  } catch (error) {
    console.error("Error deleting price:", error);
  }
};

// Initial load of prices
loadPrices();
