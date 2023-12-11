import axios from "axios"


export default async function getArticles() {
  const {data : {articles}} = await axios.get("https://news-server-gasb.onrender.com/api/articles/")
  return articles;

}
