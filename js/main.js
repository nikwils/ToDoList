'use strict';

const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    textTodo = document.querySelector('.text-todo'),
    btnAdd = document.querySelector('.header-button'),
    todoCompleted = document.querySelector('.todo-completed');

let todoData =[];

let arrStorage = JSON.parse(localStorage.getItem("myKey"));
console.log(arrStorage);

if(localStorage.getItem("myKey")){
    todoData = arrStorage;
} else {
    todoData = [];
}


const render = function() {
    localStorage.setItem("myKey", JSON.stringify(todoData));
    todoList.textContent = '';
    todoCompleted.textContent = '';

    
    todoData.forEach(function(item){
        const li = document.createElement('li');
        li.classList.add('todo-item');

        li.innerHTML = '<span class="text-todo">'+ item.value +'</span>' + 
        '<div class="todo-buttons">' + 
            '<button class="todo-remove"></button>' + 
            '<button class="todo-complete"></button>' + 
        '</div>';

        if(item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }

        const btnTodoComplete = li.querySelector('.todo-complete');

        btnTodoComplete.addEventListener('click', function(){
            item.completed = !item.completed;
            render();
        });

        const btnTodoRemove = li.querySelector('.todo-remove');

        btnTodoRemove.addEventListener('click', function(){
            btnTodoRemove.parentNode.parentNode.remove();
            console.log(todoData.splice(todoData.indexOf(item),1));

                
                function array_compare(a, b){
                
                    for(let i = 0; i < b.length; i++)
                       if(a[i] != b[i]){
                          delete b[i];
                        }
                        render();
                }
                array_compare(todoData, arrStorage);

            console.log(todoData);
            render();
        });

    });
    
};



todoControl.addEventListener('submit', function(event){

    event.preventDefault();

    const NewToDo = {
        value: headerInput.value,
        completed: false
    };

    if (headerInput.value == '') {
        btnAdd.disabled = true;
        btnAdd.disabled = false;
    } else {
        todoData.push(NewToDo);
        headerInput.value = '';
    }

    localStorage.setItem("myKey", JSON.stringify(todoData));

    render();

});




render();
