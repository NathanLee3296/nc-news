import Skeleton from "@mui/material/Skeleton";
import { Stack } from "@mui/material";

export default function LoadingSkeleton({ numToRender }) {
	const skeleton = (
		<Stack spacing={-1}>
			{/* For variant="text", adjust the height via font-size */}
			<Skeleton
				sx={{ bgcolor: "rgba(221, 205, 198, 255)" }}
				variant="rectangular"
				width={350}
				height={75}
			/>
			<Skeleton
				sx={{ bgcolor: "rgba(221, 205, 198, 255)", fontSize: "4rem" }}
				variant="text"
			/>

			<Skeleton
				sx={{ bgcolor: "rgba(221, 205, 198, 255)" }}
				variant="rounded"
				width={350}
				height={150}
			/>
		</Stack>
	);

	return (
		<div className="skeleton-box">
			{Array(numToRender)
				.fill(1)
				.map((card, index) => (
					<div key={index}>
						<Stack spacing={-1}>
							<Skeleton
								sx={{ bgcolor: "rgba(221, 205, 198, 255)" }}
								variant="rectangular"
								width={400}
								height={75}
							/>
							<Skeleton
								sx={{ bgcolor: "rgba(221, 205, 198, 255)", fontSize: "4rem" }}
								variant="text"
							/>

							<Skeleton
								sx={{ bgcolor: "rgba(221, 205, 198, 255)" }}
								variant="rounded"
								width={400}
								height={150}
							/>
						</Stack>
					</div>
				))}
		</div>
	);
}
