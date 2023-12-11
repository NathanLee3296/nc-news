import { useState } from "react";
import "./App.css";
import Header from "./Components/Header";
import { Route, Routes } from "react-router-dom";
import ArticlesList from "./Components/ArticlesList";

function App() {
	return (
		<>
			<Header/>
      <Routes>
        <Route path="/" element={<ArticlesList/>}/>
      </Routes>
		</>
	);
}
export default App;