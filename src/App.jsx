import { useState } from "react";
import "./App.css";
import Article from "./Components/Article";
import Header from "./Components/Header";
import { Route, Routes } from "react-router-dom";
import ArticlesList from "./Components/ArticlesList";

function App() {
	return (
		<>
			<Header/>
      <Routes>
        <Route path="/" element={<ArticlesList/>}/>
				<Route path="/article" element={<Article/>} />
      </Routes>
		</>
	);
}
export default App;