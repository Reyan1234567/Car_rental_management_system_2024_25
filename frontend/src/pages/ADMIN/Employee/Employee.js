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
var employeeModal = document.getElementById("employee-modal");
var closeEmployeeModalBtn = document.getElementById("close-employee-modal");
var createEmployeeBtn = document.getElementById("create-employee-btn");
var employeeForm = document.getElementById("employee-form");
var employeeList = document.getElementById("employee-list");
var editingEmployeeId = null;
// Show modal for creating a new employee
createEmployeeBtn.addEventListener("click", function () {
    employeeModal.classList.remove("hidden");
    employeeForm.reset();
    editingEmployeeId = null;
    document.getElementById("employee-modal-title").innerText = "Create Employee";
});
// Close the modal
closeEmployeeModalBtn.addEventListener("click", function () {
    employeeModal.classList.add("hidden");
});
// Handle form submission
employeeForm.addEventListener("submit", function (e) { return __awaiter(_this, void 0, void 0, function () {
    var formData, data, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                e.preventDefault();
                formData = new FormData(employeeForm);
                data = Object.fromEntries(formData);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                if (!editingEmployeeId) return [3 /*break*/, 3];
                // Update existing employee
                return [4 /*yield*/, fetch("http://localhost:3333/employees/".concat(editingEmployeeId), {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(data),
                    })];
            case 2:
                // Update existing employee
                _a.sent();
                return [3 /*break*/, 5];
            case 3: 
            // Create new employee
            return [4 /*yield*/, fetch("http://localhost:3333/employees", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                })];
            case 4:
                // Create new employee
                _a.sent();
                _a.label = 5;
            case 5:
                loadEmployees();
                employeeModal.classList.add("hidden");
                return [3 /*break*/, 7];
            case 6:
                error_1 = _a.sent();
                console.error("Error saving employee:", error_1);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
// Load all employees
function loadEmployees() {
    return __awaiter(this, void 0, void 0, function () {
        var response, employees, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("http://localhost:3333/employees")];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    employees = _a.sent();
                    employeeList.innerHTML = "";
                    employees.forEach(function (employee) {
                        var row = document.createElement("tr");
                        row.innerHTML = "\n        <td>".concat(employee.employeeID, "</td>\n        <td>").concat(employee.name, "</td>\n        <td>").concat(employee.role, "</td>\n        <td>").concat(employee.phoneNumber, "</td>\n        <td>").concat(employee.email, "</td>\n        <td>").concat(employee.status, "</td>\n        <td>\n          <button class=\"btn btn-warning btn-sm\" onclick=\"editEmployee('").concat(employee._id, "')\">Edit</button>\n          <button class=\"btn btn-danger btn-sm\" onclick=\"deleteEmployee('").concat(employee._id, "')\">Delete</button>\n        </td>\n      ");
                        employeeList.appendChild(row);
                    });
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error("Error loading employees:", error_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Edit an employee
window.editEmployee = function (id) {
    return __awaiter(this, void 0, void 0, function () {
        var response, employee, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("http://localhost:3333/employees/".concat(id))];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    employee = _a.sent();
                    document.getElementById("employeeID").value = employee.employeeID;
                    document.getElementById("name").value = employee.name;
                    document.getElementById("role").value = employee.role;
                    document.getElementById("phoneNumber").value = employee.phoneNumber;
                    document.getElementById("email").value = employee.email;
                    document.getElementById("status").value = employee.status;
                    editingEmployeeId = id;
                    employeeModal.classList.remove("hidden");
                    document.getElementById("employee-modal-title").innerText = "Update Employee";
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    console.error("Error editing employee:", error_3);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
};
// Delete an employee
window.deleteEmployee = function (id) {
    return __awaiter(this, void 0, void 0, function () {
        var error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetch("http://localhost:3333/employees/".concat(id), { method: "DELETE" })];
                case 1:
                    _a.sent();
                    loadEmployees();
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    console.error("Error deleting employee:", error_4);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
};
// Initial load of employees
loadEmployees();
