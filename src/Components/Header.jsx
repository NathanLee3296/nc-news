import { Link, useNavigate } from "react-router-dom";
import logo from "../Assets/Logo-transparent.png";
import SearchOffCanvas from "./SearchOffcanvas";
import { useEffect, useState } from "react";
import { Form, Row } from "react-bootstrap";
import { getArticleTopics } from "../Requests/makeRequests";
import { Button as ButtonMUI } from "@mui/material";

export default function Header() {
	const navigate = useNavigate();

	const [topics, setTopics] = useState([]);
	const [chosenTopic, setChosenTopic] = useState("All");

	const [showSearch, setShowSearch] = useState(false);
	const handleShowSearch = () => setShowSearch(true);

	useEffect(() => {
		getArticleTopics().then(({ data: { topics } }) => {
			setTopics(topics);
		});
	}, []);


	const handleSubmission = (e) => {
		navigate({
			pathname: `/search/${e}`,
		});
	};

	return (
		<div id="header">
			<img id="header-image" src={logo}></img>
			<nav id="navbar">
				<Link to="/">
					<ButtonMUI id="nav-link1">Front Page</ButtonMUI>
				</Link>
				|
				<ButtonMUI id="nav-link2" onClick={handleShowSearch}>
					Search
				</ButtonMUI>
				<SearchOffCanvas
					setShowSearch={setShowSearch}
					showSearch={showSearch}
				/>
			</nav>
			<Form.Select
				id="search-topic-header"
				onChange={(e) => {
					setChosenTopic(e.target.value)
					handleSubmission(e.target.value);
				}}
			>
				<option>All</option>
				{topics.map((topic) => {
					return (
						<option key={topic.slug} value={topic.slug}>
							{topic.slug}
						</option>
					);
				})}
			</Form.Select>
		</div>
	);
}
