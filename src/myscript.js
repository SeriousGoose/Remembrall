let defaultToDoArray = ["Default",[]];
let classArrays = [defaultToDoArray]
let categoryNames =[]
let showAll = document.createElement('div');

export function checkCategory(element){//check to see if category already exists
    categoryNames = []
    for (let i=0; i<classArrays.length; i++){
        let category = classArrays[i][0]
        categoryNames.push(category)
    }

    let isCategoryName = (currentValue) => currentValue != element;
    return (categoryNames.every(isCategoryName));
    
    
}


function sortArrays() {
    classArrays.forEach(element =>
        element[1].sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime()))
}

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
    divs.forEach(item =>{
        item = document.getElementById("element");
    })
    let inputs = document.querySelectorAll('input');
    inputs.forEach(item =>{
        item = document.getElementById("element");
    })
    let buttons = document.querySelectorAll("button");
    buttons.forEach(item =>{
        item = document.getElementById("element");
    })
    let selects = document.querySelectorAll("select");
    selects.forEach(item =>{
        item = document.getElementById("element");
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

export function createToDo(){//Messy, not following single responsibility principle
    formSubmit.addEventListener('click', () => {
        let toDo = new ToDo(title.value, description.value, itemClass.value ,date.value )
    
        classArrays.forEach(element => {
            if ( toDo.category == element[0]){
                element[1].push(toDo)
            }})
        newForm.reset();
        sortArrays();
        toDoList.innerHTML = '';
        classArrays.forEach(item =>
        item[1].forEach(element =>
            printToDo(element)))
        closeForm()
}) 
}

export function  createCategory() {
    categorySubmit.addEventListener('click', () =>{
        if (categoryTitle.value != '' && checkCategory(categoryTitle.value)){
        let category = categoryTitle.value;
        classArrays.push([category,[]])}
        newCategory.reset();
        catList.innerHTML = '';
        createShowAll();
        hideShowAll();
        classArrays.forEach(item =>
            printCategory(item[0])
            )
        itemClass.innerHTML = '';
            classArrays.forEach(item =>
                addCategoryOption(item[0])
                )
        categoryModal.style.display = "none";
    })
}

export function printCategory(element) {//Prints Category and adds event listener to sort ToDo's
        let newCategory = document.createElement('div');
        newCategory.classList.add('categoryItems');
        newCategory.textContent = (element);
        catList.appendChild(newCategory)
        newCategory.addEventListener('click', () =>{
            displayShowAll();
            for (let i = 0; i < classArrays.length; i++){
                if (classArrays[i][0]==element){
                    toDoList.innerHTML = '';
                    classArrays[i][1].forEach(element =>
                        printToDo(element))
                }
            }
        })
}

export function addCategoryOption(element) {
        let newOption = document.createElement('option');
        newOption.classList.value = element;
        newOption.textContent = element;
        itemClass.appendChild(newOption);
}

export function closeToDo(){
    formCancel.addEventListener('click', () =>{
        newForm.reset();
        closeForm();
    })
}

export function closeCategory(){
    categoryCancel.addEventListener('click', () => {
        newCategory.reset();
        closeForm();
    })
}  

export function displayForm(){
    newToDo.addEventListener('click', () =>{
        modal.style.display = "inline";
        })
    }

export function displayCategoryForm(){
    addCategory.addEventListener('click', () => {
        categoryModal.style.display = "inline";
    })
}

export function closeForm(){
        modal.style.display = "none"
        categoryModal.style.display = "none";
}

export function createShowAll(){
    
    showAll.classList.add('categoryItems');
    showAll.textContent = "Show All";
    catList.prepend(showAll);
}

export function hideShowAll(){
    showAll.style.display = 'none';
}

export function displayShowAll(){
    showAll.style.display = 'block';
}

export function showAllToDos(){
    showAll.addEventListener('click', () => {
        hideShowAll();
        sortArrays();
        toDoList.innerHTML = '';
        classArrays.forEach(item =>
        item[1].forEach(element =>
            printToDo(element)))
        closeForm()
    })
}