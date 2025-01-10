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
var modal = document.getElementById("driver-modal");
var closeModalBtn = document.getElementById("close-modal");
var createDriverBtn = document.getElementById("create-driver-btn");
var driverForm = document.getElementById("driver-form");
var driverList = document.getElementById("driver-list");
var editingId = null;
// Show modal for creating a new driver
createDriverBtn.addEventListener("click", function () {
    modal.classList.remove("hidden");
    driverForm.reset();
    editingId = null;
    document.getElementById("modal-title").innerText = "Create Driver";
});
// Close the modal
closeModalBtn.addEventListener("click", function () {
    modal.classList.add("hidden");
});
// Handle form submission
driverForm.addEventListener("submit", function (e) { return __awaiter(_this, void 0, void 0, function () {
    var formData, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                e.preventDefault();
                formData = new FormData(driverForm);
                data = Object.fromEntries(formData);
                if (!editingId) return [3 /*break*/, 2];
                // Update existing driver
                return [4 /*yield*/, fetch("http://localhost:3333/drivers/".concat(editingId), {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(data),
                    })];
            case 1:
                // Update existing driver
                _a.sent();
                return [3 /*break*/, 4];
            case 2: 
            // Create new driver
            return [4 /*yield*/, fetch("http://localhost:3333/drivers", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                })];
            case 3:
                // Create new driver
                _a.sent();
                _a.label = 4;
            case 4:
                loadDrivers();
                modal.classList.add("hidden");
                return [2 /*return*/];
        }
    });
}); });
// Load all drivers
function loadDrivers() {
    return __awaiter(this, void 0, void 0, function () {
        var response, drivers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("http://localhost:3333/drivers")];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    drivers = _a.sent();
                    driverList.innerHTML = "";
                    drivers.forEach(function (driver) {
                        var row = document.createElement("tr");
                        row.innerHTML = "\n      <td>".concat(driver.driverID, "</td>\n      <td>").concat(driver.name, "</td>\n      <td>").concat(driver.licenseNumber, "</td>\n      <td>").concat(driver.phone, "</td>\n      <td>").concat(driver.email, "</td>\n      <td>").concat(driver.status, "</td>\n      <td>\n        <button class=\"btn btn-warning btn-sm\" onclick=\"editDriver('").concat(driver._id, "')\">Edit</button>\n        <button class=\"btn btn-danger btn-sm\" onclick=\"deleteDriver('").concat(driver._id, "')\">Delete</button>\n      </td>\n    ");
                        driverList.appendChild(row);
                    });
                    return [2 /*return*/];
            }
        });
    });
}
// Edit a driver
window.editDriver = function (id) {
    return __awaiter(this, void 0, void 0, function () {
        var response, driver;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("http://localhost:3333/drivers/".concat(id))];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    driver = _a.sent();
                    document.getElementById("driverID").value = driver.driverID;
                    document.getElementById("name").value = driver.name;
                    document.getElementById("licenseNumber").value = driver.licenseNumber;
                    document.getElementById("phone").value = driver.phone;
                    document.getElementById("email").value = driver.email;
                    document.getElementById("status").value = driver.status;
                    editingId = id;
                    modal.classList.remove("hidden");
                    document.getElementById("modal-title").innerText = "Update Driver";
                    return [2 /*return*/];
            }
        });
    });
};
// Delete a driver
window.deleteDriver = function (id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("http://localhost:3333/drivers/".concat(id), { method: "DELETE" })];
                case 1:
                    _a.sent();
                    loadDrivers();
                    return [2 /*return*/];
            }
        });
    });
};
