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
var loginForm = document.querySelector('form');
loginForm.addEventListener('submit', function (event) { return __awaiter(_this, void 0, void 0, function () {
    var usernameInput, passwordInput, roleInput, username, password, role, response, data, error, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                event.preventDefault();
                usernameInput = document.querySelector('#username');
                passwordInput = document.querySelector('#password');
                roleInput = document.querySelector('#role');
                username = usernameInput.value.trim();
                password = passwordInput.value.trim();
                role = roleInput.value.trim();
                if (!username || !password || !role) {
                    alert('Please enter all input fields.');
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 7, , 8]);
                return [4 /*yield*/, fetch('http://localhost:3333/auth/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ userID: username, password: password, role: role }),
                    })];
            case 2:
                response = _a.sent();
                if (!(response.ok || response.status === 201)) return [3 /*break*/, 4];
                return [4 /*yield*/, response.json()];
            case 3:
                data = _a.sent();
                localStorage.setItem('token', data.token);
                if(role==="user"){
                    window.location.assign('http://127.0.0.1:5501/Car_rental_management_system_2024_25/frontend/src/pages/USER/Dashboard/Dashboard.html');
                }
                else if(role==="admin"){
                    window.location.assign('http://127.0.0.1:5501/Car_rental_management_system_2024_25/frontend/src/pages/ADMIN/Dashboard/Dashboard.html');
                }
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, response.json()];
            case 5:
                error = _a.sent();
                alert("Login failed: ".concat(error.message));
                _a.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                err_1 = _a.sent();
                console.error('Error during login:', err_1);
                alert('An error occurred while trying to log in. Please try again.');
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); });
