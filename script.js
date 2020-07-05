window.onload = function () {

    let appState = null;


    const getAppState = () => {
        appState = JSON.parse(localStorage.getItem('appState'));
        appState = appState ? appState : "signed-out"
        setAppState(appState);
    }

    const setAppState = (newAppState) => {
        localStorage.setItem('appState', JSON.stringify(newAppState));
    }

    getAppState();


    const checkAppState = (state) => {

        switch (state) {
            case "signed-in":
                document.getElementById("openSignUserModal").classList.add("hideSignButton");
                document.getElementById("signOutButton").classList.remove("hideSignButton");


                document.getElementById("sortUpButton").classList.remove("hideTaskList");
                document.getElementById("sortDownButton").classList.remove("hideTaskList");

                document.getElementById("openAddTaskModal").classList.remove("hideTaskList")
                document.getElementById("dropdownMenuSettings").classList.remove("hideTaskList")

                document.getElementById("toDoHeader").classList.remove("hideTaskList")
                document.getElementById("completedHeader").classList.remove("hideTaskList")

                document.getElementById("currentTasks").classList.remove("hideTaskList")
                document.getElementById("completedTasks").classList.remove("hideTaskList")
                break

            case "signed-out":

                document.getElementById("openSignUserModal").classList.remove("hideSignButton");
                document.getElementById("signOutButton").classList.add("hideSignButton");


                document.getElementById("sortUpButton").classList.add("hideTaskList");
                document.getElementById("sortDownButton").classList.add("hideTaskList");

                document.getElementById("openAddTaskModal").classList.add("hideTaskList")
                document.getElementById("dropdownMenuSettings").classList.add("hideTaskList")

                document.getElementById("toDoHeader").classList.add("hideTaskList")
                document.getElementById("completedHeader").classList.add("hideTaskList")

                document.getElementById("currentTasks").classList.add("hideTaskList")
                document.getElementById("completedTasks").classList.add("hideTaskList")
                break
        }

    };

    checkAppState(appState);

    const signOut = () => {
        setAppState("signed-out");
        getAppState();
        document.location.reload(true);
    }

    document.getElementById("signOutButton").addEventListener("click", signOut, false)


    /*app theme*/

    let installTheme = (checked) => {

        let currentTheme = checked ? checked : JSON.parse(localStorage.getItem('theme'));

        switch (currentTheme) {
            case "appThemeBlack":
                document.getElementById("appBody").setAttribute("class", "darkBody")
                document.getElementById("appThemeWhite").classList.remove("active");
                document.getElementById("appThemeBlack").classList.add("active");
                localStorage.setItem('theme', JSON.stringify(currentTheme));
                break
            case "appThemeWhite":
                document.getElementById("appBody").setAttribute("class", "whiteBody")
                document.getElementById("appThemeBlack").classList.remove("active");
                document.getElementById("appThemeWhite").classList.add("active");
                localStorage.setItem('theme', JSON.stringify(currentTheme));
                break
        }
    };

    installTheme();

    document.getElementsByClassName("themes-toggle")[0].addEventListener("click", setAppTheme, true);

    function setAppTheme(e) {
        let checkedTheme = e.target.getAttribute("id");
        installTheme(checkedTheme);
    };


    /* Users*/


    let allUsers = [];

    const getUsersFromLocalStorage = () => {
        if (localStorage.getItem('allUsers')) {
            allUsers = JSON.parse(localStorage.getItem('allUsers'));
        } else {
            allUsers = [];
        }
    };

    getUsersFromLocalStorage();

    const setUsersToLocalStorage = (renewUsers) => {
        localStorage.setItem('allUsers', JSON.stringify(renewUsers));
    }


    /* sign in/out users*/


    document.getElementById("openSignUserModal").addEventListener("click", putSignUserListeners, true);


    function putSignUserListeners() {
        document.getElementById("registerUserCollapseInputs").classList.remove("show");

        let checkedGenderRadio = document.querySelector("input[name=gridRadiosGender]:checked");
        if (checkedGenderRadio) {
            checkedGenderRadio.checked = false
        }


        document.getElementById("inputSignLogin").value = ""
        document.getElementById("inputSignPassword").value = ""
        document.getElementById("inputSignName").value = ""
        document.getElementById("inputSignSurname").value = ""
        document.getElementById("inputSignDateOfBirth").value = ""

        document.querySelector("#getUserGenderFemale").classList.remove("is-invalid");
        document.querySelector("#getUserGenderMale").classList.remove("is-invalid");
        document.querySelector("#getUserGenderFemale").classList.remove("is-valid");
        document.querySelector("#getUserGenderMale").classList.remove("is-valid");

        document.querySelector("#addUserButton").innerText = "Sign in";
        document.querySelector("#signModalLabel").innerText = "Sign in";
        document.querySelector("#registerNewUser").innerText = "or register";

        [].forEach.call(formInputs, function (input) {
            input.classList.remove("is-invalid");
            input.classList.remove("is-valid");
        });
    };


    let formInputs = document.getElementsByClassName("form-control");

    function deleteInputWarnings() {
        this.classList.remove("is-invalid");
        this.classList.remove("is-valid");
    }


    function clearAllInputsWarnings() {
        [].forEach.call(formInputs, function (input) {
            input.addEventListener("input", deleteInputWarnings, false)
        });
    }

    clearAllInputsWarnings()


    document.getElementById("addUserButton").addEventListener("click", addUser, true);

    function checkModalMode(e) {
        let collapsed = document.getElementById("registerUserCollapseInputs").classList.contains("show");
        return collapsed ? "registration" : "sign";
    };


    document.querySelector("#registerNewUser").addEventListener("click", changeSubmitButton)


    function changeSubmitButton() {

        let changebleSignButton = document.querySelector("#addUserButton");
        let changebleSignOrRegisterButton = document.querySelector("#registerNewUser");
        let signModalHeader = document.querySelector("#signModalLabel");

        if (changebleSignButton.textContent === "Sign in") {
            signModalHeader.innerText = "Register";
            changebleSignButton.innerText = "Register";
            changebleSignOrRegisterButton.innerText = "or sign";
        } else {
            signModalHeader.innerText = "Sign in";
            changebleSignButton.innerText = "Sign in";
            changebleSignOrRegisterButton.innerText = "or register";
        }

        [].forEach.call(formInputs, function (input) {
            input.classList.remove("is-invalid");
            input.classList.remove("is-valid");
        });

        document.querySelector("#getUserGenderFemale").classList.remove("is-invalid");
        document.querySelector("#getUserGenderMale").classList.remove("is-invalid");
        document.querySelector("#getUserGenderFemale").classList.remove("is-valid");
        document.querySelector("#getUserGenderMale").classList.remove("is-valid");
    }


    function addUser(e) {

        let signModalState = checkModalMode();

        switch (signModalState) {

            case "sign":
                e.preventDefault();

                let signingUser = {};

                signingUser.login = document.getElementById("inputSignLogin").value;
                signingUser.password = document.getElementById("inputSignPassword").value;

                getUsersFromLocalStorage();

                let coincidingUser = null;
                let coincidingUserPosition = 0;
                allUsers.forEach(function (item, i) {
                    if (signingUser.login === item.login) {
                        coincidingUser = item;
                        coincidingUserPosition = i;
                    }
                });


                if (coincidingUser) {
                    document.getElementById("inputSignLogin").classList.remove("is-invalid");
                    document.getElementById("inputSignLogin").classList.add("is-valid");

                    if (signingUser.password === coincidingUser.password) {
                        document.getElementById("inputSignPassword").classList.remove("is-invalid");
                        document.getElementById("inputSignPassword").classList.add("is-valid");
                        allUsers[coincidingUserPosition].isSigned = true;
                        setUsersToLocalStorage(allUsers);
                        setAppState("signed-in");
                        document.location.reload(true);
                    } else {
                        document.querySelector(".invalidPasswordWarning").innerText = "Please check the password.";
                        document.getElementById("inputSignPassword").classList.add("is-invalid");
                    }


                    if (!signingUser.password) {
                        document.querySelector(".invalidPasswordWarning").innerText = "Please enter password";
                        document.getElementById("inputSignPassword").classList.remove("is-valid");
                        document.getElementById("inputSignPassword").classList.add("is-invalid");
                    }


                } else {
                    document.querySelector(".invalidLoginWarning").innerText = "Login does not exist. Please check.";
                    document.getElementById("inputSignLogin").classList.remove("is-valid");
                    document.getElementById("inputSignLogin").classList.add("is-invalid");
                }

                if (!signingUser.login) {
                    document.querySelector(".invalidLoginWarning").innerText = "Please enter login";
                    document.getElementById("inputSignLogin").classList.remove("is-valid");
                    document.getElementById("inputSignLogin").classList.add("is-invalid");
                }

                break;

            case "registration":

                e.preventDefault();

                let registeringUser = {};
                registeringUser.login = document.getElementById("inputSignLogin").value;
                registeringUser.password = document.getElementById("inputSignPassword").value;
                registeringUser.name = document.getElementById("inputSignName").value;
                registeringUser.surname = document.getElementById("inputSignSurname").value;
                registeringUser.dateOfBirth = document.getElementById("inputSignDateOfBirth").value;

                if (document.querySelector("input[name=gridRadiosGender]:checked")) {
                    registeringUser.gender = document.querySelector("input[name=gridRadiosGender]:checked").value;
                }
                registeringUser.isSigned = false;

                getUsersFromLocalStorage();

                let duplicateUser = null;
                allUsers.forEach(function (item, i) {
                    if (registeringUser.login === item.login) {
                        duplicateUser = item;
                    }
                });

                let notDuplicate = false;
                let isLoginCorrect = false;
                let isLoginHasLength = false;
                let isPasswordDifficult = false;
                let isPasswordHasLength = false;
                let isNameCorrect = false;
                let isSurnameCorrect = false;
                let isDateOfBirthCorrect = false;
                let isGenderCorrect = false;


                if (duplicateUser) {
                    document.querySelector(".invalidLoginWarning").innerText = "Login already exist. Please create another.";
                    document.getElementById("inputSignLogin").classList.remove("is-valid");
                    document.getElementById("inputSignLogin").classList.add("is-invalid");
                    notDuplicate = false;
                } else {
                    document.getElementById("inputSignLogin").classList.add("is-valid");
                    notDuplicate = true
                }

                const regLogin = new RegExp('^[a-zA-Z][a-zA-Z0-9-_\\.]{1,20}$');

                if (!regLogin.test(registeringUser.login)) {
                    document.querySelector(".invalidLoginWarning").innerText = "Please use only latin letters and numbers, 2-20 symbols";
                    document.getElementById("inputSignLogin").classList.remove("is-valid");
                    document.getElementById("inputSignLogin").classList.add("is-invalid");
                    isLoginCorrect = false;
                } else {
                    document.getElementById("inputSignLogin").classList.add("is-valid");
                    isLoginCorrect = true;
                }


                if (!registeringUser.login.length) {
                    document.querySelector(".invalidLoginWarning").innerText = "Please enter login";
                    document.getElementById("inputSignLogin").classList.remove("is-valid");
                    document.getElementById("inputSignLogin").classList.add("is-invalid");
                    isLoginHasLength = false;
                } else {
                    document.getElementById("inputSignLogin").classList.add("is-valid");
                    isLoginHasLength = true;
                }


                const regPassword = new RegExp('(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$')

                if (!regPassword.test(registeringUser.password)) {
                    document.querySelector(".invalidPasswordWarning").innerText = "Please use only " +
                        "lowercase and uppercase Latin letters and numbers. At least 8 symbols";
                    document.getElementById("inputSignPassword").classList.remove("is-valid");
                    document.getElementById("inputSignPassword").classList.add("is-invalid");
                    isPasswordDifficult = false;
                } else {
                    document.getElementById("inputSignPassword").classList.add("is-valid");
                    isPasswordDifficult = true;
                }


                if (!registeringUser.password.length) {
                    document.querySelector(".invalidPasswordWarning").innerText = "Please enter password";
                    document.getElementById("inputSignPassword").classList.remove("is-valid");
                    document.getElementById("inputSignPassword").classList.add("is-invalid");
                    isPasswordHasLength = false;
                } else {
                    document.getElementById("inputSignPassword").classList.add("is-valid");
                    isPasswordHasLength = true;
                }


                if (!registeringUser.name.length) {
                    document.querySelector(".invalidUserName").innerText = "Please enter name";
                    document.getElementById("inputSignName").classList.remove("is-valid");
                    document.getElementById("inputSignName").classList.add("is-invalid");
                    isNameCorrect = false;
                } else {
                    document.getElementById("inputSignName").classList.add("is-valid");
                    isNameCorrect = true;
                }

                if (!registeringUser.surname.length) {
                    document.querySelector(".invalidUserSurname").innerText = "Please enter surname";
                    document.getElementById("inputSignSurname").classList.remove("is-valid");
                    document.getElementById("inputSignSurname").classList.add("is-invalid");
                    isSurnameCorrect = false;
                } else {
                    document.getElementById("inputSignSurname").classList.add("is-valid");
                    isSurnameCorrect = true;
                }


                if (!registeringUser.dateOfBirth.length) {
                    document.querySelector(".invalidDateOfBirth").innerText = "Please enter date of birth";
                    document.getElementById("inputSignDateOfBirth").classList.remove("is-valid");
                    document.getElementById("inputSignDateOfBirth").classList.add("is-invalid");
                    isDateOfBirthCorrect = false;
                } else {

                    const regDate = new RegExp('(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\\d\\d');

                    if (!regDate.test(registeringUser.dateOfBirth)) {
                        document.querySelector(".invalidDateOfBirth").innerText = "Please enter date in format: DD/MM/YYYY";
                        document.getElementById("inputSignDateOfBirth").classList.remove("is-valid");
                        document.getElementById("inputSignDateOfBirth").classList.add("is-invalid");
                        isDateOfBirthCorrect = false;
                    } else {
                        document.getElementById("inputSignDateOfBirth").classList.add("is-valid");
                        isDateOfBirthCorrect = true;
                    }

                }

                if (!registeringUser.gender) {
                    document.querySelector(".invalidUserGender").innerText = "Please chose gender";
                    document.querySelector("#getUserGenderFemale").classList.remove("is-valid");
                    document.querySelector("#getUserGenderFemale").classList.add("is-invalid");
                    document.querySelector("#getUserGenderMale").classList.remove("is-valid");
                    document.querySelector("#getUserGenderMale").classList.add("is-invalid");
                    isGenderCorrect = false;
                } else {
                    document.querySelector("#getUserGenderFemale").classList.remove("is-invalid");
                    document.querySelector("#getUserGenderFemale").classList.add("is-valid");
                    document.querySelector("#getUserGenderMale").classList.remove("is-invalid");
                    document.querySelector("#getUserGenderMale").classList.add("is-valid");
                    isGenderCorrect = true;
                }

                if (notDuplicate &&
                    isLoginCorrect &&
                    isLoginHasLength &&
                    isPasswordDifficult &&
                    isPasswordHasLength &&
                    isNameCorrect &&
                    isSurnameCorrect &&
                    isDateOfBirthCorrect &&
                    isGenderCorrect) {
                    allUsers.push(registeringUser);
                    setUsersToLocalStorage(allUsers);
                    document.location.reload(true);
                }

        }
    };


    /*add task form validation*/


    let forms = document.getElementsByClassName('needs-validation');
    let validatedForms = null
    let validation = Array.prototype.filter.call(forms, function (form) {
        form.addEventListener('submit', function (event) {
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
            validatedForms = form;
        }, false);
    });


    /*check localStorage and rendering tasks*/

    let tasks = [];

    const getTasksFromLocalStorage = () => {
        if (localStorage.getItem('tasks')) {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        } else {
            tasks = [];
        }
    };

    getTasksFromLocalStorage();
    renderTasks(tasks);
    taskCounter(tasks);


    /*add task*/

    document.getElementById("openAddTaskModal").addEventListener("click", putListener, true);

    function putListener() {

        let checkedPriorityRadio = document.querySelector("input[name=gridRadios]:checked");
        if (checkedPriorityRadio) {
            checkedPriorityRadio.checked = false
        }

        if (validatedForms) {
            validatedForms.classList.remove('was-validated');
        }

        document.getElementById("inputTitle").value = "";
        document.getElementById("inputText").value = "";
        document.getElementById("addTaskButton").innerText = "Add task";
        document.getElementById("exampleModalLabel").innerText = "Add task";
        document.getElementById("addTaskButton").addEventListener("click", pullData, true);

    };


    function pullData(e) {

        let tasksIdCounter = 0;

        if (localStorage.getItem('tasks')) {
            tasksIdCounter = JSON.parse(localStorage.getItem('tasksIdCounter'));
        } else {
            tasksIdCounter = 0;
        }

        let task = {};
        let currentDate = new Date();
        let minutes = currentDate.getMinutes() <= 9 ? ("0" + currentDate.getMinutes()) : currentDate.getMinutes();

        task.title = document.getElementById("inputTitle").value;
        task.text = document.getElementById("inputText").value;
        task.priority = document.querySelector("input[name=gridRadios]:checked").value;
        task.position = "in-progress"
        task.timeOfCreate = +new Date();
        task.timeOfCreateString = currentDate.getHours() + ":" + minutes + " " + "0" +
            currentDate.getDay() + "." + "0" + (currentDate.getMonth() + 1) + "." + currentDate.getFullYear();

        task.completed = false;
        task.id = "task-" + (tasksIdCounter + 1);

        if (task.title.length && task.text.length && task.priority.length) {
            tasks.push(task);

            localStorage.setItem('tasks', JSON.stringify(tasks));
            localStorage.setItem('tasksIdCounter', JSON.stringify(tasksIdCounter + 1));

            getTasksFromLocalStorage();
            renderTasks(tasks);
            document.getElementById("addTaskButton").removeEventListener("click", pullData, true);
        }


    }

    /*   delete all tasks*/

    document.getElementById("deleteAllTasksButton").addEventListener("click", deleteAllTasks, true);

    function deleteAllTasks() {

        localStorage.clear();
        document.location.reload(true);

    };


    /*add edit task listeners*/

    document.querySelector("#currentTasks").addEventListener("click", changeTask, true);
    document.querySelector("#completedTasks").addEventListener("click", changeTask, true);


    /*change task*/

    function changeTask(e) {

        let currentId = e.target.getAttribute("id");
        let buttonType = e.target.getAttribute("value");

        /*    - complete Task*/

        if (buttonType === "complete") {
            getTasksFromLocalStorage();
            tasks.forEach(function (item, i, arr) {

                if (item.id + "-complete" === currentId) {
                    tasks[i].completed = true;
                    tasks[i].position = "in-completed";
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
                    /* document.getElementById(item.color).checked = true;*/
                    currentEditTask = i;
                }
            });

            function changeData() {

                tasks[currentEditTask].title = document.getElementById("inputTitle").value;
                tasks[currentEditTask].text = document.getElementById("inputText").value;
                tasks[currentEditTask].priority = document.querySelector("input[name=gridRadios]:checked").value;

                localStorage.setItem('tasks', JSON.stringify(tasks));
                renderTasks(tasks);
                document.getElementById("addTaskButton").removeEventListener("click", changeData, true);
            };

        }

    }


    /* Drag’n’Drop*/
    let dragableTask = null;
    let newTasksArea = null;

    function addDragDropListeners() {

        let dragableTasks = document.querySelectorAll(".list-group-item");

        [].forEach.call(dragableTasks, function (task) {
            task.addEventListener('dragstart', handleDragStart, false);
            task.addEventListener('dragenter', handleDragEnterItem, false);
            task.addEventListener('dragover', handleDragOverItem, false);
            task.addEventListener('dragleave', handleDragLeaveItem, false);
            task.addEventListener('drop', handleDragDrop, false);
        });

        let completedTasksArea = document.querySelector("#completedTasks");
        completedTasksArea.addEventListener('dragenter', handleDragEnter, false);
        completedTasksArea.addEventListener('dragover', handleDragOver, false);
        completedTasksArea.addEventListener('drop', handleDragDrop, false);


        let inProgressTaskArea = document.querySelector("#currentTasks");
        inProgressTaskArea.addEventListener('dragenter', handleDragEnter, false);
        inProgressTaskArea.addEventListener('dragover', handleDragOver, false);
        inProgressTaskArea.addEventListener('drop', handleDragDrop, false);


    };


    addDragDropListeners();

    function handleDragStart(e) {
        dragableTask = this.getAttribute("id");
    }


    function handleDragOver(e) {
        if (e.preventDefault) {
            e.preventDefault(); // Necessary. Allows us to drop.
        }

        e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

        return false;
    }

    function handleDragOverItem(e) {
        if (e.preventDefault) {
            e.preventDefault(); // Necessary. Allows us to drop.
            /*console.log(this);*/
        }

        e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
        return false;
    }

    function handleDragEnterItem(e) {
    }

    function handleDragEnter(e) {
        newTasksArea = this.getAttribute("id");
    }


    function handleDragLeaveItem(e) {

    }


    function handleDragDrop(e) {
        getTasksFromLocalStorage();
        tasks.forEach(function (item, i) {

            if (item.id === dragableTask) {

                if (tasks[i].position === "in-completed" && newTasksArea === "currentTasks") {

                    tasks[i].position = "in-progress"
                }
                if (tasks[i].position === "in-progress" && newTasksArea === "completedTasks") {
                    tasks[i].position = "in-completed"
                }
                ;

                localStorage.setItem('tasks', JSON.stringify(tasks));
            }
        })
        getTasksFromLocalStorage();
        renderTasks(tasks);
        taskCounter(tasks);
        addDragDropListeners();
    };


    /*sort tasks*/

    /*sort up*/
    document.getElementById("sortUpButton").addEventListener("click", sortUp, true);

    function sortUp() {
        getTasksFromLocalStorage();
        let sorted = tasks.sort(function (a, b) {
            return a.timeOfCreate - b.timeOfCreate
        })

        localStorage.setItem('tasks', JSON.stringify(sorted));
        getTasksFromLocalStorage();
        renderTasks(tasks);
    }

    /*sort down*/

    document.getElementById("sortDownButton").addEventListener("click", sortDown, true);

    function sortDown() {
        getTasksFromLocalStorage();
        let sorted = tasks.sort(function (a, b) {
            return b.timeOfCreate - a.timeOfCreate
        })

        localStorage.setItem('tasks', JSON.stringify(sorted));
        getTasksFromLocalStorage();
        renderTasks(tasks);
    }

};


/*tasks Counter*/

function taskCounter(tasks) {

    let tasksCount = 0;
    let completedTasksCount = 0;

    tasks.forEach(function (item, i) {

        if (item.position === "in-completed") {
            completedTasksCount++
        }
    })

    tasksCount = (tasks.length - completedTasksCount) > 0 ? tasks.length - completedTasksCount : 0;

    document.getElementById("toDoHeader").innerText = "ToDo (" + tasksCount + ")";
    document.getElementById("completedHeader").innerText = "Completed (" + completedTasksCount + ")";
};


let renderTasks = (tasks, state) => {

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
            `<li class="list-group-item d-flex w-100 mb-2 ${item.priority}" draggable="true" id="${item.id}">
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

        if (item.position === "in-completed") {
            tasksCompleted.push(currentTask);
        } else
            tasksInProgress.push(currentTask);
    })

    document.getElementById("currentTasks").innerHTML = tasksInProgress.join("");
    document.getElementById("completedTasks").innerHTML = tasksCompleted.join("");

    taskCounter(tasks);

};
