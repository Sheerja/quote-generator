const tasklist = document.getElementById("list");
const addbtn = document.getElementById("addbtn");
const textbox = document.getElementById("inputbox");

let tasks = [];
let editindex = -1;

// Add task when button is clicked
addbtn.addEventListener("click", addTask);

// Add task when Enter key is pressed
textbox.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});

function addTask() {
    let task = textbox.value.trim();

    if (task === "") {
        return;
    }

    if (editindex === -1) {

        // Prevent duplicate tasks (case-insensitive)
        if (tasks.some(t => t.toLowerCase() === task.toLowerCase())) {
            alert("Task already exists!");
            return;
        }

        tasks.push(task);

    } else {

        tasks[editindex] = task;
        editindex = -1;
        addbtn.innerText = "Add Task";

    }

    displayTasks();
    textbox.value = "";
    textbox.focus();
}

function displayTasks() {

    tasklist.innerHTML = "";

    if (tasks.length === 0) {
        tasklist.innerHTML = "<p style='text-align:center;'>No tasks yet.</p>";
        return;
    }

    for (let i = 0; i < tasks.length; i++) {

        tasklist.innerHTML += `
            <li>
                <span>${tasks[i]}</span>

                <div class="buttons">
                    <button class="editbtn" onclick="editTasks(${i})">Edit</button>
                    <button class="Deletebtn" onclick="deleteTasks(${i})">Delete</button>
                </div>
            </li>
        `;
    }
}

function deleteTasks(index) {

    tasks.splice(index, 1);

    displayTasks();
}

function editTasks(index) {

    textbox.value = tasks[index];
    textbox.focus();

    addbtn.innerText = "Save";
    editindex = index;
}

// Display empty message when page loads
displayTasks();