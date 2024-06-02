import React from 'react'


type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: number) => void
}
 export type TaskType = {
     id: number
     title: string
     isDone: boolean
 }

export const Todolist = ({title, tasks, removeTask}: TodolistPropsType) => {
    const tasksElements: Array<JSX.Element> | JSX.Element = tasks.length !== 0
        ? tasks.map((task: TaskType) => {
    return (
        <li>
        <input type="checkbox" checked={task.isDone}/>
            <span>{task.title}</span>
            <button onClick={()=>removeTask(task.id)}>*</button>
    </li>

)
})
        :<span>Your taskslist is empty</span>

return (
    <div className="todolist">
        <h3>{title}</h3>
        <div>
        <input />
                <button>+</button>
            </div>
            <ul>
                {tasksElements}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}