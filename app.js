makeCustomCard()
var myForm = document.getElementById("myForm")
var inputTodo = document.getElementById("inputTodo");
var inputDescription = document.getElementById("inputDescription");
var inputDate = document.getElementById("inputDate");
var addTodo = document.getElementById("addTodo");

addTodo.addEventListener('click', saveTodoo)

function saveTodoo()
{    
    todoObj ={
        Id : Date.now(),
        InputTodo : inputTodo.value,
        InputDescription :  inputDescription.value,
        InputDate : inputDate.value
    }
    if(todoObj.InputTodo.trim() !=0 && todoObj.InputDescription.trim() !=0 && todoObj.InputDate.trim() !=0)
    {
        var localCheck = localStorage.getItem("todoObj")
        if(localCheck == null)
        {
            todoArray =[]
        }
        else
        {
            todoArray = JSON.parse(localCheck)
        }
        todoArray.push(todoObj)
        localStorage.setItem("todoObj" , JSON.stringify(todoArray))
        inputTodo.value = ''
        inputDescription.value =''
        inputDate.value=''
        var alertInput = document.getElementById("alertInput")
        alertInput.style.display = "none"
        var alertSuccess = document.getElementById("alertSuccess")
        alertSuccess.style.display="block"
        alertSuccess.innerText="Todo added successfully"

        setTimeout(function(){
        alertSuccess.style.display="none"
        }, 2000)
        
    }
    else
    {
        if(todoObj.InputTodo.trim() == 0)
        {
            var alertInput = document.getElementById("alertInput")
            alertInput.style.display = "block"
            alertInput.innerText = "Please fil all fields"
            setTimeout(function(){
                alertInput.style.display="none"
            }, 2000)
        }
    }
    
    makeCustomCard()
}

function makeCustomCard()
{
    var localCheck = localStorage.getItem("todoObj")
    if(localCheck == null)
    {
        todoArray =[]
    }
    else
    {
        todoArray = JSON.parse(localCheck)
    }
    let html = ''
    var todoItems = document.getElementById("todoItems")

    todoArray.forEach(function(todo , index)
    {
        html += `<div class="card" id=card${index+1} style="width: 18.5rem; ">
                    <div class="card-body" id="cardBody">
                    <h5 class="card-title">${todo.InputTodo}</h5> <hr>
                    <img src="icon/2044283_cross_cancel_x_icon.png" alt="" width="50" height="50" id="deleteTodo" onclick = "deleteTodo(${index})"> 
                    <p class="card-text">DESCRIPTION : ${todo.InputDescription}</p> <hr>
                    <p>DATE : ${todo.InputDate}</p> <hr>
                    <div class="buttons">
                        <a href="#" class="btn btn-primary" id="doneBtn" onclick="doneTodo(${index})">Done</a>
                        <a href="#" class="btn btn-primary" id="editBtn" onclick="editTodo(${index})">Edit</a>
                    </div>
                    </div>
                </div>`;

    });
    todoItems.innerHTML = html; 

}
//edit t
function editTodo(index)
{   
    var saveIndex = document.getElementById("saveIndex")
    var addTodo = document.getElementById("addTodo")
    var saveTodo = document.getElementById("saveTodo")

    saveIndex.value = index

    var localCheck = localStorage.getItem("todoObj")
    var todoArray = JSON.parse(localCheck)
    inputTodo.value = todoArray[index].InputTodo
    inputDescription.value = todoArray[index].InputDescription
    inputDate.value = todoArray[index].InputDate

    addTodo.style.display ="none"
    saveTodo.style.display=  "inline-block"

    
}

// save todo

var saveTodo = document.getElementById("saveTodo")
saveTodo.addEventListener('click' , function()
{
    var addTodo = document.getElementById("addTodo")
    var localCheck = localStorage.getItem("todoObj")
    var todoArray = JSON.parse(localCheck)
    var saveIndex = document.getElementById("saveIndex").value

    saveTodo.style.display = "none"
    addTodo.style.display = "inline-block"

    todoArray[saveIndex].InputTodo = inputTodo.value
    todoArray[saveIndex].InputDescription = inputDescription.value
    todoArray[saveIndex].InputDate = inputDate.value
    localStorage.setItem("todoObj" , JSON.stringify(todoArray))
    inputTodo.value = ''
    inputDescription.value =''
    inputDate.value=''
    makeCustomCard()

    var alertSuccess = document.getElementById("alertSuccess")
    alertSuccess.style.display="block"
    alertSuccess.innerText="Todo edit successfully"

    setTimeout(function(){
    alertSuccess.style.display="none"
    }, 2000)

})

// delete a todo

function deleteTodo(index)
{
    var localCheck = localStorage.getItem("todoObj")
    var todoArray = JSON.parse(localCheck)

    todoArray.splice(index , 1)
    localStorage.setItem("todoObj" , JSON.stringify(todoArray))
    makeCustomCard()

    var alertSuccess = document.getElementById("alertSuccess")
    alertSuccess.style.display="block"
    alertSuccess.innerText="Todo delete successfully"

    setTimeout(function(){
    alertSuccess.style.display="none"
    }, 2000)
}

// Delete All

var deleteAll = document.getElementById("deleteAll")
deleteAll.addEventListener('click' , function()
{
    var addTodo = document.getElementById("addTodo")
    var saveTodo = document.getElementById("saveTodo")
    
    var localCheck = localStorage.getItem("todoObj")
    var todoArray = JSON.parse(localCheck)
    if(localCheck == null)
    {
        todoArray =[]
    }
    else
    {
        todoArray = JSON.parse(localCheck)
        todoArray =[]
    }
    saveTodo.style.display = "none"
    addTodo.style.display = "inline-block"
    inputTodo.value = ''
    inputDescription.value =''
    inputDate.value =''
    localStorage.setItem("todoObj" , JSON.stringify(todoArray))
    makeCustomCard()
})

function doneTodo(index)
{   
    var localCheck = localStorage.getItem("todoObj")
    var todoArray = JSON.parse(localCheck)
    
   
   
    if(todoArray[index].InputTodo.includes("<strike>") )
    {
        // var card1 = document.getElementById("card" +`${index+1}`)
        // var card1 = document.getElementById("card1")
        // card1.style.fontFamily ="Arial !important" 

        todoArray[index].InputTodo = todoArray[index].InputTodo.replace("<strike>" , "")
        todoArray[index].InputTodo = todoArray[index].InputTodo.replace("</strike>" , "")

        todoArray[index].InputDescription = todoArray[index].InputDescription.replace("<strike>" , "")
        todoArray[index].InputDescription = todoArray[index].InputDescription.replace("</strike>" , "")

        todoArray[index].InputDate = todoArray[index].InputDate.replace("<strike>" , "")
        todoArray[index].InputDate = todoArray[index].InputDate.replace("</strike>" , "")
        console.log("done1")
    }
    else
    {
        var card1 = document.querySelector("#card" +`${index+1}`)
        card1.style.color = "red"
        todoArray[index].InputTodo =todoArray[index].InputTodo .strike()
        todoArray[index].InputDescription = todoArray[index].InputDescription.strike() 
        todoArray[index].InputDate = todoArray[index].InputDate.strike()
        console.log("done2x")
    }
    localStorage.setItem("todoObj" , JSON.stringify(todoArray))
    makeCustomCard()
}

