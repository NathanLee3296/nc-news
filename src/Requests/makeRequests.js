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

export async function getArticles({ author, topic, sort_by, order }) {
	if (topic === "All") topic = undefined;
	if (sort_by === "Select Query") sort_by = "created_at"
	const {
		data: { articles },
	} = await axios.get("https://news-server-gasb.onrender.com/api/articles", {
		params: {
			topic: topic,
			sort_by: sort_by,
			order: order,
		},
	});
	return articles;
}

export async function patchVotes(id, amount) {
	const vote = await axios.patch(
		`https://news-server-gasb.onrender.com/api/articles/${id}/`,
		{
			inc_votes: amount,
		}
	);

	if (vote.status === 200) return true;

	return false;
}

export async function postCommentByArticleID(
	articleId,
	commentText,
	username1
) {
	const comment = await axios.post(
		`https://news-server-gasb.onrender.com/api/articles/${articleId}/comments`,
		{ body: commentText, username: username1 }
	);

	return comment;
}

export async function getArticleTopics() {
	const topics = await axios.get(
		"https://news-server-gasb.onrender.com/api/topics"
	);
	return topics;
}
