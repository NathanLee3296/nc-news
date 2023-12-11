import axios from "axios";
import { useEffect, useState } from "react";
import getArticles from "../Requests/makeRequests";
import ArticleCard from "./ArticleCard";

export default function Articles() {
	const [articleList, setArticleList] = useState();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		getArticles().then((articles) => {
			setArticleList(articles);
			setIsLoading(false);
		});
	}, []);

	return (
		<>
			<h2 id="article-list-header">Articles</h2>
			<section id="article-list">
				{isLoading && <p>page loading</p>}
				{!isLoading &&
					articleList.map((article) => {
						return <ArticleCard key={article.article_id} article={article} />;
					})}
			</section>
		</>
	);
}
