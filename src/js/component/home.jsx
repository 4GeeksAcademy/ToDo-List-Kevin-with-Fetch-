import React, { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

const Home = () => {
	const [task, setTask] = useState (["sacar al perro", "hacer la cama","preparar la cena"])
	const [input, setInput] = useState ("")
	const [isHovered, setIsHovered] = useState([])

	const handleChange = (event) => {setInput(event.target.value)}

	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			setTask ([...task,input])
			setInput ("")
		}
	}
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
		newTask.splice (index, 1);
		setTask (newTask);
	};

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
							{tarea}
							{isHovered[index] && <FaRegTrashAlt onClick={() => handleDeleteTask(index)}/>}
						</li>
					);
				})}
			</ul>
		</div>
		</div>
	);
};

export default Home;