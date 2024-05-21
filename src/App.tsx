import React from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";


function App() {
    const todolistTitle = "What to learn"
    const tasks: Array<TaskType> = [
        {id: 1, title: "HTML", isDone: true},
        {id: 2, title: "CSS", isDone: true},
        {id: 3, title: "JS/TS", isDone: false},
        {id: 4, title: "REACT", isDone: false }
    ]

        const todolistTitle_1 = "What to buy"
        const tasks_1: Array<TaskType> = [
        {id: 1, title: "Water", isDone: true},
        {id: 2, title: "Beer", isDone: true},
        {id: 3, title: "Meat", isDone: false},
        {id: 4, title: "Cheeps", isDone: false }
    ]


    return (
        <div className="App">
            <Todolist title={todolistTitle} tasks={tasks} />
            <Todolist title={todolistTitle_1} tasks={tasks_1} />
        </div>
    );
}

export default App;