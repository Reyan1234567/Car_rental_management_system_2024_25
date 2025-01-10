var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var modal = document.getElementById("booking-modal");
var closeModalBtn = document.getElementById("close-modal");
var createBookingBtn = document.getElementById("create-booking-btn");
var bookingForm = document.getElementById("booking-form");
var bookingList = document.getElementById("booking-list");
var editingId = null;
// Show modal for creating a new booking
createBookingBtn.addEventListener("click", function () {
    modal.classList.remove("hidden");
    bookingForm.reset();
    editingId = null;
    document.getElementById("modal-title").innerText = "Create Booking";
});
// Close the modal
closeModalBtn.addEventListener("click", function () {
    modal.classList.add("hidden");
});
// Handle form submission
bookingForm.addEventListener("submit", function (e) { return __awaiter(_this, void 0, void 0, function () {
    var formData, data, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                e.preventDefault();
                formData = new FormData(bookingForm);
                data = Object.fromEntries(formData);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                if (!editingId) return [3 /*break*/, 3];
                // Update existing booking
                return [4 /*yield*/, fetch("http://localhost:3333/bookings/".concat(editingId), {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(data),
                    })];
            case 2:
                // Update existing booking
                _a.sent();
                return [3 /*break*/, 5];
            case 3: 
            // Create new booking
            return [4 /*yield*/, fetch("http://localhost:3333/bookings", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                })];
            case 4:
                // Create new booking
                _a.sent();
                _a.label = 5;
            case 5:
                loadBookings();
                modal.classList.add("hidden");
                return [3 /*break*/, 7];
            case 6:
                error_1 = _a.sent();
                console.error("Error saving booking:", error_1);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
// Load all bookings
function loadBookings() {
    return __awaiter(this, void 0, void 0, function () {
        var response, bookings, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("http://localhost:3333/bookings")];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    bookings = _a.sent();
                    bookingList.innerHTML = "";
                    bookings.forEach(function (booking) {
                        var row = document.createElement("tr");
                        row.innerHTML = "\n        <td>".concat(booking.bookingID, "</td>\n        <td>").concat(booking.vehicleID, "</td>\n        <td>").concat(booking.driverID, "</td>\n        <td>").concat(new Date(booking.startDate).toLocaleDateString(), "</td>\n        <td>").concat(new Date(booking.endDate).toLocaleDateString(), "</td>\n        <td>").concat(booking.totalPrice.toFixed(2), "</td>\n        <td>").concat(booking.status, "</td>\n        <td>\n          <button class=\"btn btn-warning btn-sm\" onclick=\"editBooking('").concat(booking._id, "')\">Edit</button>\n          <button class=\"btn btn-danger btn-sm\" onclick=\"deleteBooking('").concat(booking._id, "')\">Delete</button>\n        </td>\n      ");
                        bookingList.appendChild(row);
                    });
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error("Error loading bookings:", error_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Edit a booking
window.editBooking = function (id) {
    return __awaiter(this, void 0, void 0, function () {
        var response, booking, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("http://localhost:3333/bookings/".concat(id))];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    booking = _a.sent();
                    document.getElementById("bookingID").value = booking.bookingID;
                    document.getElementById("vehicleID").value = booking.vehicleID;
                    document.getElementById("driverID").value = booking.driverID;
                    document.getElementById("startDate").value = new Date(booking.startDate)
                        .toISOString()
                        .split("T")[0];
                    document.getElementById("endDate").value = new Date(booking.endDate)
                        .toISOString()
                        .split("T")[0];
                    document.getElementById("totalPrice").value = booking.totalPrice.toString();
                    document.getElementById("status").value = booking.status;
                    editingId = id;
                    modal.classList.remove("hidden");
                    document.getElementById("modal-title").innerText = "Update Booking";
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    console.error("Error editing booking:", error_3);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
};
// Delete a booking
window.deleteBooking = function (id) {
    return __awaiter(this, void 0, void 0, function () {
        var error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetch("http://localhost:3333/bookings/".concat(id), { method: "DELETE" })];
                case 1:
                    _a.sent();
                    loadBookings();
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    console.error("Error deleting booking:", error_4);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
};
// Initial load of bookings
loadBookings();
