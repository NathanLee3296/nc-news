import { useEffect, useState } from "react";
import {
	getArticleById,
	getCommentsByArticleId,
	patchVotes,
} from "../Requests/makeRequests";
import CommentAdder from "./CommentAdder";
import { useNavigate, useParams } from "react-router-dom";
import Badge from "@mui/material/Badge";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ErrorSnackbar from "./Snackbar";
import CommentList from "./CommentList";
import CommentIcon from "@mui/icons-material/Comment";

export default function Article() {
	const { id } = useParams();
	const [isLoadingArticle, setIsLoadingArticle] = useState(true);
	const [isLoadingComments, setIsLoadingComments] = useState(true);
	const [article, setArticle] = useState();
	const [comments, setComments] = useState();
	const [votes, setVotes] = useState();
	const [isError, setIsError] = useState(false);

	const navigate = useNavigate();

	const handleVote = (id, amount) => {
		setVotes((curr) => +curr + amount);
		patchVotes(id, amount).catch(() => {
			setIsError(true);
			setVotes((curr) => +curr - amount);
		});
	};

	useEffect(() => {
		getArticleById(id)
			.then((article) => {
				setArticle(article);
				setVotes(article.votes || "0");
				setIsLoadingArticle(false);
			})
			.catch(() => {
				navigate({
					pathname: `/*`,
				});
			});
	}, []);

	useEffect(() => {
		getCommentsByArticleId(id).then((comments) => {
			setComments(comments || []);
			setIsLoadingComments(false);
		});
	}, []);

	console.log(comments);

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
					<Badge id="article-votes" badgeContent={votes}>
						<ThumbUpIcon onClick={(e) => handleVote(article.article_id, 1)} />
						<ThumbDownIcon
							onClick={(e) => handleVote(article.article_id, -1)}
						/>
					</Badge>
					<Badge
						id="article-comment-count"
						badgeContent={article.comment_count}
					>
						<CommentIcon />
					</Badge>
					<img id="article-image" src={article.article_img_url}></img>
				</div>
			)}
			{!isLoadingComments && (
				<CommentAdder article={article} setComments={setComments} />
			)}

			{!isLoadingComments &&
				((comments.length != 0) ? (
					<CommentList comments={comments} setComments={setComments} />
				) : (
					<h4>Be the first to comment!</h4>
				))}
		</>
	);
}
