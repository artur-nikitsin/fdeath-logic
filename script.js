window.onload = function () {


    let tasks = [];

    if (localStorage.getItem('tasks')) {
        tasks = JSON.parse(localStorage.getItem('tasks'));

        console.log(tasks);

    } else {

        tasks = [];

        console.log("а там нет ниче");
    }

    renderTasks(tasks);

    document.getElementById("addTaskButton").addEventListener("click", pullData, true);


    function pullData(e) {
        e.preventDefault();

        let task = {};

        task.title = document.getElementById("inputTitle").value;

        task.text = document.getElementById("inputText").value;

        task.priority = document.querySelector("input[name=gridRadios]:checked").value;

        let currentDate = new Date();

        task.timeOfCreate = [currentDate.getHours(), currentDate.getMinutes(), currentDate.getDay(), currentDate.getMonth() + 1, currentDate.getFullYear()];


        task.timeOfCreateString = currentDate.getHours() + ":" + currentDate.getMinutes() + " " + "0" + currentDate.getDay() + "." + "0" + (currentDate.getMonth() + 1) + "." + currentDate.getFullYear();

        task.completed = false;

        tasks.push(task)

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }



};


let renderTasks = (tasks) => {


    let tasksInProgress = tasks.map(function (item, i, arr) {


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
            "<div class=\"dropdown m-2 dropleft\">" +
            "<button class=\"btn btn-secondary h-100\" type=\"button\" id=\"dropdownMenuItem1\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">" +
            "<i class=\"fas fa-ellipsis-v\" aria-hidden=\"true\"></i>" +
            "</button>" +
            "<div class=\"dropdown-menu p-2 flex-column\" aria-labelledby=\"dropdownMenuItem1\">" +
            "<button type=\"button\" class=\"btn btn-success w-100\">Complete</button>" +
            "<button type=\"button\" class=\"btn btn-info w-100 my-2\">Edit</button>" +
            "<button type=\"button\" class=\"btn btn-danger w-100\">Delete</button>" +
            "</div>" +
            "</div>" +
            "</li>";


        return currentTask;


    })


    document.getElementById("currentTasks").innerHTML = tasksInProgress.join("");

}


