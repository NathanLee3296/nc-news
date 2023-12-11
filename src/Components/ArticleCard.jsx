import { humanized_time_span } from "../Utils/humanized_time_span"


export default function ArticleCard({ article }) {

  return (
    <div className="article-card">
    <h3 className="article-title">{article.title}</h3>
    <h4 className="article-author">{article.author}</h4>
    <h5 className="article-topic">{article.topic}</h5>
    <img className="article-img-card" src={article.article_img_url}/>
    <p className="article-votes" >Votes: {article.votes}</p>
    <p className="article-comment-count"> No of Comments: {article.comment_count}</p>
    <p className="article-date">{humanized_time_span(article.created_at)}</p>
    </div>
  )

}