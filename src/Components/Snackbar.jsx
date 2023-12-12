import Snackbar from "@mui/material/Snackbar";
import { useState } from "react";

export default function ErrorSnackbar({ errorMsg, setIsError}) {

  const [open, setOpen] = useState()


	const handleClose = (event) => {
		setIsError(false)
	};

	return <Snackbar open={true} message={errorMsg}  onClick={handleClose} />;
}
