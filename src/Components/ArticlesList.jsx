import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import { getArticles } from "../Requests/makeRequests";
import ErrorSnackbar from "./Snackbar";
import LoadingSkeleton from "./ArticleListLoadingSkeleton";

export default function ArticleList({ propArticles, error }) {
	const [articleList, setArticleList] = useState(propArticles || undefined);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		if (error === "true") {
			setIsError(true);
		}
		if (!articleList) {
			getArticles({}).then((articles) => {
				setArticleList(articles);
				setIsLoading(false);
			});
		} else {
			setIsLoading(false);
		}
	}, []);

	return (
		<>
			{isError && (
				<ErrorSnackbar
					errorMsg="Navigated to incorrect URL"
					setIsError={setIsError}
				/>
			)}
			<h2 id="article-list-header">Articles</h2>
			<section id="article-list">
				{!isLoading ? (
					articleList.map((article) => {
						return <ArticleCard key={article.article_id} article={article} />;
					})
				) : (
					<LoadingSkeleton numToRender={3}/>
				)}
			</section>
		</>
	);
}
