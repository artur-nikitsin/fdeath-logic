window.onload = function () {


    /*app theme*/

    let installTheme = () => {

        let currentTheme = JSON.parse(localStorage.getItem('theme'));

        if (currentTheme === "appThemeBlack") {
            document.getElementById("appBody").setAttribute("class", "darkBody")
        }

        if (currentTheme === "appThemeWhite") {
            document.getElementById("appBody").setAttribute("class", "whiteBody")
        }
    };

    installTheme();

    document.getElementById("appThemeWhite").addEventListener("click", setAppTheme, true);
    document.getElementById("appThemeBlack").addEventListener("click", setAppTheme, true);


    function setAppTheme(e) {

        let checkedTheme = e.target.getAttribute("id");

        if (checkedTheme === "appThemeWhite") {
            document.getElementById("appThemeWhite").checked = true;
            document.getElementById("appBody").setAttribute("class", "whiteBody")
            localStorage.setItem('theme', JSON.stringify(checkedTheme));
        }
        ;
        if (checkedTheme === "appThemeBlack") {
            document.getElementById("appThemeBlack").checked = true;
            document.getElementById("appBody").setAttribute("class", "darkBody")
            localStorage.setItem('theme', JSON.stringify(checkedTheme));
        }

    };


    /*check localStorage and rendering tasks*/

    let tasks = [];
    let tasksIdCounter = 0;


    if (localStorage.getItem('tasks')) {
        tasks = JSON.parse(localStorage.getItem('tasks'));
        tasksIdCounter = JSON.parse(localStorage.getItem('tasksIdCounter'));
    } else {
        tasks = [];
        tasksIdCounter = 0;
    }

    renderTasks(tasks);
    taskCounter(tasks);

    /*add task*/

    document.getElementById("openAddTaskModal").addEventListener("click", putListener, true);

    function putListener() {

        let checkedPriorityRadio = document.querySelector("input[name=gridRadios]:checked");
        if (checkedPriorityRadio) {
            checkedPriorityRadio.checked = false
        }

        let checkedColorRadio = document.querySelector("input[name=gridRadiosColor]:checked");
        if (checkedColorRadio) {
            checkedColorRadio.checked = false
        }

        document.getElementById("inputTitle").value = "";
        document.getElementById("inputText").value = "";
        document.getElementById("addTaskButton").innerText = "Add task";
        document.getElementById("exampleModalLabel").innerText = "Add task";
        document.getElementById("addTaskButton").addEventListener("click", pullData, true);

    };


    function pullData(e) {

        e.preventDefault();

        let task = {};
        let currentDate = new Date();
        let minutes = currentDate.getMinutes() <= 9 ? ("0" + currentDate.getMinutes()) : currentDate.getMinutes();

        task.title = document.getElementById("inputTitle").value;
        task.text = document.getElementById("inputText").value;
        task.color = document.querySelector("input[name=gridRadiosColor]:checked").value;
        task.priority = document.querySelector("input[name=gridRadios]:checked").value;
        task.timeOfCreate = +new Date();
        task.timeOfCreateString = currentDate.getHours() + ":" + minutes + " " + "0" +
            currentDate.getDay() + "." + "0" + (currentDate.getMonth() + 1) + "." + currentDate.getFullYear();

        task.completed = false;
        task.id = "task-" + (tasksIdCounter + 1);
        tasks.push(task);

        localStorage.setItem('tasks', JSON.stringify(tasks));
        localStorage.setItem('tasksIdCounter', JSON.stringify(tasksIdCounter + 1));

        renderTasks(tasks);
        addEditButtons();
        document.getElementById("addTaskButton").removeEventListener("click", pullData, true);


    }

    /*   delete all tasks*/

    document.getElementById("deleteAllTasksButton").addEventListener("click", deleteAllTasks, true);

    function deleteAllTasks() {

        localStorage.clear();
        document.location.reload(true);

    };


    /*add edit buttons listeners*/

    let addEditButtons = () => {

        let editButtons = document.querySelectorAll(".editTaskButton");

        for (let i = 0; i < editButtons.length; i++) {
            editButtons[i].addEventListener("click", changeTask, true)
        }
    };

    addEditButtons();


    /*change task*/

    function changeTask(e) {

        let currentId = e.target.getAttribute("id");
        let buttonType = e.target.getAttribute("value");


        /*    - complete Task*/

        if (buttonType === "complete") {
            tasks.forEach(function (item, i, arr) {

                if (item.id + "-complete" === currentId) {
                    tasks[i].completed = true;
                }
            })

            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks(tasks);
        }

        /*    -delete Task*/

        if (buttonType === "delete") {
            tasks.forEach(function (item, i, arr) {

                if (item.id + "-delete" === currentId) {
                    tasks.splice(i, 1);
                }
            })

            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks(tasks);
        }

        /*    -edit Task*/
        if (buttonType === "edit") {
            document.getElementById("addTaskButton").innerText = "Edit task";
            document.getElementById("exampleModalLabel").innerText = "Edit task";
            document.getElementById("addTaskButton").addEventListener("click", changeData, true);

            let currentEditTask = null;

            tasks.forEach(function (item, i, arr) {

                if (item.id + "-edit" === currentId) {
                    document.getElementById("inputTitle").value = item.title;
                    document.getElementById("inputText").value = item.text;
                    document.getElementById(item.priority).checked = true;
                    document.getElementById(item.color).checked = true;
                    currentEditTask = i;
                }
            });

            function changeData() {

                tasks[currentEditTask].title = document.getElementById("inputTitle").value;
                tasks[currentEditTask].text = document.getElementById("inputText").value;
                tasks[currentEditTask].priority = document.querySelector("input[name=gridRadios]:checked").value;
                tasks[currentEditTask].color = document.querySelector("input[name=gridRadiosColor]:checked").value;

                localStorage.setItem('tasks', JSON.stringify(tasks));
                renderTasks(tasks);
                document.getElementById("addTaskButton").removeEventListener("click", changeData, true);
            };

        }

        addEditButtons();

    }

    /*sort tasks*/

    /*sort up*/
    document.getElementById("sortUpButton").addEventListener("click", sortUp, true);

    function sortUp() {

        let sorted = tasks.sort(function (a, b) {
            return a.timeOfCreate - b.timeOfCreate
        })

        localStorage.setItem('tasks', JSON.stringify(sorted));
        renderTasks(tasks);
        addEditButtons();
    }

    /*sort down*/

    document.getElementById("sortDownButton").addEventListener("click", sortDown, true);

    function sortDown() {

        let sorted = tasks.sort(function (a, b) {
            return b.timeOfCreate - a.timeOfCreate
        })

        localStorage.setItem('tasks', JSON.stringify(sorted));
        renderTasks(tasks);
        addEditButtons();
    }
};


/*tasks Counter*/

function taskCounter(tasks) {

    let tasksCount = 0;
    let completedTasksCount = 0;

    tasks.forEach(function (item, i) {

        if (item.completed) {
            completedTasksCount++
        }
    })

    tasksCount = (tasks.length - completedTasksCount) > 0 ? tasks.length - completedTasksCount : 0;

    document.getElementById("toDoHeader").innerText = "ToDo (" + tasksCount + ")";
    document.getElementById("completedHeader").innerText = "Comleted (" + completedTasksCount + ")";
};


let renderTasks = (tasks) => {

    let tasksCompleted = [];
    let tasksInProgress = [];

    tasks.forEach(function (item, i, arr) {

        let editMenu = item.completed ?

            `<div class="dropdown m-2 dropleft">
                <button class="btn btn-secondary h-100" type="button" id="dropdownMenuItem1" 
                data-toggle="dropdown\" aria-haspopup="true" aria-expanded="false">
                    <i class="fas fa-ellipsis-v" aria-hidden="true"></i>
                </button>
                <div class="dropdown-menu p-2 flex-column" aria-labelledby="dropdownMenuItem1">
                    <button value="delete" type="button" class="btn btn-danger w-100  editTaskButton" 
                    id= ${item.id + "-delete"} >Delete</button> 
                </div>
            </div>`

            :

            `<div class="dropdown m-2 dropleft">

                <button class="btn btn-secondary h-100" type="button" id="dropdownMenuItem1"
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="fas fa-ellipsis-v" aria-hidden="true"></i>
                </button>
                
                <div class="dropdown-menu p-2 flex-column" aria-labelledby="dropdownMenuItem1">
                
                    <button  value="complete" type="button" class="btn btn-success w-100  editTaskButton" 
                    id=${item.id + "-complete"}> Complete</button>
                    
                    <button value="edit" type="button" class="btn btn-info w-100 my-2  editTaskButton" 
                    id=${item.id + "-edit"}  + " data-toggle="modal"  data-target="#exampleModal">Edit</button>
                    
                    <button value="delete" type="button" class="btn btn-danger w-100  editTaskButton" 
                    id=${item.id + "-delete"}>Delete</button>
                
                </div>
            </div>`;


        let currentTask =
            `<li class="list-group-item d-flex w-100 mb-2 ${item.color}">
                <div class="w-100 mr-2">
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">  ${item.title}  </h5>
                             <div>
                                <small class="mr-2">  ${item.priority + " priority"}</small>
                                <small>  ${item.timeOfCreateString}  </small>
                            </div>
                    </div>
                <p class="mb-1 w-100">  ${item.text} </p>
                </div>
                ${editMenu}
            </li>`;

        if (item.completed === true) {
            tasksCompleted.push(currentTask);
        } else
            tasksInProgress.push(currentTask);
    })

    document.getElementById("currentTasks").innerHTML = tasksInProgress.join("");
    document.getElementById("completedTasks").innerHTML = tasksCompleted.join("");
    taskCounter(tasks);

};
