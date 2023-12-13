import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticles } from "../Requests/makeRequests";
import ArticleList from "./ArticlesList";

export default function SearchPage() {
	const { topic } = useParams();
	const [articles, setArticles] = useState();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
    setIsLoading(true)
		getArticles({ topic: topic }).then((res) => {
			setArticles(res);
			setIsLoading(false);
		});
	}, [topic]);

	return <>{!isLoading && <ArticleList propArticles={articles} />}</>;
}
