var selectedRow = null;

// Show Alerts
function showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;

    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector("main");
    container.insertBefore(div, main);

    setTimeout(() => document.querySelector(".alert").remove(), 3000);
}

// Clear All Fields
function clearFields() {
    document.querySelector("#Nama").value = "";
    document.querySelector("#Kelas").value = "";
    document.querySelector("#NPM").value = "";
}

// Save Data to Local Storage
function saveDataToLocalStorage(Nama, Kelas, NPM) {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    students.push({ Nama, Kelas, NPM });
    localStorage.setItem("students", JSON.stringify(students));
}

// Load Data from Local Storage
function loadDataFromLocalStorage() {
    let students = JSON.parse(localStorage.getItem("students")) || [];

    const list = document.querySelector("#student-list");
    list.innerHTML = "";

    students.forEach((student) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${student.Nama}</td>
            <td>${student.Kelas}</td>
            <td>${student.NPM}</td>
            <td>
                <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
                <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
            `;
        list.appendChild(row);
    });
}

// Add Data
document.addEventListener("DOMContentLoaded", () => {
    loadDataFromLocalStorage();
});

document.querySelector("#student-form").addEventListener("submit", (e) => {
    e.preventDefault();

    // Get Form Values
    const Nama = document.querySelector("#Nama").value;
    const Kelas = document.querySelector("#Kelas").value;
    const NPM = document.querySelector("#NPM").value;

    // Validate
    if (Nama == "" || Kelas == "" || NPM == "") {
        showAlert("Please fill in all fields", "danger");
    } else {
        if (selectedRow == null) {
            const list = document.querySelector("#student-list");
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${Nama}</td>
                <td>${Kelas}</td>
                <td>${NPM}</td>
                <td>
                    <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
                    <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
                `;
            list.appendChild(row);
            showAlert("Student Added", "success");

            // Save to Local Storage
            saveDataToLocalStorage(Nama, Kelas, NPM);
        } else {
            selectedRow.children[0].textContent = Nama;
            selectedRow.children[1].textContent = Kelas;
            selectedRow.children[2].textContent = NPM;
            showAlert("Student Info Edited", "info");

            // Update Local Storage
            updateLocalStorage(selectedRow.rowIndex - 1, Nama, Kelas, NPM);
        }

        clearFields();
    }
});

// Update Local Storage
function updateLocalStorage(index, Nama, Kelas, NPM) {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    students[index] = { Nama, Kelas, NPM };
    localStorage.setItem("students", JSON.stringify(students));
    showAlert("Student Data Edited", "success");
}

// Delete Data
document.querySelector("#student-list").addEventListener("click", (e) => {
    target = e.target;
    if (target.classList.contains("delete")) {
        const rowIndex = target.parentElement.parentElement.rowIndex - 1;
        target.parentElement.parentElement.remove();
        showAlert("Student Data Deleted", "danger");

        // Remove from Local Storage
        removeFromLocalStorage(rowIndex);
    }
});

// Edit Data
document.querySelector("#student-list").addEventListener("click", (e) => {
    target = e.target;
    if (target.classList.contains("edit")) {
        // Find the selected row
        selectedRow = target.parentElement.parentElement;

        // Populate form fields with selected row data
        document.querySelector("#Nama").value = selectedRow.children[0].textContent;
        document.querySelector("#Kelas").value = selectedRow.children[1].textContent;
        document.querySelector("#NPM").value = selectedRow.children[2].textContent;
    } else if (target.classList.contains("delete")) {
        // ... (previous code)
    }
});

// Remove from Local Storage
function removeFromLocalStorage(index) {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
}