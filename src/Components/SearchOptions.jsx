import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getArticleTopics } from "../Requests/makeRequests";

function SearchOptions({ handleClose }) {
	const [topics, setTopics] = useState([]);
	const [chosenTopic, setChosenTopic] = useState();

	const navigate = useNavigate();

	useEffect(() => {
		getArticleTopics().then(({ data: { topics } }) => {
			setTopics(topics);
		});
	}, []);

	const handleSubmission = (e) => {
		e.preventDefault();
		navigate(`/search/${chosenTopic}`);
		handleClose();
	};

	return (
		<>
			<Form>
				<Col>
					<Form.Label>Topics</Form.Label>
					<Form.Select
						id="search-category"
						onChange={(e) => {
							setChosenTopic(e.target.value);
						}}
					>
						<option>Select Topic</option>
						{topics.map((topic) => {
							return (
								<option key={topic.slug} value={topic.slug}>
									{topic.slug}
								</option>
							);
						})}
					</Form.Select>
				</Col>
				<Col>
					<Button
						type="submit"
						id="search-button"
						disabled={!chosenTopic || chosenTopic === "Select Topic"}
						onClick={(e) => {
							handleSubmission(e);
						}}
					>
						Submit
					</Button>
				</Col>
			</Form>
		</>
	);
}

export default SearchOptions;
