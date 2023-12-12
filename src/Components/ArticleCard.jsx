import { humanized_time_span } from "../Utils/humanized_time_span";
import { Link } from "react-router-dom";
import CommentIcon from '@mui/icons-material/Comment';
import Badge from '@mui/material/Badge';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

export default function ArticleCard({ article }) {
	return (
		<div className="article-card">
			<Link to={`/article/${article.article_id}`} className="article-title">
				{article.title}
			</Link>
			<h4 className="article-author">{article.author}</h4>
			<h5 className="article-topic">{article.topic}</h5>
			<img className="article-img-card" src={article.article_img_url} />
			<Badge className="article-votes" badgeContent={article.votes || "0"}>
				<ThumbUpIcon/>
			</Badge>
			<Badge className="article-comment-count" badgeContent={article.comment_count}>
				<CommentIcon/>
			</Badge>

			<p className="article-date">{humanized_time_span(article.created_at)}</p>
		</div>
	);
}
