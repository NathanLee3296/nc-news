import { Link } from "react-router-dom";
import logo from "../Assets/Logo-transparent.png"

export default function Header() {
	return (
		<div id="header">
			<img id="header-image" src={logo}></img>
      <nav id="navbar">
        <Link to="/">Front Page</Link>
				|
				<Link to="/search">Search</Link>
      </nav>
		</div>
	);
}