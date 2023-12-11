import { Link } from "react-router-dom";

export default function Header() {
	return (
		<div id="header">
			<h1>NC-News</h1>
      <nav>
        <Link to="/">Articles</Link>
      </nav>
		</div>
	);
}
