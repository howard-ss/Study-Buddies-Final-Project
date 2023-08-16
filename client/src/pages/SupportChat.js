import { useState, useEffect } from "react";
import "./SupportChat.css";

const SupportChat = () => {
	const [value, setValue] = useState(null);
	const [message, setMessage] = useState(null);
	const [previousChats, setPreviousChats] = useState([]);
	const [currentTitle, setCurrentTitle] = useState(null);

	// Hardcoded test messages
	// const testMessages = [
	// 	{
	// 		question: "What is your name?",
	// 		answer: "My name is CodeYourFuture.",
	// 	},
	// 	{
	// 		question: "What can you do?",
	// 		answer: "I can have conversations and try to be helpful!",
	// 	},
	// 	{
	// 		question: "How are you feeling today?",
	// 		answer:
	// 			"I'm an AI so I don't have real feelings, but my training is going well!",
	// 	},
	// ];

	const createNewChat = () => {
		setMessage(null);
		setValue("");
		setCurrentTitle(null);
	};

	const handleClick = (uniqueTitle) => {
		setCurrentTitle(uniqueTitle);
		setMessage(null);
		setValue("");
	};	
	
	const getMessages = async () => {
		const options = {
			method: "POST",
			body: JSON.stringify({
				message: value,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		};

		try {
			const response = await fetch(
				"http://localhost:3100/api/completions",
				options
			);
			const data = await response.json();
			setMessage(data.choices[0].message);
		} catch (error) {
			console.error(error);
		}
	};
	useEffect(() => {
		console.log(currentTitle, value, message);
		if (!currentTitle && value && message) {
			setCurrentTitle(value);
		}
		if (currentTitle && value && message) {
			setPreviousChats((prevChats) => [
				...prevChats,
				{
					title: currentTitle,
					role: "user",
					content: value,
				},
				{
					title: currentTitle,
					role: message.role,
					content: message.content,
				},
			]);
		}
	}, [message, currentTitle]);

	console.log(previousChats);

	const currentChat = previousChats.filter(
		(previousChat) => previousChat.title === currentTitle
	);
	const uniqueTitles = Array.from(
		new Set(previousChats.map((previousChat) => previousChat.title))
	);
	console.log(uniqueTitles);
	return (
		<div className="app">
			<section className="side-bar">
				<button onClick={{ createNewChat }}>+ New chat</button>
				<ul className="history">
					{uniqueTitles?.map((uniqueTitle, index) => (
						<li key={index} onClick={() => handleClick(uniqueTitle)}>
							{uniqueTitle}
						</li>
					))}
				</ul>
				<nav>
					<p>Ask Anything --- </p>
				</nav>
			</section>
			<section className="main">
				{!currentTitle && <h1>Talk With Me</h1>}
				<ul className="feed">
					{currentChat.map((chatMessage, index) => (
						<li key={index}>
							<p className="role">{chatMessage.role}</p>
							<p>{chatMessage.content}</p>
						</li>
					))}
				</ul>
				<div className="bottom-section">
					<div className="input-container">
						<input value={value} onChange={(e) => setValue(e.target.value)} />
						<div id="submit" onClick={getMessages}>
							➢
						</div>
					</div>
					<p className="info">
						Our goal is to make our web app more natural and safe to interact
						with.
					</p>
				</div>
			</section>
		</div>
	);
};

export default SupportChat;








