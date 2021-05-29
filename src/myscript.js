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

/*let classArrays = classArrays_deserialized
let categoryNames = categoryNames_deserialized
let toDoId = toDoId_deserialized
let allToDos = allToDos_deserialized*/



let x = localStorage.getItem('classArray')
let y = localStorage.getItem('categoryNames')
let z = localStorage.getItem('allToDos')
let w = localStorage.getItem('toDoId')


export function checkStorage(){
if(x== null){
    
    classArray_serialized = JSON.stringify(classArraysOriginal);
    localStorage.setItem('classArray', classArray_serialized)
}

if(y== null){
    categoryNames_serialized = JSON.stringify(categoryNamesOriginal);
    localStorage.setItem('categoryNames', categoryNames_serialized)
}

if(z== null){
    allToDos_serialized = JSON.stringify(allToDosOriginal);
    localStorage.setItem('allToDos', allToDos_serialized)
}
if(w== null){
    toDoId_serialized = JSON.stringify(toDoIdOriginal);
    localStorage.setItem('toDoId', toDoId_serialized)
}

classArrays_deserialized = JSON.parse(localStorage.getItem('classArray'))
categoryNames_deserialized = JSON.parse(localStorage.getItem('categoryNames'))
allToDos_deserialized = JSON.parse(localStorage.getItem('allToDos'))
toDoId_deserialized = JSON.parse(localStorage.getItem('toDoId'))

classArrays = classArrays_deserialized
categoryNames = categoryNames_deserialized
toDoId = toDoId_deserialized
allToDos = allToDos_deserialized
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


    /*classArrays_deserialized = JSON.parse(localStorage.getItem('classArray'))
    categoryNames_deserialized = JSON.parse(localStorage.getItem('categoryNames'))
    allToDos_deserialized = JSON.parse(localStorage.getItem('allToDos'))
    toDoId_deserialized = JSON.parse(localStorage.getItem('toDoId'))

    classArrays = classArrays_deserialized
    categoryNames = categoryNames_deserialized
    toDoId = toDoId_deserialized
    allToDos = allToDos_deserialized*/

}

document.addEventListener('click', ()=>{
    updateLocalStorage();
    
})




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
            console.log(classArrays)
            completeToDo(newToDo,element);
        })
    
    }}


export function createToDo(){
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

        console.log(classArrays)
        
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

            function check(stuff, thing){
                console.log(classArrays)
                if(thing.id == remove.id){
                    console.log(stuff.indexOf(thing))
                    let please = (stuff.indexOf(thing))
                    stuff.splice(please,1)
                    allToDos = []
                    classArrays.forEach(item =>
                        item[1].forEach(element =>
                            allToDos.push(element)))
                    
                    
                }
            }
            
            classArrays.forEach(element =>
                element[1].forEach(item =>
                    check(element[1],item)
                    )
            )
            
            /*for (let i = 0; i<classArrays.length; i++){
                for(let j = 0; j<classArrays[i].length; j++){
                    console.log(classArrays[i][1])
                /*if( classArrays[i][1].indexOf(remove) != -1){
                    console.log("I'm Listening")
                    console.log(classArrays[i][1])
                    let index = classArrays[i][1].indexOf(remove);
                    classArrays[i][1].splice(index,1)
                }
                if(classArrays[i][1][j].id == remove.id){
                    console.log("REMOVAL WORKING")
                    let index = classArrays[i][1].indexOf(remove);
                    classArrays[i][1].splice(index,1)
                    console.log(classArrays)
                    allToDos = []
                    classArrays.forEach(item =>
                        item[1].forEach(element =>
                            allToDos.push(element)))
                }}
            }
            /*for (let j = 0; i < allToDos.length; j++){
                if(allToDos[j].id == remove.id){
                    console.log("NO WAY")
                    let index2 = allToDos[j].indexOf(remove)
                }*/
                

            
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

export function pageLoad(){
    if(allToDos != undefined){
    allToDos.forEach(item =>
        printToDo(item))
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