
import "./App.css";
import Article from "./Components/Article";
import Header from "./Components/Header";
import { Route, Routes } from "react-router-dom";


function App() {
	return (
		<>
			<Header/>
      <Routes>
				<Route path="/article" element={<Article/>} />
      </Routes>
		</>
	);
}
export default App;
