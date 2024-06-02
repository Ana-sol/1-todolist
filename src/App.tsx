import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";


function App() {

    //DATA
    const todolistTitle = "What to learn"


//state mangment => хук useState, useReducer, redux

//создаем схему деструктуризации массива
    //если ставим const то значит что в процессе создадим переменные

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "HTML", isDone: true},
        {id: 2, title: "CSS", isDone: true},
        {id: 3, title: "JS/TS", isDone: false},
        {id: 4, title: "REACT", isDone: false}

    ])

//иммутабельная(без изменения структуры данных начальной) работа-создаем копию,вносим изменения и передаем на фильтр новый массив

    const removeTask = (taskId: number) => {
        const nextState = tasks.filter(t => t.id !== taskId) //new array
        setTasks(nextState)
    }

//UI
    return (
        <div className="App">
            <Todolist title={todolistTitle}
                      tasks={tasks}
                      removeTask={removeTask}
            />
        </div>
    );
}

export default App;