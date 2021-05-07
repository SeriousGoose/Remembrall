let defaultToDoArray = ["default",[]];
let classArrays = [defaultToDoArray]

function sortArrays() {
    classArrays.forEach(element =>
        element[1].sort((a,b) => b.date - a.date))

        console.log(classArrays)
    classArrays.forEach(element =>
        console.log(element[1][0].date))
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
        let category = categoryTitle.value;
        classArrays.push([category,[]])
        console.log(classArrays);
        
        newCategory.reset();
        catList.innerHTML = '';
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
            for (let i = 0; i < classArrays.length; i++){
                console.log(classArrays[i][0])
                console.log(element)
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