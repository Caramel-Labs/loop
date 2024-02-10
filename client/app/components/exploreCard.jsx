import Image from "next/image";

export default function ExploreCard(props) {
	const imgPath =
		"https://res.cloudinary.com/dy3hecuzo/image/upload/v1702000270/faculty.jpg";
	return (
		<div className="relative bg-white shadow-xl hover:shadow-xl transition duration-500 rounded-lg border-1 my-5 mt-9 mx-4">
			<Image
				className="rounded-lg"
				src={imgPath}
				alt="header img"
				width="500"
				height="200"
				priority={true}
			/>
			<div className="absolute inset-0 flex flex-col justify-end rounded-lg">
				<div className="bg-black/50 text-white w-full h-16 p-6 rounded-b-lg">
					<h1 className="text-white font-bold text-base  line-clamp-1 ">
						{props.name}
					</h1>
				</div>
			</div>
		</div>
	);
}
