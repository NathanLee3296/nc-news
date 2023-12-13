import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import { Stack } from "@mui/material";
import { getArticles } from "../Requests/makeRequests";

export default function ArticleList({ propArticles }) {
	const [articleList, setArticleList] = useState(propArticles || undefined);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
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
			<h2 id="article-list-header">Articles</h2>
			<section id="article-list">
				{!isLoading ? (
					articleList.map((article) => {
						return <ArticleCard key={article.article_id} article={article} />;
					})
				) : (
					<Stack spacing={1}>
						{/* For variant="text", adjust the height via font-size */}
						<Skeleton variant="text" sx={{ fontSize: "1rem" }} />

						{/* For other variants, adjust the size with `width` and `height` */}
						<Skeleton variant="circular" width={40} height={40} />
						<Skeleton variant="rectangular" width={210} height={60} />
						<Skeleton variant="rounded" width={210} height={60} />
					</Stack>
				)}
			</section>
		</>
	);
}
