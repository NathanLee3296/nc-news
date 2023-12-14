import { Alert } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";

export default function ErrorSnackbar({ errorMsg, setIsError }) {
	const handleClose = (event) => {
		setIsError(false);
	};

	return (
		<Snackbar open={true} onClick={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
			<Alert severity="error">{errorMsg}</Alert>
		</Snackbar>
	);
}
