import CommentCard from "./CommentCard";



export default function CommentList( {comments, setComments} ) {
	return (
		<section className="comment-list">
			{comments.map((comment) => {
				return (
					<CommentCard
						key={comment.comment_id}
						comment={comment}
						setComments={setComments}
					/>
				);
			})}
		</section>
	);
}
