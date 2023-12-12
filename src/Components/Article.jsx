import { useContext, useEffect, useState } from "react";
import {
	getArticleById,
	getCommentsByArticleId,
	patchVotes,
} from "../Requests/makeRequests";
import CommentCard from "./CommentCard";
import CommentAdder from "./CommentAdder";
import { useParams } from "react-router-dom";
import Badge from "@mui/material/Badge";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ErrorSnackbar from "./Snackbar";
import CommentList from "./CommentList";

export default function Article() {
	const { id } = useParams();
	const [isLoadingArticle, setIsLoadingArticle] = useState(true);
	const [isLoadingComments, setIsLoadingComments] = useState(true);
	const [article, setArticle] = useState();
	const [comments, setComments] = useState();
	const [votes, setVotes] = useState();
	const [isError, setIsError] = useState(false);

	const handleVote = (id, amount) => {
		setVotes((curr) => +curr + amount);
		patchVotes(id, amount).catch(() => {
			setIsError(true);
			setVotes((curr) => +curr - amount);
		});
	};

	useEffect(() => {
		getArticleById(id).then((article) => {
			setArticle(article);
			setVotes(article.votes || "0");
			setIsLoadingArticle(false);
		});
		getCommentsByArticleId(id).then((comments) => {
			setComments(comments);
			setIsLoadingComments(false);
		});
	}, []);

	return (
		<>
			{isError && (
				<ErrorSnackbar
					errorMsg="Failed to vote on article"
					setIsError={setIsError}
				/>
			)}
			{!isLoadingArticle && (
				<div className="article-container">
					<h1 id="article-title">{article.title}</h1>
					<h6 id="article-topic">topic | {article.topic}</h6>
					<h4 id="article-author">Author | {article.author}</h4>
					<p id="article-body">{article.body}</p>
					<Badge className="article-votes" badgeContent={votes}>
						<ThumbUpIcon onClick={(e) => handleVote(article.article_id, 1)} />
						<ThumbDownIcon
							onClick={(e) => handleVote(article.article_id, -1)}
						/>
					</Badge>
					<p id="article-comm-count">
						Num of Comments: {article.comment_count}
					</p>
					<img className="article-image" src={article.article_img_url}></img>
				</div>
			)}
			{isLoadingComments && <CommentAdder />}
			{!isLoadingComments && comments ? (
				<CommentList comments={comments} />
			) : (
				<h1>no comments</h1>
			)}
		</>
	);
}
