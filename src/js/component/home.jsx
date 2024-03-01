import React, { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

//include images into your bundle

//create your first component
const Home = () => {
	const [task, setTask] = useState (["sacar al perro", "hacer la cama","preparar la cena"])
	const [input, setInput] = useState ("")
	const [isHovered, setIsHovered] = useState(false)

	const handleChange = (event) => {setInput(event.target.value)}
	console.log (input);
	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			setTask ([...task,input])
			setInput ("")
		}
	}


	return (
		<div className="taskNews">
			<input type="text" name="" id="" onChange={handleChange} value={input} onKeyDown={handleKeyDown} />
			<ul>
				{task.map((tarea) => {
					return (
						<li onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
							{tarea}
							{isHovered && <FaRegTrashAlt />}
						</li>
					)
				})}
			</ul>
		</div>
	);
};

export default Home;
