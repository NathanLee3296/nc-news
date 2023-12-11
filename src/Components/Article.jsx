import { useContext, useEffect, useState } from "react";
import {
	getArticleById,
	getCommentsByArticleId,
} from "../Requests/makeRequests";
import CommentCard from "./CommentCard";
import CommentAdder from "./CommentAdder";


export default function Article() {
	const [isLoadingArticle, setIsLoadingArticle] = useState(true);
	const [isLoadingComments, setIsLoadingComments] = useState(true);
	const [article, setArticle] = useState();
	const [comments, setComments] = useState();

  

	useEffect(() => {

		getArticleById(16).then((article) => {
      console.log(article);
			setArticle(article);
			setIsLoadingArticle(false);
		});
		getCommentsByArticleId(16).then((comments) => {
			setComments(comments);
			setIsLoadingComments(false);
		});
	}, []);

	return (
		<>
			{!isLoadingArticle && (
				<div className="article-container">
					<h1 id="article-title">{article.title}</h1>
					<section id="article-author-topic">
						<h6 id="article-topic">topic: {article.topic}</h6>
						<h4 id="article-author">Author: {article.author}</h4>
					</section>
					<p id="article-body">{article.body}</p>
					<p id="article-votes">Current Votes: {article.votes}</p>
					<p id="article-comm-count">
						Num of Comments: {article.comment_count}
					</p>
					<img className="article-image" src={article.article_img_url}></img>
				</div>
			)}
      {isLoadingComments && <CommentAdder/>}
			{!isLoadingComments && (
				<section className="comment-list">
					{comments.map((comment) => {
						return <CommentCard key={comment.comment_id} comment={comment} setComments={setComments} />;
					})}
				</section>
			)}
		</>
	);
}
