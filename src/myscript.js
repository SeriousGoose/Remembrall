let defaultToDoArray = ["default",[]];
let workToDoArray = ["work",[]];
let schoolToDoArray = ["school", []];
let familyToDoArray = ["family", []];
let classArrays = [defaultToDoArray,workToDoArray,schoolToDoArray,familyToDoArray]

export default class ToDo {
    constructor(title,description,category,date){
        this.title = title;
        this.description = description;
        this.category = category;
        this.date = date;        
    }
}

export function getElements(){
    let divs = document.querySelectorAll('div');
    divs.forEach(element =>{
        element = document.getElementById("element");
    })
    let inputs = document.querySelectorAll('input');
    inputs.forEach(element =>{
        element = document.getElementById("element");
    })
    let buttons = document.querySelectorAll("button");
    buttons.forEach(element =>{
        element = document.getElementById("element");
    })
    let selects = document.querySelectorAll("select");
    selects.forEach(element =>{
        element = document.getElementById("element");
    })
}

export function printToDo(element){
    let newToDo = document.createElement('div');
    newToDo.classList.add("toDoItems");
    if(element.title != ''){
    toDoList.appendChild(newToDo);}
    if(element.title != ''){
    let toDoTitle = document.createElement('div');
    toDoTitle.textContent = element.title;
    newToDo.appendChild(toDoTitle);}
    if (element.date != ''){
    let toDoDate = document.createElement('div');
    toDoDate.textContent = "Due Date: " + element.date;
    newToDo.appendChild(toDoDate);}
    if (element.category != 'default'){
    let toDoClass = document.createElement('div');
    toDoClass.textContent = element.category;
    newToDo.appendChild(toDoClass);}
    if (element.description != ''){
        let toDoDescription = document.createElement('div');
        toDoDescription.textContent = element.description;
        newToDo.appendChild(toDoDescription);}
}

export function createToDo(){
    formSubmit.addEventListener('click', () => {
        let toDo = new ToDo(title.value, description.value, itemClass.value ,date.value )
    
        classArrays.forEach(element => {
            if ( toDo.category == element[0]){
                element[1].push(toDo)
            }})
        newForm.reset();
        toDoList.innerHTML = '';
        classArrays.forEach(item =>
        item[1].forEach(element =>
            printToDo(element)))
        closeForm()
}) 
}

export function closeToDo(){
    formCancel.addEventListener('click', () =>{
        newForm.reset();
        closeForm();
    })
}

export function displayForm(){
    newToDo.addEventListener('click', () =>{
        modal.style.display = "inline";
    })}

export function displayCategoryForm(){
    addCategory.addEventListener('click', () => {
        categoryModal.style.display = "inline";
    })
}

function closeForm(){
        modal.style.display = "none"
}