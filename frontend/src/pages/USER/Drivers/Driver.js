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
var addDriverBtn = document.getElementById("addDriverBtn");
var cancelFormBtnn = document.getElementById("cancelForm");
var driverForm = document.getElementById("driverForm");
var driverFormTitle = document.getElementById("formTitle");
var driverTableBody = document.getElementById("driverTableBody");
var overlayy = document.getElementById("overlayy");
var driverFormContainer = document.getElementById("DriverForm");
var drivers = [];
var isEditing = false;
var currentDriverID = null;
var API_BASE_URL = "http://localhost:3333/drivers";
var toggleFormVisibility = function (show) {
    if (show) {
        driverFormContainer.style.display = "block";
        overlayy.style.display = "block";
    }
    else {
        driverFormContainer.style.display = "none";
        overlayy.style.display = "none";
        driverForm.reset();
        isEditing = false;
        currentDriverID = null;
    }
};
var populateForm = function (driver) {
    driverForm.elements.namedItem("driverID").value = driver.driverID;
    driverForm.elements.namedItem("driverName").value = driver.name;
    driverForm.elements.namedItem("licenseNumber").value = driver.licenseNumber;
    driverForm.elements.namedItem("driverPhone").value = driver.phone;
    driverForm.elements.namedItem("driverEmail").value = driver.email;
    driverForm.elements.namedItem("driverStatus").value = driver.status;
};
var renderDrivers = function () {
    driverTableBody.innerHTML = "";
    drivers.forEach(function (driver) {
        var _a, _b;
        var row = document.createElement("tr");
        row.innerHTML = "\n      <td>".concat(driver.driverID, "</td>\n      <td>").concat(driver.name, "</td>\n      <td>").concat(driver.licenseNumber, "</td>\n      <td>").concat(driver.phone, "</td>\n      <td>").concat(driver.email, "</td>\n      <td>").concat(driver.status, "</td>\n      <td>\n        <button class=\"btn btn-sm btn-warning edit-btn\" data-id=\"").concat(driver._id, "\">Edit</button>\n        <button class=\"btn btn-sm btn-danger delete-btn\" data-id=\"").concat(driver._id, "\">Delete</button>\n      </td>\n    ");
        (_a = row.querySelector(".edit-btn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () { return handleEdit(driver._id); });
        (_b = row.querySelector(".delete-btn")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () { return handleDelete(driver._id); });
        driverTableBody.appendChild(row);
    });
};
var fetchDrivers = function () { return __awaiter(_this, void 0, void 0, function () {
    var response, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, fetch("".concat(API_BASE_URL))];
            case 1:
                response = _a.sent();
                if (!response.ok)
                    throw new Error("Failed to fetch drivers");
                return [4 /*yield*/, response.json()];
            case 2:
                drivers = _a.sent();
                renderDrivers();
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.error("Error fetching drivers:", error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var addDriver = function (driver) { return __awaiter(_this, void 0, void 0, function () {
    var response, newDriver, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, fetch("".concat(API_BASE_URL), {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(driver),
                    })];
            case 1:
                response = _a.sent();
                if (!response.ok)
                    throw new Error("Failed to add driver");
                return [4 /*yield*/, response.json()];
            case 2:
                newDriver = _a.sent();
                drivers.push(newDriver);
                renderDrivers();
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                console.error("Error adding driver:", error_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var updateDriver = function (driver) { return __awaiter(_this, void 0, void 0, function () {
    var response, updatedDriver_1, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, fetch("".concat(API_BASE_URL, "/").concat(driver._id), {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({        
                            driverID: driver.driverID,
                            name: driver.name,
                            licenseNumber: driver.licenseNumber,
                            phone: driver.phone,
                            email: driver.email,
                            status: driver.status,
                         }),
                    })];
            case 1:
                response = _a.sent();
                if (!response.ok)
                    throw new Error("Failed to update driver");
                return [4 /*yield*/, response.json()];
            case 2:
                updatedDriver_1 = _a.sent();
                drivers = drivers.map(function (d) { return (d._id === updatedDriver_1._id ? updatedDriver_1 : d); });
                renderDrivers();
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                console.error("Error updating driver:", error_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var deleteDriver = function (id) { return __awaiter(_this, void 0, void 0, function () {
    var response, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, fetch("".concat(API_BASE_URL, "/").concat(id), {
                        method: "DELETE",
                    })];
            case 1:
                response = _a.sent();
                if (!response.ok)
                    throw new Error("Failed to delete driver");
                drivers = drivers.filter(function (d) { return d._id !== id; });
                renderDrivers();
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                console.error("Error deleting driver:", error_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Event Handlers
var handleAddDriver = function () {
    driverFormTitle.textContent = "Add Driver";
    toggleFormVisibility(true);
};
var handleEdit = function (id) {
    var driver = drivers.find(function (d) { return d._id === id; });
    if (!driver)
        return;
    driverFormTitle.textContent = "Edit Driver";
    populateForm(driver);
    isEditing = true;
    currentDriverID = id;
    toggleFormVisibility(true);
};
var handleDelete = function (id) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!confirm("Are you sure you want to delete this driver?")) return [3 /*break*/, 2];
                return [4 /*yield*/, deleteDriver(id)];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2: return [2 /*return*/];
        }
    });
}); };
var handleFormSubmit = function (event) { return __awaiter(_this, void 0, void 0, function () {
    var driver;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                event.preventDefault();
                driver = {
                    driverID: driverForm.elements.namedItem("driverID").value.trim(),
                    name: driverForm.elements.namedItem("driverName").value.trim(),
                    licenseNumber: driverForm.elements.namedItem("licenseNumber").value.trim(),
                    phone: driverForm.elements.namedItem("driverPhone").value.trim(),
                    email: driverForm.elements.namedItem("driverEmail").value.trim(),
                    status: driverForm.elements.namedItem("driverStatus").value,
                    _id: isEditing && currentDriverID ? currentDriverID : undefined,
                };
                if (!(isEditing && currentDriverID)) return [3 /*break*/, 2];
                return [4 /*yield*/, updateDriver(driver)];
            case 1:
                _a.sent();
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, addDriver(driver)];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                toggleFormVisibility(false);
                return [2 /*return*/];
        }
    });
}); };
var handleCancelForm = function () {
    toggleFormVisibility(false);
};
addDriverBtn.addEventListener("click", handleAddDriver);
cancelFormBtnn.addEventListener("click", handleCancelForm);
driverForm.addEventListener("submit", handleFormSubmit);
fetchDrivers();
// type Driver = {
//   _id:string;
//   driverID: string;
//   name: string;
//   licenseNumber: string;
//   phone: string;
//   email: string;
//   status: "Active" | "Inactive";
// };
// const addDriverBtn = document.getElementById("addDriverBtn") as HTMLButtonElement;
// const cancelFormBtnn = document.getElementById("cancelForm") as HTMLButtonElement;
// const driverForm = document.getElementById("driverForm") as HTMLFormElement;
// const driverFormTitle = document.getElementById("formTitle") as HTMLHeadingElement;
// const driverTableBody = document.getElementById("driverTableBody") as HTMLTableSectionElement;
// const overlayy = document.getElementById("overlayy") as HTMLDivElement;
// const driverFormContainer = document.getElementById("DriverForm") as HTMLDivElement;
// let drivers: Driver[] = [];
// let isEditing = false;
// let currentDriverID: string | null = null;
// const API_BASE_URL = "http://localhost:3333/drivers";
// const toggleFormVisibility = (show: boolean) => {
//   if (show) {
//     driverFormContainer.style.display = "block";
//     overlayy.style.display = "block";
//   } else {
//     driverFormContainer.style.display = "none";
//     overlayy.style.display = "none";
//     driverForm.reset();
//     isEditing = false;
//     currentDriverID = null;
//   }
// };
// const populateForm = (driver: Driver) => {
//   (driverForm.elements.namedItem("driverID") as HTMLInputElement).value = driver.driverID;
//   (driverForm.elements.namedItem("driverName") as HTMLInputElement).value = driver.name;
//   (driverForm.elements.namedItem("licenseNumber") as HTMLInputElement).value = driver.licenseNumber;
//   (driverForm.elements.namedItem("driverPhone") as HTMLInputElement).value = driver.phone;
//   (driverForm.elements.namedItem("driverEmail") as HTMLInputElement).value = driver.email;
//   (driverForm.elements.namedItem("driverStatus") as HTMLSelectElement).value = driver.status;
// };
// const renderDrivers = () => {
//   driverTableBody.innerHTML = "";
//   drivers.forEach((driver) => {
//     const row = document.createElement("tr");
//     row.innerHTML = `
//       <td>${driver.driverID}</td>
//       <td>${driver.name}</td>
//       <td>${driver.licenseNumber}</td>
//       <td>${driver.phone}</td>
//       <td>${driver.email}</td>
//       <td>${driver.status}</td>
//       <td>
//         <button class="btn btn-sm btn-warning edit-btn" data-id="${driver._id}">Edit</button>
//         <button class="btn btn-sm btn-danger delete-btn" data-id="${driver._id}">Delete</button>
//       </td>
//     `;
//     row.querySelector(".edit-btn")?.addEventListener("click", () => handleEdit(driver._id));
//     row.querySelector(".delete-btn")?.addEventListener("click", () => handleDelete(driver._id));
//     driverTableBody.appendChild(row);
//   });
// };
// const fetchDrivers = async () => {
//   try {
//     const response = await fetch(`${API_BASE_URL}`);
//     if (!response.ok) throw new Error("Failed to fetch drivers");
//     drivers = await response.json();
//     renderDrivers();
//   } catch (error) {
//     console.error("Error fetching drivers:", error);
//   }
// };
// const addDriver = async (driver: Driver) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(driver),
//     });
//     if (!response.ok) throw new Error("Failed to add driver");
//     const newDriver = await response.json();
//     drivers.push(newDriver);
//     renderDrivers();
//   } catch (error) {
//     console.error("Error adding driver:", error);
//   }
// };
// const updateDriver = async (driver: Driver) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/${driver._id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(driver),
//     });
//     if (!response.ok) throw new Error("Failed to update driver");
//     const updatedDriver = await response.json();
//     drivers = drivers.map((d) => (d.driverID === updatedDriver.driverID ? updatedDriver : d));
//     renderDrivers();
//   } catch (error) {
//     console.error("Error updating driver:", error);
//   }
// };
// const deleteDriver = async (id: string) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/${id}`, {
//       method: "DELETE",
//     });
//     if (!response.ok) throw new Error("Failed to delete driver");
//     drivers = drivers.filter((d) => d.driverID !== id);
//     renderDrivers();
//   } catch (error) {
//     console.error("Error deleting driver:", error);
//   }
// };
// // Event Handlers
// const handleAddDriver = () => {
//   driverFormTitle.textContent = "Add Driver";
//   toggleFormVisibility(true);
// };
// const handleEdit = (id: string) => {
//   const driver = drivers.find((d) => d._id === id);
//   if (!driver) return;
//   driverFormTitle.textContent = "Edit Driver";
//   populateForm(driver);
//   isEditing = true;
//   currentDriverID = id;
//   toggleFormVisibility(true);
// };
// const handleDelete = async (id: string) => {
//   if (confirm("Are you sure you want to delete this driver?")) {
//     await deleteDriver(id);
//   }
// };
// const handleFormSubmit = async (event: Event) => {
//   event.preventDefault();
//   const driver: Driver = {
//     driverID: (driverForm.elements.namedItem("driverID") as HTMLInputElement).value.trim(),
//     name: (driverForm.elements.namedItem("driverName") as HTMLInputElement).value.trim(),
//     licenseNumber: (driverForm.elements.namedItem("licenseNumber") as HTMLInputElement).value.trim(),
//     phone: (driverForm.elements.namedItem("driverPhone") as HTMLInputElement).value.trim(),
//     email: (driverForm.elements.namedItem("driverEmail") as HTMLInputElement).value.trim(),
//     status: (driverForm.elements.namedItem("driverStatus") as HTMLSelectElement).value as "Active" | "Inactive",
//     _id: 
//   };
//   if (isEditing && currentDriverID) {
//     await updateDriver(driver);
//   } else {
//     await addDriver(driver);
//   }
//   toggleFormVisibility(false);
// };
// const handleCancelForm = () => {
//   toggleFormVisibility(false);
// };
// addDriverBtn.addEventListener("click", handleAddDriver);
// cancelFormBtnn.addEventListener("click", handleCancelForm);
// driverForm.addEventListener("submit", handleFormSubmit);
// fetchDrivers();
