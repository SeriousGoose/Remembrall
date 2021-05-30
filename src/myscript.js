
let defaultToDoArray = ["default",[]];
let classArraysOriginal = [defaultToDoArray]
let categoryNamesOriginal =[]
let showAll = document.createElement('div');
let toDoIdOriginal = 1;
let allToDosOriginal = []
let classArray_serialized
let categoryNames_serialized
let allToDos_serialized
let toDoId_serialized
let classArrays_deserialized 
let categoryNames_deserialized 
let allToDos_deserialized 
let toDoId_deserialized
let classArrays 
let categoryNames 
let toDoId 
let allToDos 

export function checkStorage(){
let x = localStorage.getItem('classArray')
let y = localStorage.getItem('categoryNames')
let z = localStorage.getItem('allToDos')
let w = localStorage.getItem('toDoId')

checkForStorageValue(x, classArray_serialized,classArraysOriginal,'classArray')
checkForStorageValue(y,categoryNames_serialized,categoryNamesOriginal,'categoryNames')
checkForStorageValue(z,allToDos_serialized,allToDosOriginal,'allToDos')
checkForStorageValue(w,toDoId_serialized,toDoIdOriginal,'toDoId')

classArrays_deserialized = JSON.parse(localStorage.getItem('classArray'))
categoryNames_deserialized = JSON.parse(localStorage.getItem('categoryNames'))
allToDos_deserialized = JSON.parse(localStorage.getItem('allToDos'))
toDoId_deserialized = JSON.parse(localStorage.getItem('toDoId'))

classArrays = classArrays_deserialized
categoryNames = categoryNames_deserialized
toDoId = toDoId_deserialized
allToDos = allToDos_deserialized
}

function checkForStorageValue (value,serialized,original,storage ){
    if(value== null){
    
        serialized = JSON.stringify(original);
        localStorage.setItem(storage, serialized)
    }
}


function updateLocalStorage(){
    classArray_serialized = JSON.stringify(classArrays)
    categoryNames_serialized = JSON.stringify(categoryNames)
    toDoId_serialized = JSON.stringify(toDoId)
    allToDos_serialized = JSON.stringify(allToDos)

    localStorage.setItem('classArray', classArray_serialized)
    localStorage.setItem('categoryNames', categoryNames_serialized)
    localStorage.setItem('allToDos', allToDos_serialized)
    localStorage.setItem('toDoId', toDoId_serialized)
}

document.addEventListener('click', ()=>{
    updateLocalStorage();
    
})

export function getElements(){
    let divs = document.querySelectorAll('div');
    divs.forEach(thing =>{
        thing = document.getElementById("element");
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

export default class ToDo {
    constructor(title,description,category,date, id){
        this.title = title;
        this.description = description;
        this.category = category;
        this.date = date;
        this.id = id;
    }
}

export function createToDo(){
    formSubmit.addEventListener('click', () => {
        
        let toDo = new ToDo(title.value, description.value, itemClass.value ,date.value,toDoId )
    
        if(toDo.title != ''){
        classArrays.forEach(element => {
            if ( toDo.category == element[0]){
                element[1].push(toDo)
            }})
        pushAllToDos()
        newForm.reset();
        sortArrays();
        printAllToDos()
        closeForm()
        changeRemembrall();        
        return toDoId++;
        }
}) 
}

export function printToDo(element){
    let condensed = true;
    let newToDo = document.createElement('div');
    newToDo.classList.add("toDoItems");
    if(element.title != ''){
        let toDoButtons = document.createElement('div')
        toDoButtons.classList.add("toDoButtons")
        newToDo.appendChild(toDoButtons)
        toDoList.appendChild(newToDo);
        let completeButton = document.createElement('button');
        let check = '\u2713'
        completeButton.classList.add("completeButton")
        completeButton.textContent = check;
        toDoButtons.appendChild(completeButton)
        let toDoTitle = document.createElement('div');
        toDoTitle.textContent = element.title;
        newToDo.appendChild(toDoTitle);
        let detailsButton = document.createElement('button');
        detailsButton.classList.add('detailsButton')
        detailsButton.textContent = "Show More";
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
            detailsButton.textContent = "Show Less"
            newToDo.appendChild(detailsTab)
        }
        else if(condensed == false){
            
            condensed = true;
            detailsButton.textContent = "Show More"
            newToDo.removeChild(detailsTab);
        }
        })
        completeButton.addEventListener('click', () => {
            completeToDo(newToDo,element);
        })
    
    }}

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

            function check(stuff, thing){
                if(thing.id == remove.id){
                    let findItem = (stuff.indexOf(thing))
                    stuff.splice(findItem,1)
                    pushAllToDos() 
                }
            }
            
            classArrays.forEach(element =>
                element[1].forEach(item =>
                    check(element[1],item)
                    )
            )           
            changeRemembrall();
        })
        noButton.addEventListener('click', () => {
            printAllToDos()
        })
    })

}


export function  createCategory() {
    categorySubmit.addEventListener('click', () =>{
        if (categoryTitle.value != '' && checkCategory(categoryTitle.value)){
        let category = categoryTitle.value;
        classArrays.push([category,[]])}
        else{alert("Please Enter a Valid Category")}
        newCategory.reset();
        createShowAll();
        hideShowAll();
        printClassArraysCategories();
        updateCategoryOptions();
        categoryModal.style.display = "none";
    })
}

export function checkCategory(element){//check to see if category already exists
    categoryNames = []
    for (let i=0; i<classArrays.length; i++){
        let category = classArrays[i][0]
        categoryNames.push(category)
    }

    let isCategoryName = (currentValue) => currentValue != element;
    return (categoryNames.every(isCategoryName));
    
    
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
            filterCategory(element);
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
                    pushAllToDos();
                    printAllToDos();
                    printClassArraysCategories();
                }
            changeRemembrall();
            updateCategoryOptions();
            
        }})
        noButton.addEventListener('click', () => {
            printClassArraysCategories()
            
            
        })
})}

export function changeRemembrall(){//check date of all ToDo's, changes title color if past due
    let today = new Date();
    let dateArray = [];
    remembrall.style.color = "rgba(0, 89, 255, 0.815)"

    for(let i = 0; i < classArrays.length; i++){
        for(let j = 0; j < classArrays[i][1].length; j++){
            if(classArrays[i][1][j].date != ''){
                dateArray.push(new Date(classArrays[i][1][j].date))
            }
        }
    }
    
    function checkDate(dueDate){
       return (dueDate.getTime() + (dueDate.getTimezoneOffset()*720000)) >= today.getTime();
   }
    if (dateArray.every(checkDate) == false){
        remembrall.style.color = "red"
    }
}

function sortArrays() {   
    allToDos.sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    classArrays.forEach(element =>
        element[1].sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime()))
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

function displayShowAll(){
    showAll.style.display = 'block';
}

export function showAllToDos(){
    showAll.addEventListener('click', () => {
        hideShowAll();
        sortArrays();
        printAllToDos()
        closeForm()
    })
}

export function pageLoad(){
    if(allToDos != undefined){
        printAllToDos()
    }
    if(classArrays != undefined){
    classArrays.forEach(item =>
        printCategory(item[0])
        )
    classArrays.forEach(item =>
        addCategoryOption(item[0])
        )
    }
}

function printClassArraysCategories(){
    catList.innerHTML = '';
    classArrays.forEach(item =>
        printCategory(item[0]))
}

function pushAllToDos(){
    allToDos = []
    classArrays.forEach(item =>
        item[1].forEach(element =>
            allToDos.push(element)))
}

function printAllToDos(){
    toDoList.innerHTML = '';
    allToDos.forEach(item =>
        printToDo(item))
}

function updateCategoryOptions(){
    itemClass.innerHTML = '';
            classArrays.forEach(item =>
                addCategoryOption(item[0])
                )
}

function filterCategory(element){
    for (let i = 0; i < classArrays.length; i++){
        if (classArrays[i][0]==element){
            toDoList.innerHTML = '';
            classArrays[i][1].forEach(element =>
                printToDo(element))
        }
    }
}

