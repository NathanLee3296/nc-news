import { useState } from "react";
import "./App.css";
import Header from "./Components/Header";
import { Route, Routes } from "react-router-dom";
import Articles from "./Components/Articles";

function App() {
	return (
		<>
			<Header/>
      <Routes>
        <Route path="/" element={<Articles/>}/>
      </Routes>
		</>
	);
}
export default App;
