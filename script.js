window.onload = function () {


    /*check localStorage and rendering tasks*/

    let tasks = [];
    let tasksIdCounter = 0;

    if (localStorage.getItem('tasks')) {
        tasks = JSON.parse(localStorage.getItem('tasks'));
        tasksIdCounter = JSON.parse(localStorage.getItem('tasksIdCounter'));

        console.log(tasks);

    } else {

        tasks = [];
        tasksIdCounter = 0;
        console.log("а там нет ниче");
    }

    renderTasks(tasks);


    /*add task*/

    document.getElementById("addTaskButton").addEventListener("click", pullData, true);


    function pullData(e) {

        /* e.preventDefault();*/
        console.log("clear");
        let task = {};

        task.title = document.getElementById("inputTitle").value;
        task.text = document.getElementById("inputText").value;
        task.priority = document.querySelector("input[name=gridRadios]:checked").value;

        let currentDate = new Date();

        task.timeOfCreate = [currentDate.getHours(), currentDate.getMinutes(), currentDate.getDay(),
            currentDate.getMonth() + 1, currentDate.getFullYear()];

        task.timeOfCreateString = currentDate.getHours() + ":" + currentDate.getMinutes() + " " + "0" +
            currentDate.getDay() + "." + "0" + (currentDate.getMonth() + 1) + "." + currentDate.getFullYear();

        task.completed = false;

        task.id = "task-" + (tasksIdCounter + 1);

        tasks.push(task)

        localStorage.setItem('tasks', JSON.stringify(tasks));
        localStorage.setItem('tasksIdCounter', JSON.stringify(tasksIdCounter + 1));

        document.getElementById("addTaskButton").removeEventListener("click", pullData, true);
    }

    /*   delete all tasks*/

    document.getElementById("deleteAllTasksButton").addEventListener("click", deleteAllTasks, true);

    function deleteAllTasks() {
        console.log("clear");
        localStorage.clear();
        document.location.reload(true);

    };


    /*change task*/


    let editButtons = document.getElementsByClassName("editTaskButton");

    for (let i = 0; i <= editButtons.length; i++) {
        editButtons[i].addEventListener("click", changeTask, true)

    }


    function changeTask(e) {

        let currentId = e.target.getAttribute("id");
        let buttonType = e.target.getAttribute("value");

        /*    complete Task*/
        if (buttonType === "complete") {
            console.log(buttonType);

            tasks.forEach(function (item, i, arr) {
                if (item.id + "-complete" === currentId) {

                    tasks[i].completed = true;
                }
            })

            console.log(tasks);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks(tasks);

        }


        /*    delete Task*/
        if (buttonType === "delete") {
            console.log(buttonType);

            tasks.forEach(function (item, i, arr) {
                if (item.id + "-delete" === currentId) {

                    tasks.splice(i, 1);
                }
            })

            console.log(tasks);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks(tasks);
        }

        /*    edit Task*/
        if (buttonType === "edit") {
            console.log(buttonType);

            tasks.forEach(function (item, i, arr) {
                if (item.id + "-edit" === currentId) {

                    tasks.splice(i, 1);
                    document.getElementById("inputTitle").value = item.title;
                    document.getElementById("inputText").value = item.text;
                    document.getElementById(item.priority).checked = true;

                }
            })
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks(tasks);
        }

    }

    /*sort tasks*/









};


let renderTasks = (tasks) => {

    let tasksCompleted = [];
    let tasksInProgress = [];

    tasks.forEach(function (item, i, arr) {


        let editMenu = item.completed ? "" : "<div class=\"dropdown m-2 dropleft\">" +
            "<button class=\"btn btn-secondary h-100\" type=\"button\" id=\"dropdownMenuItem1\" " +
            "data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">" +
            "<i class=\"fas fa-ellipsis-v\" aria-hidden=\"true\"></i>" +
            "</button>" +
            "<div class=\"dropdown-menu p-2 flex-column\" aria-labelledby=\"dropdownMenuItem1\">" +
            "<button  value=\"complete\" type=\"button\" class=\"btn btn-success w-100  editTaskButton\" " +
            "id=" + item.id + "-complete" + ">Complete</button>" +
            "<button value=\"edit\" type=\"button\" class=\"btn btn-info w-100 my-2  editTaskButton\" " +
            "id=" + item.id + "-edit" + " data-toggle=\"modal\"  data-target=\"#exampleModal\">Edit</button>" +
            "<button value=\"delete\" type=\"button\" class=\"btn btn-danger w-100  editTaskButton\" " +
            "id=" + item.id + "-delete" + ">Delete</button>" +
            "</div>" +
            "</div>";


        let currentTask = "<li class=\"list-group-item d-flex w-100 mb-2\">" +
            "<div class=\"w-100 mr-2\">" +
            "<div class=\"d-flex w-100 justify-content-between\">" +
            "<h5 class=\"mb-1\">" + item.title + "</h5>" +
            " <div>" +

            "<small class=\"mr-2\">" + item.priority + " priority" + "</small>" +
            "<small>" + item.timeOfCreateString + "</small>" +
            "</div>" +

            "</div>" +
            "<p class=\"mb-1 w-100\">" + item.text + "</p>" +
            "</div>" +
            editMenu +
            "</li>";


        if (item.completed === true) {
            tasksCompleted.push(currentTask);
        } else
            tasksInProgress.push(currentTask);
    })

    document.getElementById("currentTasks").innerHTML = tasksInProgress.join("");
    document.getElementById("completedTasks").innerHTML = tasksCompleted.join("");
}






