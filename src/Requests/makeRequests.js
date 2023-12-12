import axios from "axios";

export async function getArticleById(id) {
	try {
		const {
			data: { article },
		} = await axios.get(
			`https://news-server-gasb.onrender.com/api/articles/${id}`
		);
		return article;
	} catch {}
}

export async function getCommentsByArticleId(id) {
	try {
		const {
			data: { comments },
		} = await axios.get(
			`https://news-server-gasb.onrender.com/api/articles/${id}/comments`
		);
		return comments;
	} catch {}
}

export async function deleteCommentById(id) {
	const deleteComment = await axios.delete(
		`https://news-server-gasb.onrender.com/api/comments/${id}`
	);

	if (deleteComment.status === 204) {
		return true;
	} else {
		return false;
	}
}

export async function getArticles() {
	const {
		data: { articles },
	} = await axios.get("https://news-server-gasb.onrender.com/api/articles/");
	return articles;
}

export async function patchVotes(id, amount) {
	const vote = await axios.patch(
		`https://news-server-gasb.onrender.com/api/articles/${id}/`,
		{
			inc_votes: amount,
		}
	)
	
	if (vote.status === 200) return true;

	return false;

}
