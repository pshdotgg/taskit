import IconFileTree from './assets/file-tree.svg';
import IconCalendar from './assets/calendar.svg';
import IconDropdown from './assets/dropdown.svg';

const projects = {
    "Inbox": [
        {
            title: "Task Title",
            description: "Task description",
            dueDate: "Task date",
            priority: "High",
        },
        {
            title: "Task Title2",
            description: "Task description2",
            dueDate: "Task date2",
            priority: "High2",
        }],

    "website": [
        {
            title: "Web task Title2",
            description: "Web Task description2",
            dueDate: "Web Task date2",
            priority: "Web High2",
        }
    ],
};

const completedTasks = [];

export const createProject = (project) => {
    projects[project] = [];
        
}

export const createTask = (project, title, description = "None", dueDate = "Today", priority = "Low") => {
    const task = {};
    task.title= title;
    task.description= description;
    task.dueDate= dueDate;
    task.priority= priority;
    console.log(task, "from createTask");
    console.log(project);
    projects[project].push(task);
}

export const getTask = (project) => projects[project];

export const deleteTask = (project, index) => projects[project].splice(index, 1);

export const completeTask = (project, index) => {
    console.log("tasks:",projects[project]);
    completedTasks.push(projects[project][index]);
    projects[project].splice(index, 1);

    
    console.log("completed tasks:", completedTasks);
}

export const changePriority = (project, index, priority) =>  projects[project][index].priority = priority;

const displaySidebar = () => {
    const ul = document.querySelector("ul");

    Object.keys(projects).forEach(project => {
        const li = document.createElement("li");
        li.textContent = project;
        ul.appendChild(li);
        li.addEventListener('click', (e) => {
            displayMainHeader(li.textContent)
            console.log(li.textContent);
        });
    });

}

const displayMainHeader = (project = "Inbox") => {
    const mainHeader = document.querySelector(".main-header");
    const currentProject = document.querySelector(".current-project");
    const newTask = document.querySelector("#new-task");

    document.querySelector(".project-icon > img").src = IconFileTree;

    currentProject.textContent = project;
    console.log("from displayMainHeader", project);
    newTask.placeholder = `+ Add task to "${currentProject.textContent}", press Enter to save`
    displayTasks(project);

    // if (newTask === document.activeElement) {
        
    // }
}

const displayTasks = (project) => {
    const mainTasks = document.querySelector(".main-tasks");
    const form = document.getElementById("task-list-form");

    let id = 0;

    while(form.hasChildNodes()) {
        form.removeChild(form.firstChild);
    }
    projects[project].forEach(task => {
        const div = document.createElement("div");
        div.classList.add("task");
        form.appendChild(div);
    
        const taskContainer = document.createElement("input");
        taskContainer.setAttribute("type", "checkbox");
        taskContainer.setAttribute("id", `id${id}`);
        
    
        const label = document.createElement("label");
        label.textContent = task.title;
        label.setAttribute("for", `id${id}`);
        label.classList.add("task-checked");
        id++;
    
        div.append(taskContainer, label);

        console.log(project, projects[project]);
    })
    
}

const displayCompletedTasks = () => {
    const sidebar = document.querySelector(".sidebar");

    const ul = document.createElement("ul");

    sidebar.appendChild(ul);

    const li = document.createElement("li");

    li.textContent = "Completed Tasks";

    completedTasks.forEach(task => {
        task.title
    });


}

displaySidebar();
displayMainHeader();

const newTask = document.getElementById("new-task");
// displayTasks(currentProject);

newTask.addEventListener('keypress', (e) => {
    if (e.key === "Enter") {
        const currentProject = document.querySelector(".current-project").textContent;
        e.preventDefault();
        createTask(currentProject, e.target.value);
        e.target.value = "";
        displayTasks(currentProject);
    }
})