'use strict';

const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    textTodo = document.querySelector('.text-todo'),
    btnAdd = document.querySelector('.header-button'),
    todoCompleted = document.querySelector('.todo-completed');

let todoData =[

];



const render = function() {
    todoList.textContent = '';
    todoCompleted.textContent = '';

    if(localStorage.getItem("myKey")){
        todoData = JSON.parse(localStorage.getItem("myKey"));
    } else {
        [];
    }
    
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
        const btnTodeRemove = li.querySelector('.todo-remove');

        btnTodeRemove.addEventListener('click', function(){
            btnTodeRemove.parentNode.parentNode.remove();
            localStorage.removeItem("myKey");
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
