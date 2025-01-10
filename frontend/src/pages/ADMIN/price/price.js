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
var priceModal = document.getElementById("price-modal");
var closePriceModalBtn = document.getElementById("close-price-modal");
var createPriceBtn = document.getElementById("create-price-btn");
var priceForm = document.getElementById("price-form");
var priceList = document.getElementById("price-list");
var editingPriceId = null;
// Show modal for creating a new price
createPriceBtn.addEventListener("click", function () {
    priceModal.classList.remove("hidden");
    priceForm.reset();
    editingPriceId = null;
    document.getElementById("price-modal-title").innerText = "Create Price";
});
// Close the modal
closePriceModalBtn.addEventListener("click", function () {
    priceModal.classList.add("hidden");
});
// Handle form submission
priceForm.addEventListener("submit", function (e) { return __awaiter(_this, void 0, void 0, function () {
    var formData, data, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                e.preventDefault();
                formData = new FormData(priceForm);
                data = Object.fromEntries(formData);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                if (!editingPriceId) return [3 /*break*/, 3];
                // Update existing price
                return [4 /*yield*/, fetch("http://localhost:3333/prices/".concat(editingPriceId), {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(data),
                    })];
            case 2:
                // Update existing price
                _a.sent();
                return [3 /*break*/, 5];
            case 3: 
            // Create new price
            return [4 /*yield*/, fetch("http://localhost:3333/prices", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                })];
            case 4:
                // Create new price
                _a.sent();
                _a.label = 5;
            case 5:
                loadPrices();
                priceModal.classList.add("hidden");
                return [3 /*break*/, 7];
            case 6:
                error_1 = _a.sent();
                console.error("Error saving price:", error_1);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
// Load all prices
function loadPrices() {
    return __awaiter(this, void 0, void 0, function () {
        var response, prices, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("http://localhost:3333/prices")];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    prices = _a.sent();
                    priceList.innerHTML = "";
                    prices.forEach(function (price) {
                        var row = document.createElement("tr");
                        row.innerHTML = "\n        <td>".concat(price.priceID, "</td>\n        <td>").concat(price.vehicleID, "</td>\n        <td>").concat(price.rentalPricePerDay, "</td>\n        <td>\n          <button class=\"btn btn-warning btn-sm\" onclick=\"editPrice('").concat(price._id, "')\">Edit</button>\n          <button class=\"btn btn-danger btn-sm\" onclick=\"deletePrice('").concat(price._id, "')\">Delete</button>\n        </td>\n      ");
                        priceList.appendChild(row);
                    });
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error("Error loading prices:", error_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Edit a price
window.editPrice = function (id) {
    return __awaiter(this, void 0, void 0, function () {
        var response, price, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("http://localhost:3333/prices/".concat(id))];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    price = _a.sent();
                    document.getElementById("priceID").value = price.priceID;
                    document.getElementById("vehicleID").value = price.vehicleID;
                    document.getElementById("rentalPricePerDay").value = price.rentalPricePerDay;
                    editingPriceId = id;
                    priceModal.classList.remove("hidden");
                    document.getElementById("price-modal-title").innerText = "Update Price";
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    console.error("Error editing price:", error_3);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
};
// Delete a price
window.deletePrice = function (id) {
    return __awaiter(this, void 0, void 0, function () {
        var error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetch("http://localhost:3333/prices/".concat(id), { method: "DELETE" })];
                case 1:
                    _a.sent();
                    loadPrices();
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    console.error("Error deleting price:", error_4);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
};
// Initial load of prices
loadPrices();
