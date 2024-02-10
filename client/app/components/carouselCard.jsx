"use client";
import { eventCardFormat } from "@/app/utility/formatDate";
import Image from "next/image";

export default function CarouselCard(props) {
	const { _id, name, society, date } = props.event;
	console.log(props.event);
	const imgPath = `https://res.cloudinary.com/dy3hecuzo/image/upload/v1701971490/Events/${name}.jpg`;
	// const imgPath = `https://pbs.twimg.com/profile_images/1605279612216348672/PCYJMyaB_400x400.png`
	const formattedDate = eventCardFormat(date);
	return (
		//     <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mt-6">
		//      <Image className = "rounded-t-lg " src={imgPath} alt="header img" width= "390" height="200" priority ={true} />
		//     <div className="p-">
		//     <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-1">{name}</h5>
		//     <p className="text-sm text-gray-700 dark:text-gray-400 line-clamp-1">{society}</p>
		//     <p> {formattedDate}</p>
		//     </div>
		// </div>

		<div className="max-w-sm bg-zinc-950 rounded-lg shadow  mt-6">
			<Image
				className="rounded-t-lg w-full h-48 object-cover"
				src={imgPath}
				alt="header img"
				width="390"
				height="200"
				priority={true}
			/>
			<div className="">
				<h1 className="mt-2 mb-2 text-left font-bold tracking-tight text-gray-900 dark:text-white text-base flex items-start">
					{name}
				</h1>
				<div className="">
					<p className="text-gray-700 dark:text-gray-400 line-clamp-1 mr-2 flex items-start text-[9px]">
						{society}
					</p>
					<p className="text-gray-700 dark:text-gray-400 flex items-start text-[12px]">
						{formattedDate}
					</p>
				</div>
			</div>
		</div>
	);
}
