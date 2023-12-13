import { Link } from "react-router-dom";
import logo from "../Assets/Logo-transparent.png";
import SearchOffCanvas from "./SearchOffcanvas";
import { useState } from "react";
import { Button } from "@mui/material";

export default function Header() {
	const [showSearch, setShowSearch] = useState(false);
	const handleShowSearch = () => setShowSearch(true);
	return (
		<div id="header">
			<img id="header-image" src={logo}></img>
			<nav id="navbar">
				<Link to="/">
					<Button id="nav-link1">Front Page</Button>
				</Link>
				|
				<Button id="nav-link2" onClick={handleShowSearch}>
					Search
				</Button>
				<SearchOffCanvas
					setShowSearch={setShowSearch}
					showSearch={showSearch}
				/>
			</nav>
		</div>
	);
}
