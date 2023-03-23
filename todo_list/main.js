let userInput = document.getElementById("user-input");
let addButton = document.getElementById("add-button");
let taskArea = document.getElementById("task-area");
let tabs = document.querySelectorAll(".task-tabs div");
let underLine =document.getElementById("under-line")
let filterList=[];
let mode = "all";
let taskList = [];
let List =[];

addButton.addEventListener("mousedown",addTask);
userInput.addEventListener("keyup",function(event){
    if(event.keyCode == 13){
        addTask(event);
    }
})


for (let i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener("click", function (event) {
      filter(event);
    });
  }

function render(){
    let resultHTML = "";
    List = [];

    if(mode == "all"){
        List = taskList;
    }else if(mode == "ongoing" || mode == "done"){
        List = filterList;
    }

    for(let i =0; i<List.length; i++){
        
        if(List[i].isComplete == true){
            resultHTML +=
            `<div class = "task task-done">
               <div>${List[i].taskContent}</div>
               <div>
                 <button id="check-button" onclick="check('${List[i].id}')">check</button>
                 <button id="delete-button" onclick="deleteTask('${List[i].id}')">delete</button>
               </div>
            </div>`
        }else{
            resultHTML +=
            `<div class = "task">
               <div>${List[i].taskContent}</div>
               <div>
                 <button id="check-button" onclick="check('${List[i].id}')">check</button>
                 <button id="delete-button" onclick="deleteTask('${List[i].id}')">delete</button>
               </div>
            </div>`
        }

        
    }
    document.getElementById("task-board").innerHTML = resultHTML;
}

function addTask(){
    let taskValue = userInput.value;
    let task ={
        id :randomIDGenerate(),
        taskContent : taskValue,
        isComplete : false
      }

     taskList.push(task);
     userInput.value = "";
     render();
}

function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
}


function check(id){

    for(let i=0; i<taskList.length; i++){
    if(taskList[i].id == id){
        taskList[i].isComplete = !taskList[i].isComplete;
        break;
    }
  }
  filter();
}

function deleteTask(id){
    
   for(let i =0; i<taskList.length; i++){
      if(taskList[i].id == id){
        taskList.splice(i,1);
        break;
      }
   }
   filter();
}

function filter(e){
   
     if(e){
        mode = e.target.id;
        console.log(mode)
        underLine.style.width = e.target.offsetWidth + "px";
        underLine.style.left = e.target.offsetLeft + "px";
        underLine.style.top = e.target.offsetTop + (e.target.offsetHeight -4) + "px"
     }


    filterList=[];
  
     if( mode === "ongoing"){
        for(let i=0; i<taskList.length; i++){
          if(taskList[i].isComplete == false){
            filterList.push(taskList[i]);
          }
        }
     }else if(mode === "done"){
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete == true){
                filterList.push(taskList[i]);

            }
        }
       
     }
     
     render();
}