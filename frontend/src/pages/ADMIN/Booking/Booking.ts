const modal = document.getElementById("booking-modal") as HTMLElement;
const closeModalBtn = document.getElementById("close-modal") as HTMLElement;
const createBookingBtn = document.getElementById("create-booking-btn") as HTMLElement;
const bookingForm = document.getElementById("booking-form") as HTMLFormElement;
const bookingList = document.getElementById("booking-list") as HTMLElement;

let editingId: string | null = null;

// Show modal for creating a new booking
createBookingBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
  bookingForm.reset();
  editingId = null;
  document.getElementById("modal-title")!.innerText = "Create Booking";
});

// Close the modal
closeModalBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// Handle form submission
bookingForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(bookingForm);
  const data = Object.fromEntries(formData) as any;

  try {
    if (editingId) {
      // Update existing booking
      await fetch(`http://localhost:3333/bookings/${editingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } else {
      // Create new booking
      await fetch("http://localhost:3333/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    }
    loadBookings();
    modal.classList.add("hidden");
  } catch (error) {
    console.error("Error saving booking:", error);
  }
});

// Load all bookings
async function loadBookings() {
  try {
    const response = await fetch("http://localhost:3333/bookings");
    const bookings = await response.json();
    bookingList.innerHTML = "";

    bookings.forEach((booking: any) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${booking.bookingID}</td>
        <td>${booking.vehicleID}</td>
        <td>${booking.driverID}</td>
        <td>${new Date(booking.startDate).toLocaleDateString()}</td>
        <td>${new Date(booking.endDate).toLocaleDateString()}</td>
        <td>${booking.totalPrice.toFixed(2)}</td>
        <td>${booking.status}</td>
        <td>
          <button class="btn btn-warning btn-sm" onclick="editBooking('${booking._id}')">Edit</button>
          <button class="btn btn-danger btn-sm" onclick="deleteBooking('${booking._id}')">Delete</button>
        </td>
      `;
      bookingList.appendChild(row);
    });
  } catch (error) {
    console.error("Error loading bookings:", error);
  }
}

// Edit a booking
(window as any).editBooking = async function (id: string) {
  try {
    const response = await fetch(`http://localhost:3333/bookings/${id}`);
    const booking = await response.json();

    (document.getElementById("bookingID") as HTMLInputElement).value = booking.bookingID;
    (document.getElementById("vehicleID") as HTMLInputElement).value = booking.vehicleID;
    (document.getElementById("driverID") as HTMLInputElement).value = booking.driverID;
    (document.getElementById("startDate") as HTMLInputElement).value = new Date(booking.startDate)
      .toISOString()
      .split("T")[0];
    (document.getElementById("endDate") as HTMLInputElement).value = new Date(booking.endDate)
      .toISOString()
      .split("T")[0];
    (document.getElementById("totalPrice") as HTMLInputElement).value = booking.totalPrice.toString();
    (document.getElementById("status") as HTMLSelectElement).value = booking.status;

    editingId = id;
    modal.classList.remove("hidden");
    document.getElementById("modal-title")!.innerText = "Update Booking";
  } catch (error) {
    console.error("Error editing booking:", error);
  }
};

// Delete a booking
(window as any).deleteBooking = async function (id: string) {
  try {
    await fetch(`http://localhost:3333/bookings/${id}`, { method: "DELETE" });
    loadBookings();
  } catch (error) {
    console.error("Error deleting booking:", error);
  }
};

// Initial load of bookings
loadBookings();
