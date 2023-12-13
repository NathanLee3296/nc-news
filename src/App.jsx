import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import Article from "./Components/Article";
import Header from "./Components/Header";
import { Route, Routes } from "react-router-dom";
import ArticlesList from "./Components/ArticlesList";
import SearchPage from "./Components/Search";

function App() {
	return (
		<>
			<Header/>
      <Routes>
        <Route path="/" element={<ArticlesList/>}/>
				<Route path="/article/:id" element={<Article/>} />
				<Route path="/search/:topic" element={<SearchPage/>} />
      </Routes>
		</>
	);
}
export default App;