import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getArticles } from "../Requests/makeRequests";
import ArticleList from "./ArticlesList";

export default function SearchPage() {
	const { topic } = useParams();
	const [searchParams, setSearchParams] = useSearchParams();
	const [articles, setArticles] = useState();
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		setIsLoading(true);
		getArticles({
			topic: topic,
			sort_by: searchParams.get("SortBy"),
			order: searchParams.get("Order"),
		}).then((res) => {
			setArticles(res);
			setIsLoading(false);
		});
	}, [topic, searchParams]);

	return <>{!isLoading && <ArticleList propArticles={articles} />}</>;
}
