
import { Link, useSearchParams } from "react-router-dom";
import CommentIcon from "@mui/icons-material/Comment";
import Badge from "@mui/material/Badge";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import axios from "axios";
import { useState } from "react";
import { patchVotes } from "../Requests/makeRequests";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ErrorSnackbar from "./Snackbar";
import moment from "moment";

export default function ArticleCard({ article }) {
	const [votes, setVotes] = useState(article.votes || "0");
	const [isError, setIsError] = useState(false);

	const handleVote = (id, amount) => {
		setVotes((curr) => +curr + amount);
		patchVotes(id, amount).catch(() => {
			setIsError(true);
			setVotes((curr) => +curr - amount);
		});
	};

	return (
		<div className="article-card">
			{isError && (
				<ErrorSnackbar
					errorMsg="Failed to vote on article"
					setIsError={setIsError}
				/>
			)}
			<Link
				to={`/article/${article.article_id}`}
				className="article-card-title"
			>
				{article.title}
			</Link>
			<h4 className="article-card-author">{article.author}</h4>
			<h5 className="article-card-topic">{article.topic}</h5>
			<img className="article-card-img" src={article.article_img_url} />
			<Badge className="article-card-votes" badgeContent={votes}>
				<ThumbUpIcon onClick={(e) => handleVote(article.article_id, 1)} />
				<ThumbDownIcon onClick={(e) => handleVote(article.article_id, -1)} />
			</Badge>
			<Badge
				className="article-card-comment-count"
				badgeContent={article.comment_count}
			>
				<CommentIcon />
			</Badge>
			<p className="article-card-date">
				{moment.utc(article.created_at).local().startOf('seconds').fromNow()}
			</p>
		</div>
	);
}
