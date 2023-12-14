
import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { createSearchParams, useNavigate } from "react-router-dom";
import { getArticleTopics } from "../Requests/makeRequests";

function SearchOptions({ handleClose }) {
	const [topics, setTopics] = useState([]);
	const [chosenTopic, setChosenTopic] = useState("All");
	const [chosenSortBy, setChosenSortBy] = useState("created_at");
	const [chosenOrder, setChosenOrder] = useState("DESC");

	const navigate = useNavigate();
	const queries = {"created_at" : "Date Posted", "votes" : "Votes"} ;
	const orderBy =  {"DESC" : "Descending", "ASC" : "Ascending" }

	useEffect(() => {
		getArticleTopics().then(({ data: { topics } }) => {
			setTopics(topics);
		});
	}, []);

	const handleSubmission = (e) => {
		e.preventDefault();

		const params = { SortBy: chosenSortBy, Order: chosenOrder };

		navigate({
			pathname: `/search/${chosenTopic}`,
			search: `?${createSearchParams(params)}`,
		});

		handleClose();
	};

	return (
		<>
			<Form>
				<Col>
					<Form.Label>Topics</Form.Label>
					<Form.Select
						id="search-topic"
						onChange={(e) => {
							setChosenTopic(e.target.value);
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
				</Col>
				<Row>
					<Col>
						<Form.Label>Sort By</Form.Label>
						<Form.Select
							id="search-sortby"
							onChange={(e) => {
								setChosenSortBy(e.target.value);
							}}
						>
							<option>Select Query</option>
							{Object.keys(queries).map((query) => {
								return (
									<option key={query} value={query}>
										{queries[query]}
									</option>
								);
							})}
						</Form.Select>
					</Col>
					<Col>
						<Form.Label>Order By</Form.Label>
						<Form.Select
							id="search-orderby"
							onChange={(e) => {
								setChosenOrder(e.target.value);
							}}
						>
							{Object.keys(orderBy).map((order) => {
								return (
									<option key={order} value={order}>
										{orderBy[order]git s}
									</option>
								);
							})}
						</Form.Select>
					</Col>
				</Row>
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
