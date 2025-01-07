let form = document.getElementById("myForm"),
    imgInput = document.querySelector(".img"),
    file = document.getElementById("imgInput"),
    userName = document.getElementById("name"),
    city = document.getElementById("city"),
    email = document.getElementById("email"),
    phone = document.getElementById("phone"),
    post = document.getElementById("post"),
    sDate = document.getElementById("sDate"),
    eDate = document.getElementById("eDate"), // Expiry Date
    submitBtn = document.querySelector(".submit"),
    userInfo = document.getElementById("data"),
    modal = document.getElementById("userForm"),
    modalTitle = document.querySelector("#userForm .modal-title"),
    newUserBtn = document.querySelector(".newUser");

let getData = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : [];

let isEdit = false, editId;
showInfo();

newUserBtn.addEventListener('click', () => {
    submitBtn.innerText = 'Submit',
    modalTitle.innerText = "Fill the Form";
    isEdit = false;
    imgInput.src = "./image/Profile Icon.webp";
    form.reset();
});

file.onchange = function () {
    if (file.files[0].size < 1000000) {  // 1MB = 1000000
        var fileReader = new FileReader();

        fileReader.onload = function (e) {
            imgUrl = e.target.result;
            imgInput.src = imgUrl;
        }

        fileReader.readAsDataURL(file.files[0]);
    } else {
        alert("This file is too large!");
    }
}

function showInfo() {
    document.querySelectorAll('.employeeDetails').forEach(info => info.remove());
    getData.forEach((element, index) => {
        let createElement = `<tr class="employeeDetails">
            <td>${index + 1}</td>
            <td><img src="${element.picture}" alt="" width="50" height="50"></td>
            <td>${element.employeeName}</td>
            <td>${element.employeeCity}</td>
            <td>${element.employeeEmail}</td>
            <td>${element.employeePhone}</td>
            <td>${element.employeePost}</td>
            <td>${element.startDate}</td>
            <td>${element.expireDate}</td> <!-- Expiry Date Column -->
            <td> <!-- Action Column -->
                <button class="btn btn-success" onclick="readInfo('${element.picture}', '${element.employeeName}', '${element.employeeCity}', '${element.employeeEmail}', '${element.employeePhone}', '${element.employeePost}', '${element.startDate}', '${element.expireDate}')" data-bs-toggle="modal" data-bs-target="#readData"><i class="bi bi-eye"></i></button>

                <button class="btn btn-primary" onclick="editInfo(${index}, '${element.picture}', '${element.employeeName}', '${element.employeeCity}', '${element.employeeEmail}', '${element.employeePhone}', '${element.employeePost}', '${element.startDate}', '${element.expireDate}')" data-bs-toggle="modal" data-bs-target="#userForm"><i class="bi bi-pencil-square"></i></button>

                <button class="btn btn-danger" onclick="deleteInfo(${index})"><i class="bi bi-trash"></i></button>
            </td> 
        </tr>`;
        userInfo.insertAdjacentHTML('beforeend', createElement);
    });
}

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const information = {
        picture: imgInput.src == undefined ? "./image/Profile Icon.webp" : imgInput.src,
        employeeName: userName.value,
        employeeCity: city.value,
        employeeEmail: email.value,
        employeePhone: phone.value,
        employeePost: post.value,
        startDate: sDate.value,
        expireDate: eDate.value // Expiry Date
    };

    if (isEdit) {
        getData.splice(editId, 1, information);
    } else {
        getData.push(information);
    }
    localStorage.setItem("userProfile", JSON.stringify(getData));
    showInfo();
    document.querySelector("#userForm .btn-close").click();
});

function readInfo(picture, name, city, email, phone, post, sDate, eDate) {
    document.querySelector('.showImg').src = picture;
    document.getElementById('showName').value = name;
    document.getElementById('showCity').value = city;
    document.getElementById('showEmail').value = email;
    document.getElementById('showPhone').value = phone;
    document.getElementById('showPost').value = post;
    document.getElementById('showsDate').value = sDate;
    document.getElementById('showExpireDate').value = eDate; // Expiry Date
}

function editInfo(id, picture, name, city, email, phone, post, sDate, eDate) {
    imgInput.src = picture;
    userName.value = name;
    city.value = city;
    email.value = email;
    phone.value = phone;
    post.value = post;
    sDate.value = sDate;
    eDate.value = eDate; // Expiry Date

    editId = id;
    isEdit = true;
    submitBtn.innerText = "Update";
    modalTitle.innerText = "Edit the Form";
}

function deleteInfo(index) {
    // Show a confirmation dialog
    const isConfirmed = confirm("Are you sure you want to delete this record?");
    
    // If the user confirms, proceed with deletion
    if (isConfirmed) {
        getData.splice(index, 1);
        localStorage.setItem("userProfile", JSON.stringify(getData));
        showInfo();
    }
    // If the user cancels, do nothing
}
