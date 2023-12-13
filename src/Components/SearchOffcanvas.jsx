import Offcanvas from "react-bootstrap/Offcanvas";
import SearchOptions from "./SearchOptions";

const SearchOffcanvas = ({ setShowSearch, showSearch }) => {
	const handleClose = () => setShowSearch(false);

	return (
		<>
			<Offcanvas
				show={showSearch}
				onHide={handleClose}
				placement={"top"}
				name={"searchCanvas"}
        id="search-canvas"
			>
				<Offcanvas.Header >
				</Offcanvas.Header>
				<Offcanvas.Body>
					<SearchOptions handleClose= {handleClose} />
				</Offcanvas.Body>
			</Offcanvas>
		</>
	);
};

export default SearchOffcanvas;