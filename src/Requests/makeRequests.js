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
  } else {return false;}

}
