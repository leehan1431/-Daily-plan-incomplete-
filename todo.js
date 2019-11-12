const toDoForm = document.querySelector(".js-toDoForm"),
      toDoInput = toDoForm.querySelector("input"),
      toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

function filterFn(toDo){
    return toDo.id === 1
}

let toDos = [];

function delCheck(){
    
    if(confirm("일정을 삭제 하시겠습니까?")==true){
        deleteToDo(event); //삭제
    } else{
        return false; //취소
    }
    
}

//삭제 기능
function deleteToDo(event){
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function(toDo){
    return toDo.id !== parseInt(li.id); 
  });
  toDos = cleanToDos;
  saveToDos();
  console.log(cleanToDos);
}
//일정 저장
function saveToDos(){
    localStorage.setItem(TODOS_LS,JSON.stringify(toDos));
}

//일정 생성 ul안에 li안에 span생성
function paintToDo(text){
    const li = document.createElement("li");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    
    //일정 클릭하면 confirm으로.
    li.addEventListener("click",delCheck);
    
    span.innerText = text
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    
    //배열에 text와 li의 id저장
    toDos.push(toDoObj);
    
    //일정 저장
    saveToDos()
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

//LS에 저장된 일정 불러오기
function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !==  null){
       const parsedToDos = JSON.parse(loadedToDos);
       parsedToDos.forEach(function(toDo){
        paintToDo(toDo.text)
    })
    }
}

function init(){
loadToDos();
toDoForm.addEventListener("submit", handleSubmit)

}
init();