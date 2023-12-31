import { useContext, useState } from "react";
import { UserContext } from "../Context/User";
import { deleteCommentById } from "../Requests/makeRequests";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ErrorSnackbar from "./Snackbar";
import moment from "moment";

export default function CommentCard({ comment, setComments }) {
	const { currUser, setCurrUser } = useContext(UserContext);
	const canDelete = currUser.username === comment.author;

	const handleDelete = (id) => {
		setComments((currComments) => {
			return currComments.filter((currComment) => {
				if (currComment.comment_id != comment.comment_id) return comment;
			});
		});
		deleteCommentById(id).catch(() => {

		});
	};

	return (
		<div className="comment-card">
			<h3 className="comment-author">{comment.author}</h3>
			<p className="comment-body">{comment.body}</p>
			<p className="comment-time">{moment.utc(comment.created_at).local().startOf('seconds').fromNow()}</p>
			<div className="comment-votes">
				<ThumbUpIcon className="comment-thumb-up" />
				<p>{comment.votes}</p>
				<ThumbDownIcon className="comment-thumb-down" />
			</div>
			{canDelete && (
				<button
					onClick={(e) => {
						handleDelete(comment.comment_id);
					}}
				>
					Delete Comment
				</button>
			)}
		</div>
	);
}
