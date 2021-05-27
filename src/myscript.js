let defaultToDoArray = ["default",[]];
let classArrays = [defaultToDoArray]
let categoryNames =[]
let showAll = document.createElement('div');
let toDoId = 0;
let allToDos = []

export function checkCategory(element){//check to see if category already exists
    categoryNames = []
    for (let i=0; i<classArrays.length; i++){
        let category = classArrays[i][0]
        categoryNames.push(category)
    }

    let isCategoryName = (currentValue) => currentValue != element;
    return (categoryNames.every(isCategoryName));
    
    
}

export function changeRemembrall(){//check date of all ToDo's, changes title color if past due
    let today = new Date();
    let dateArray = [];
    remembrall.style.color = "white"
    console.log(today)

    for(let i = 0; i < classArrays.length; i++){
        for(let j = 0; j < classArrays[i][1].length; j++){
            if(classArrays[i][1][j].date != ''){
                console.log(classArrays[i][1][j].date)
                dateArray.push(new Date(classArrays[i][1][j].date))
            }
        }
    }
    
    function checkDate(dueDate){
       return (dueDate.getTime() + (dueDate.getTimezoneOffset()*720000)) >= today.getTime();
   }
    if (dateArray.every(checkDate) == false){
        console.log(classArrays)
        console.log(dateArray);
        remembrall.style.color = "red"
    }
}



function sortArrays() {   
    allToDos.sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    classArrays.forEach(element =>
        element[1].sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime()))
}

export default class ToDo {
    constructor(title,description,category,date, id){
        this.title = title;
        this.description = description;
        this.category = category;
        this.date = date;
        this.id = id;
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
    let condensed = true;
    let newToDo = document.createElement('div');
    newToDo.classList.add("toDoItems");
    if(element.title != ''){
        let toDoButtons = document.createElement('div')
        newToDo.appendChild(toDoButtons)
        toDoList.appendChild(newToDo);
        let completeButton = document.createElement('button');
        completeButton.textContent = "Complete";
        toDoButtons.appendChild(completeButton)
        let toDoTitle = document.createElement('div');
        toDoTitle.textContent = element.title;
        newToDo.appendChild(toDoTitle);
        let detailsButton = document.createElement('button');
        detailsButton.textContent = "+ Show Details";
        toDoButtons.append(detailsButton);
        let detailsTab = document.createElement('div');
        if (element.date != ''){
            let toDoDate = document.createElement('div');
            toDoDate.textContent = "Due Date: " + element.date;
            detailsTab.appendChild(toDoDate);}
        if (element.category != 'default'){
            let toDoClass = document.createElement('div');
            toDoClass.textContent = "Category: " + element.category;
            detailsTab.appendChild(toDoClass);}
        if (element.description != ''){
            let toDoDescription = document.createElement('div');
            toDoDescription.textContent = "Description: " + element.description;
            detailsTab.appendChild(toDoDescription);}
        
    
    


    detailsButton.addEventListener('click', () => {
        if(condensed == true){
            condensed = false;
            detailsButton.textContent = "-Hide Details"
            newToDo.appendChild(detailsTab)
        }
        else if(condensed == false){
            
            condensed = true;
            detailsButton.textContent = "+ Show Details"
            newToDo.removeChild(detailsTab);
        }
        })
        completeButton.addEventListener('click', () => {
            completeToDo(newToDo,element);
        })
    
    }}


export function createToDo(){//Messy, not following single responsibility principle
    formSubmit.addEventListener('click', () => {
        
        let toDo = new ToDo(title.value, description.value, itemClass.value ,date.value,toDoId )
    
        if(toDo.title != ''){
        classArrays.forEach(element => {
            if ( toDo.category == element[0]){
                element[1].push(toDo)
            }})
        allToDos = []
        classArrays.forEach(item =>
            item[1].forEach(element =>
                allToDos.push(element)))
        newForm.reset();
        sortArrays();
        toDoList.innerHTML = '';
        allToDos.forEach(item =>
            printToDo(item))

        closeForm()
        changeRemembrall();
        return toDoId++;
        }
}) 
}

function completeToDo(item, remove){
    item.addEventListener('click',() =>{
        item.innerHTML = '';
        item.style.display = "flex";
        item.style.justifyContent = "space-evenly";
        let question = document.createElement('div');
        question.innerHTML = "Task Completed?"
        item.appendChild(question);
        let yesButton = document.createElement('button');
        yesButton.textContent = "Yes";
        item.appendChild(yesButton);
        let noButton = document.createElement('button');
        noButton.textContent = "No";
        item.appendChild(noButton);

        yesButton.addEventListener('click', () => {
            item.remove();
            for (let i =0; i<classArrays.length; i++){
                if( classArrays[i][1].indexOf(remove) != -1){
                    let index = classArrays[i][1].indexOf(remove);
                    classArrays[i][1].splice(index,1)
                }
            }
            changeRemembrall();
        })
        noButton.addEventListener('click', () => {
            toDoList.innerHTML = '';
            allToDos.forEach(item =>
                printToDo(item))
        })

        


    })
}
function confirmRemove(item,remove){
    item.addEventListener('click',() =>{
        item.innerHTML = '';
        item.style.display = "flex";
        item.style.justifyContent = "space-evenly";
        let question = document.createElement('div');
        question.innerHTML = "Remove Category?"
        item.appendChild(question);
        let yesButton = document.createElement('button');
        yesButton.textContent = "Yes";
        item.appendChild(yesButton);
        let noButton = document.createElement('button');
        noButton.textContent = "No";
        item.appendChild(noButton);

        yesButton.addEventListener('click', () => {
            item.remove();
            for (let i = 0; i < classArrays.length; i++){
                if (classArrays[i][0]==remove){
                    classArrays.splice(i,1)
                    catList.innerHTML = '';
                    toDoList.innerHTML = '';
                    classArrays.forEach(item =>
                        item[1].forEach(thing =>
                            printToDo(thing)))
                    classArrays.forEach(item =>
                        printCategory(item[0])
                    
                    )
                }
            changeRemembrall();
            
        }})
        noButton.addEventListener('click', () => {
            catList.innerHTML = '';
            classArrays.forEach(item =>
                printCategory(item[0])
            
            )
        })
})}


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
        newCategory.style.justifyContent = "space-between"
        catList.appendChild(newCategory)
        let thisCategory = document.createElement('div');
        thisCategory.classList.add('categoryNames')
        thisCategory.textContent = (element);
        newCategory.appendChild(thisCategory)
        if(element != "default"){
            let removeCategory = document.createElement('button');
            removeCategory.classList.add('categoryRemove')
            removeCategory.textContent = "-";
            newCategory.appendChild(removeCategory);
            removeCategory.addEventListener('click', () =>{
                confirmRemove(newCategory,element)
            })
        }
        thisCategory.addEventListener('click', () =>{
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
        allToDos.forEach(item =>
            printToDo(item))
        closeForm()
    })
}