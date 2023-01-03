
const elForm =document.querySelector('.js-form')
const elInput =document.querySelector('.js-input')
const elbtn =document.querySelector('.js-btn')
const elList =document.querySelector('.list')
const elbtngroup =document.querySelector('.btn-group')
const comletedspan =elbtngroup.children[1].children[0]
const unComletedspan =elbtngroup.children[2].children[0]
const allBtn =elbtngroup.children[0]
const allDelade =document.querySelector('.js-delateall')
const localData =JSON.parse(window.localStorage.getItem('todos'))

const elMode =document.querySelector('.js-mode')
let theme =false
elMode.addEventListener('click', ()=>{
    theme =!theme
    console.log(theme);
    const bg =theme ? 'dark':'light';
    window.localStorage.setItem('theme',bg)
    ChangeTheme()
})
function ChangeTheme() {
    if (window.localStorage.getItem("theme" ) == "dark") {
        document.body.classList.add('dark')
        elMode.classList.add('btn')
    }else{
        document.body.classList.remove('dark')
        elMode.classList.remove('btn')
    }
}
ChangeTheme()

const todos =localData || [];

rendertodos(todos,elList)
function rendertodos(arr,node){
    window.localStorage.setItem('todos', JSON.stringify(todos))
    comletedspan.textContent =todos.filter((el) =>el.isCompleted).length
  unComletedspan.textContent =todos.filter((el) =>el.isCompleted !==true).length
    node.innerHTML =""
elInput.value =""
    arr.forEach((item)=>{
        
        const newitem =document.createElement("li")
        const newSpan =document.createElement("span")
        const newInput =document.createElement('input')
        const buttonElEdit =document.createElement('button')
        const buttonElDelete =document.createElement('button')
        
        elList.appendChild(newitem)
        
        newitem.setAttribute("class","list-group-item d-flex  align-items-center justify-content-between flex-grow-1 col-12  ")
        newSpan.setAttribute('class','flex-grow-1 mx-3')
        newInput.setAttribute('class','form-check-input m-0 js-check')
        buttonElEdit.setAttribute("class","btn btn-warning  ms-auto js-edit-btn")
        buttonElDelete.setAttribute("class","btn btn-danger ms-1 js-delate-btn")
        buttonElDelete.dataset.todoId =item.id
        buttonElEdit.dataset.todoId =item.id
        newInput.dataset.todoId =item.id
        
        newSpan.textContent =item.id + ") " + item.text
newInput.type ='checkbox'
buttonElDelete.textContent ="Delete"
buttonElEdit.textContent = "Edit"

    newitem.appendChild(newInput)
    newitem.appendChild(newSpan)
    newitem.appendChild(buttonElEdit)
    newitem.appendChild(buttonElDelete)
    
if(item.isCompleted){
    newInput.checked =true
    newSpan.style.textDecoration = 'line-through'


}

 node.appendChild(newitem)
 elbtngroup.children[0].children[0].innerHTML =todos.length
    })
 
}
const noEl =document.createElement('h2')
noEl.classList.add('text-center')
elList.appendChild(noEl)

if (todos.length == 0) {
    noEl.textContent ="Create todos😉"
    
}

elForm.addEventListener("submit",(evt) =>{
    evt.preventDefault()
    
   
    const todosobj = {
                id:todos.length ? todos[todos.length - 1].id + 1 : 1 ,
                text:elInput.value,
                isCompleted:false
                }
                todos.push(todosobj)
            
rendertodos(todos,elList)

})
let sum =0
const newtodos =[]
const newtodosun =[]
const Completed =elbtngroup.children[1]
const ComUn =elbtngroup.children[2]

allBtn.addEventListener('click',(evt)=>{
    evt.preventDefault()
    rendertodos(todos,elList)
})

Completed.addEventListener('click',(evt)=>{
    evt.preventDefault()
    const filtred = todos.filter((el) =>el.isCompleted ==true)
    console.log(filtred);
    rendertodos(filtred,elList)
})
ComUn.addEventListener('click',(evt)=>{
    evt.preventDefault()
    const filtred = todos.filter((el) =>el.isCompleted !==true)
    console.log(filtred);
    rendertodos(filtred,elList)
})


elList.addEventListener('click',(evt)=>{
    if(evt.target.matches('.js-delate-btn')){
        const todoId =evt.target.dataset.todoId;
        const findindex =todos.findIndex((item) =>item.id == todoId)
todos.splice(findindex,1)
rendertodos(todos,elList)
    };
    if(evt.target.matches('.js-edit-btn')){
        const todoId =evt.target.dataset.todoId;
        console.log(todoId);
        const finditem =todos.find((item) =>item.id == todoId)
    const newText = prompt("Create a new todo",finditem.text)
    finditem.text =newText
rendertodos(todos,elList)
    };
    if(evt.target.matches('.js-check')){
        const todoId =evt.target.dataset.todoId;
     const findentItem =todos.find((item) => item.id == todoId)
     findentItem.isCompleted =!findentItem.isCompleted

rendertodos(todos,elList)
    }
})


allDelade.addEventListener('click',(evt)=>{
    if(evt.target.matches('.js-delateall')){
       localStorage.removeItem('todos') ; 

elList.setAttribute('class','text-center size')
// todos.splice(0,todos.length)
rendertodos(todos,elList)
elList.innerHTML ="Todos had been deleted🤥"

    };
})

