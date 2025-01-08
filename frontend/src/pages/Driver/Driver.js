// Driver.ts
document.addEventListener("DOMContentLoaded", function () {
    var addDriverBtn = document.getElementById("addDriverBtn");
    var driverForm = document.getElementById("driverForm");
    var driverTableBody = document.getElementById("driverTableBody");
    var driverFormContainer = document.getElementById("DriverForm");
    var cancelFormBtn = document.getElementById("cancelForm");
    var isEditing = false;
    var editingRow = null;
    var drivers = [];
    // Show the driver form
    var showDriverForm = function () {
        driverFormContainer.style.display = "block";
    };
    // Hide the driver form
    var hideDriverForm = function () {
        driverFormContainer.style.display = "none";
        driverForm.reset();
        isEditing = false;
        editingRow = null;
    };
    // Populate the table
    var populateTable = function () {
        driverTableBody.innerHTML = "";
        drivers.forEach(function (driver) {
            var row = document.createElement("tr");
            row.innerHTML = "\n        <td>".concat(driver.id, "</td>\n        <td>").concat(driver.name, "</td>\n        <td>").concat(driver.licenseNumber, "</td>\n        <td>").concat(driver.phone, "</td>\n        <td>").concat(driver.email, "</td>\n        <td>").concat(driver.status, "</td>\n        <td>\n          <button class=\"btn btn-warning btn-sm edit-btn\">Edit</button>\n          <button class=\"btn btn-danger btn-sm delete-btn\">Delete</button>\n        </td>\n      ");
            // Add event listeners for edit and delete
            var editBtn = row.querySelector(".edit-btn");
            var deleteBtn = row.querySelector(".delete-btn");
            editBtn.addEventListener("click", function () { return editDriver(row, driver); });
            deleteBtn.addEventListener("click", function () { return deleteDriver(row, driver.id); });
            driverTableBody.appendChild(row);
        });
    };
    // Add or update a driver
    driverForm.addEventListener("submit", function (event) {
        event.preventDefault();
        var formData = new FormData(driverForm);
        var driver = {
            id: formData.get("driverID"),
            name: formData.get("driverName"),
            licenseNumber: formData.get("licenseNumber"),
            phone: formData.get("driverPhone"),
            email: formData.get("driverEmail"),
            status: formData.get("driverStatus"),
        };
        if (isEditing && editingRow) {
            // Update existing driver
            var index = drivers.findIndex(function (d) { return d.id === driver.id; });
            drivers[index] = driver;
        }
        else {
            // Add new driver
            drivers.push(driver);
        }
        populateTable();
        hideDriverForm();
    });
    // Edit a driver
    var editDriver = function (row, driver) {
        isEditing = true;
        editingRow = row;
        driverForm["driverID"].value = driver.id;
        driverForm["driverName"].value = driver.name;
        driverForm["licenseNumber"].value = driver.licenseNumber;
        driverForm["driverPhone"].value = driver.phone;
        driverForm["driverEmail"].value = driver.email;
        driverForm["driverStatus"].value = driver.status;
        showDriverForm();
    };
    // Delete a driver
    var deleteDriver = function (row, driverId) {
        var index = drivers.findIndex(function (driver) { return driver.id === driverId; });
        if (index !== -1) {
            drivers.splice(index, 1);
            row.remove();
        }
    };
    // Event listeners
    addDriverBtn.addEventListener("click", showDriverForm);
    cancelFormBtn.addEventListener("click", hideDriverForm);
});
