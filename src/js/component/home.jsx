import React, { useState, useEffect } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

const Home = () => {
	const [task, setTask] = useState([])
	const [input, setInput] = useState("")
	const [isHovered, setIsHovered] = useState([])

	////////SE USA PARA AGREGAR TAREAS A MI API///////

	useEffect(() => {
		fetch('https://playground.4geeks.com/apis/fake/todos/user/kevingabri', { method: "GET" })
			.then(response => response.json())
			.then(data => setTask(data))
			.catch(error => ('Error fetching data:', error));
	}, []);

	/* (probe usar este useEffect para arreglarlo)
	useEffect ( () => {
		updateList ();
	}, [task]); */

	const updateList = () => {
		console.log(task);
		fetch('https://playground.4geeks.com/apis/fake/todos/user/kevingabri', {
			method: "PUT",
			body: JSON.stringify(task),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then(response => response.json())
			.then(data => console.log(data))
			.catch(error => ('Error fetching data:', error));
	}

	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			setTask([...task, { done: false, label: input }])
			updateList()
			setInput([])
		}
	}

	const handleChange = (event) => { setInput(event.target.value) }

	const handleMouseEnter = (index) => {
		const newHovered = [...isHovered];
		newHovered[index] = true;
		setIsHovered(newHovered);
	};

	const handleMouseLeave = (index) => {
		const newHovered = [...isHovered];
		newHovered[index] = false;
		setIsHovered(newHovered);
	};

	const handleDeleteTask = (index) => {
		const newTask = [...task];
		newTask.splice(index, 1);
		setTask(newTask);
	};

	const deleteTask = () => {
		fetch('https://playground.4geeks.com/apis/fake/todos/user/kevingabri', {
			method: "DELETE"
		},
		)
			.then(response => response.json())
			.then(data => {
				console.log(data);
				setTask([]);
			})
			.catch(error => ('Error fetching data:', error));
	}

	return (
		<div className="home-container">
			<div className="taskNews">
				<input type="text" name="" id="" placeholder="¿Que tienes que hacer?" onChange={handleChange} value={input} onKeyDown={handleKeyDown} />
				<ul>
					{task.map((tarea, index) => {
						return (
							<li
								key={index}
								onMouseEnter={() => handleMouseEnter(index)}
								onMouseLeave={() => handleMouseLeave(index)}>
								{tarea.label}
								{isHovered[index] && <FaRegTrashAlt onClick={() => handleDeleteTask(index)} />}
							</li>
						);
					})}
				</ul>
				<button onClick={deleteTask} className="buttonDelete">Borrar lista</button>
			</div>
		</div>
	);
};

export default Home;