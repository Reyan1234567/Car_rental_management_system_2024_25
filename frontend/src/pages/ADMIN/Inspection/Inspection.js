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
var modal = document.getElementById("inspection-modal");
var closeModalBtn = document.getElementById("close-modal");
var createInspectionBtn = document.getElementById("create-inspection-btn");
var inspectionForm = document.getElementById("inspection-form");
var inspectionList = document.getElementById("inspection-list");
var editingId = null;
// Show modal for creating a new inspection
createInspectionBtn.addEventListener("click", function () {
    modal.classList.remove("hidden");
    inspectionForm.reset();
    editingId = null;
    document.getElementById("modal-title").innerText = "Create Inspection";
});
// Close the modal
closeModalBtn.addEventListener("click", function () {
    modal.classList.add("hidden");
});
// Handle form submission
inspectionForm.addEventListener("submit", function (e) { return __awaiter(_this, void 0, void 0, function () {
    var formData, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                e.preventDefault();
                formData = new FormData(inspectionForm);
                data = Object.fromEntries(formData);
                if (!editingId) return [3 /*break*/, 2];
                // Update existing inspection
                return [4 /*yield*/, fetch("http://localhost:3333/inspections/".concat(editingId), {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(data),
                    })];
            case 1:
                // Update existing inspection
                _a.sent();
                return [3 /*break*/, 4];
            case 2: 
            // Create new inspection
            return [4 /*yield*/, fetch("http://localhost:3333/inspections", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                })];
            case 3:
                // Create new inspection
                _a.sent();
                _a.label = 4;
            case 4:
                loadInspections();
                modal.classList.add("hidden");
                return [2 /*return*/];
        }
    });
}); });
// Load all inspections
function loadInspections() {
    return __awaiter(this, void 0, void 0, function () {
        var response, inspections;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("http://localhost:3333/inspections")];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    inspections = _a.sent();
                    inspectionList.innerHTML = "";
                    inspections.forEach(function (inspection) {
                        var row = document.createElement("tr");
                        row.innerHTML = "\n      <td>".concat(inspection.inspectionID, "</td>\n      <td>").concat(inspection.vehicleID, "</td>\n      <td>").concat(new Date(inspection.date).toLocaleDateString(), "</td>\n      <td>").concat(inspection.inspectorName, "</td>\n      <td>").concat(inspection.status, "</td>\n      <td>").concat(inspection.price.toFixed(2), "</td>\n      <td>").concat(inspection.comments, "</td>\n      <td>\n        <button class=\"btn btn-warning btn-sm\" onclick=\"editInspection('").concat(inspection._id, "')\">Edit</button>\n        <button class=\"btn btn-danger btn-sm\" onclick=\"deleteInspection('").concat(inspection._id, "')\">Delete</button>\n      </td>\n    ");
                        inspectionList.appendChild(row);
                    });
                    return [2 /*return*/];
            }
        });
    });
}
// Edit an inspection
window.editInspection = function (id) {
    return __awaiter(this, void 0, void 0, function () {
        var response, inspection;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("http://localhost:3333/inspections/".concat(id))];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    inspection = _a.sent();
                    document.getElementById("inspectionID").value = inspection.inspectionID;
                    document.getElementById("vehicleID").value = inspection.vehicleID;
                    document.getElementById("date").value = new Date(inspection.date).toISOString().split("T")[0];
                    document.getElementById("inspectorName").value = inspection.inspectorName;
                    document.getElementById("status").value = inspection.status;
                    document.getElementById("price").value = inspection.price.toString();
                    document.getElementById("comments").value = inspection.comments;
                    editingId = id;
                    modal.classList.remove("hidden");
                    document.getElementById("modal-title").innerText = "Update Inspection";
                    return [2 /*return*/];
            }
        });
    });
};
// Delete an inspection
window.deleteInspection = function (id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("http://localhost:3333/inspections/".concat(id), { method: "DELETE" })];
                case 1:
                    _a.sent();
                    loadInspections();
                    return [2 /*return*/];
            }
        });
    });
};
// Initial load
loadInspections();
// const addInspectionBtn = document.getElementById('addInspectionBtn') as HTMLButtonElement;
// const inspectionForm = document.getElementById('InspectionForm') as HTMLDivElement;
// const inspectionTableBody = document.getElementById('inspectionTableBody') as HTMLTableSectionElement;
// const overlay = document.createElement('div');
// overlay.id = 'overlay';
// document.body.appendChild(overlay);
// addInspectionBtn.addEventListener('click', () => {
//   const formTitle = document.getElementById('formTitle') as HTMLHeadingElement;
//   formTitle.textContent = 'Add Inspection';
//   (document.getElementById('inspectionForm') as HTMLFormElement).reset();
//   inspectionForm.style.display = 'block';
//   overlay.style.display = 'block';
// });
// document.getElementById('cancelForm')!.addEventListener('click', resetForm);
// const inspectionFormElement = document.getElementById('inspectionForm') as HTMLFormElement;
// inspectionFormElement.addEventListener('submit', (e) => {
//   e.preventDefault();
//   const inspectionID = (document.getElementById('inspectionID') as HTMLInputElement).value;
//   const vehicleID = (document.getElementById('vehicleID') as HTMLInputElement).value;
//   const inspectionDate = (document.getElementById('inspectionDate') as HTMLInputElement).value;
//   const inspectorName = (document.getElementById('inspectorName') as HTMLInputElement).value;
//   const inspectionStatus = (document.getElementById('inspectionStatus') as HTMLSelectElement).value;
//   const inspectionPrice = (document.getElementById('inspectionPrice') as HTMLInputElement).value;
//   const inspectionComments = (document.getElementById('inspectionComments') as HTMLTextAreaElement).value;
//   addInspectionToTable(inspectionID, vehicleID, inspectionDate, inspectorName, inspectionStatus, inspectionPrice, inspectionComments);
//   resetForm();
// });
// function addInspectionToTable(
//   id: string,
//   vehicleID: string,
//   date: string,
//   name: string,
//   status: string,
//   price: string,
//   comments: string
// ) {
//   const newRow = document.createElement('tr');
//   newRow.dataset.inspectionId = id;
//   newRow.innerHTML = `
//     <td>${id}</td>
//     <td>${vehicleID}</td>
//     <td>${date}</td>
//     <td>${name}</td>
//     <td>${status}</td>
//     <td>${price}</td>
//     <td>${comments}</td>
//     <td>
//       <button class="btn btn-warning btn-sm">Edit</button>
//       <button class="btn btn-danger btn-sm">Delete</button>
//     </td>`;
//   inspectionTableBody.appendChild(newRow);
// }
// function resetForm() {
//   inspectionForm.style.display = 'none';
//   overlay.style.display = 'none';
//   inspectionFormElement.reset();
// }
