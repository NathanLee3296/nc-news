import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { useContext, useState } from "react";
import { Button } from "@mui/base/Button";
import { UserContext } from "../Context/User";
import { postCommentByArticleID } from "../Requests/makeRequests";
import { humanized_time_span } from "../Utils/humanized_time_span";

export default function CommentAdder({ article, setComments }) {
	const [textValue, setTextValue] = useState();
	const [placeholder, setPlaceholder] = useState("Enter Your Comment Here!!");

	const { currUser, setCurrUser } = useContext(UserContext);

	const handleCommentSubmit = (e) => {
		setComments((currComments) => {
			const date = Date.now();
			let newComment = [
				{
					comment_id: -1,
					author: currUser.username,
					body: textValue,
					created_at: Date.now(),
					votes: 0,
				},
			];

			return [...newComment, ...currComments];
		});

		postCommentByArticleID(article.article_id, textValue, currUser.username)
			.then(({ data: { comment } }) => {
				setTextValue("");
				setPlaceholder("!Comment posted successfully!");

				setComments((currComments) => {
					return currComments.map((currComment) => {
						if (currComment.comment_id === -1)
							currComment.comment_id = comment.comment_id;
						return currComment;
					});
				});
			})
			.catch((res) => {
				setComments((currComments) => {
					return currComments.filter(
						(currComment) => currComment.comment_id != -1
					);
				});
			});
	};

	return (
		<section className="comment-adder">
			<TextareaAutosize
				aria-label="Post comment box - type here"
				className="comment-text-box"
				value={textValue}
				minRows={2}
				onChange={(e) => {
					setTextValue(e.target.value);
				}}
				placeholder={placeholder}
			/>
			<Button
				className="btn comment-button"
				disabled={!textValue}
				onClick={(e) => {
					handleCommentSubmit(e);
				}}
			>
				Post Comment
			</Button>
		</section>
	);
}
