import './App.css';
import {Todolist} from "./Todolist";
import {useState} from "react";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

type TodolistType = {
	id: string
	title: string
	filter: FilterValuesType
}

export type TasksStateType = {
	[todolistId: string]: TaskType[]
}

     //BLL  данные

function App() {

	let todolistID1 = v1()
	let todolistID2 = v1()

	let [todolists, setTodolists] = useState<TodolistType[]>([
		{id: todolistID1, title: 'What to learn', filter: 'all'},
		{id: todolistID2, title: 'What to buy', filter: 'all'},
	])

	let [tasks, setTasks] = useState<TasksStateType>({
		[todolistID1]: [
			{id: v1(), title: 'HTML&CSS', isDone: true},
			{id: v1(), title: 'JS', isDone: true},
			{id: v1(), title: 'ReactJS', isDone: false},
		],
		[todolistID2]: [
			{id: v1(), title: 'Rest API', isDone: true},
			{id: v1(), title: 'GraphQL', isDone: false},
		],
	})

// tasks: crud : create read update delete

	const addTask = (title: string, todolistId: string) => {
		const newTask = {
			id: v1(),
			title: title,
			isDone: false
		}
		const newTodolistTasks = {...tasks, [todolistId]: [newTask, ...tasks[todolistId]]}
		setTasks(newTodolistTasks)
	}


	const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
		setTasks(
			{
				...tasks,
				[todolistId]: tasks[todolistId].map(t => t.id == taskId ? {...t, isDone: taskStatus} : t)
			}
		)
	}
	const changeTaskTitle = (taskId: string, title: string, todolistId: string) => {
		setTasks(
			{
				...tasks,
				[todolistId]: tasks[todolistId].map(t => t.id == taskId ? {...t, title: title} : t)
			}
		)
	}

	const removeTask = (taskId: string, todolistId: string) => {
		const newTodolistTasks = {...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)}
		setTasks(newTodolistTasks)
	}

//todolists: crud

	const addTodolist = (title: string) => {
		const todolistId = v1()
		const newTodo: TodolistType ={
			id: todolistId,
			title: title,
			filter: 'all'
		}
		const nextState: Array<TodolistType> = [...todolists, newTodo]
		setTodolists(nextState)
		setTasks({...tasks, [todolistId]: [] })
	}

	const changeFilter = (filter: FilterValuesType, todolistId: string) => {
		setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter} : tl))
	}

	const changeTodolistTitle = (title: string, todolistId: string) => {
		setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, title:title} : tl))
	}

	const removeTodolist = (todolistId: string) => {
		setTodolists(todolists.filter(tl => tl.id !== todolistId))
		delete tasks[todolistId]
	}


	//UI

	const todolistsComp: Array<JSX.Element> = todolists.map(tl => {
		let tasksForTodolist = tasks[tl.id]

		if (tl.filter === 'active') {
			tasksForTodolist = tasksForTodolist.filter(task => !task.isDone)
		}

		if (tl.filter === 'completed') {
			tasksForTodolist = tasksForTodolist.filter(task => task.isDone)
		}

		return (
		<Todolist
					key={tl.id}
					todolistId={tl.id}
					title={tl.title}
					tasks={tasksForTodolist}
					removeTask={removeTask}
					changeFilter={changeFilter}
					addTask={addTask}
					changeTaskStatus={changeTaskStatus}
					filter={tl.filter}
					removeTodolist={removeTodolist}
					changeTaskTitle={changeTaskTitle}
					changeTodolistTitle={changeTodolistTitle}
				/>
			)
			})

	return (
				<div className="App">
					<AddItemForm addItem={addTodolist} />
					{todolistsComp}
	</div>
);
}

export default App;

