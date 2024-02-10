"use client";
import Image from "next/image";
import { useState } from "react";
import {
	parseStringToDate,
	getTimeDifference,
} from "@/app/utility/getDaysLeft";
import { eventCardFormat } from "@/app/utility/formatDate";

export default function EventCard(props) {
	const { i, name, society, date, venue } = props.event;

	const imgPath = `https://res.cloudinary.com/dy3hecuzo/image/upload/v1701971490/Events/${name}.jpg`;
	const fallBackPath = "/../public/event-bg.jpg";
	const formattedDate = eventCardFormat(date);
	// const parsedDate = parseStringToDate(date, time)
	// const timeLeft = getTimeDifference(parsedDate)

	// posting data of joined events to the API
	// async function handleClick() {
	//   setJoin(true)

	//   const data = {
	//     user_id: currentUser._id,
	//     event_id: _id
	//   }

	//   const response = await fetch('http://localhost:3001/profiles/join', {
	//     method: 'POST',
	//     headers: {
	//       'Content-Type': 'application/json'
	//     },
	//     body: JSON.stringify(data)
	//   })

	//   if (response.ok) {
	//     console.log("Event joined successfully")
	//   } else {
	//     console.log("Event join failed")
	//     setJoin(false)
	//   }

	// }

	return (
		// <div key={i}className="bg-white relative drop-shadow-xl hover:shadow-xl transition duration-500 rounded-lg border-slate-300 border-1 my-5">
		//     <Image className = "rounded-t-lg " src={imgPath} alt="header img" width= "390" height="200" priority ={true} />
		//     <div className="py-1 px-4 rounded-lg bg-white flex justify-between">
		//       <div className='flex flex-col justify-center'>
		//         <h1 className="text-gray-700 font-bold text-xl hover:text-gray-900 hover:cursor-pointer mr-50 ml-50 my-1 line-clamp-1">{name}</h1>
		//         <p className="text-gray-700 tracking-wide text-sm">{society}</p>
		//       </div>

		//       <div>
		//         <p> where {venue}</p>
		//         <p> when {formattedDate}</p>
		//       </div>
		//     </div>
		//     {/* <div className="absolute top-4 right-4 py-1.5 px-3 bg-black rounded-lg">
		//       <span className="text-md text-white text-xs">{timeLeft} more</span>
		//     </div> */}
		//   </div>
		<div
			key={i}
			className="relative w-full max-w-[48rem] flex  bg-clip-border text-gray-700 shadow-md mt-9 rounded-lg bg-zinc-950 "
		>
			<div className="relative m-0 w-2/5 shrink-0 overflow-hidden bg-clip-border text-gray-700 flex items-center rounded-lg bg-zinc-950 ">
				<img
					src={imgPath}
					alt="image"
					className="h-48 w-48 object-cover rounded-lg"
				/>
			</div>
			<div className="p-6 pr-0 bg-zinc-950 rounded-lg w-3/5">
				<h4 className="mb-2 font-sans text-based  leading-snug tracking-normal text-blue-gray-900 antialiased text-base font-bold text-white line-clamp-1">
					{name}
				</h4>
				<p className="mb-2 font-sans  antialiased text-xs line-clamp-1 text-white text-[10px]">
					{society}
				</p>
				<div className="mb-2 text-white">
					<div className="flex mb-2">
						<div className="w-1/2 pr-2">
							<p className="text-[9px] mt-4">Date:</p>
							<p className="text-xs mt-2">
								{new Date(formattedDate).toLocaleDateString()}
							</p>
						</div>
						<div className="w-1/2 pl-2">
							<p className="text-[9px] mt-4">Venue:</p>
							<p className="text-xs mt-2 line-clamp-1">{venue}</p>
						</div>
					</div>
				</div>
				{/* Add more details if needed */}
			</div>
		</div>
	);
}
