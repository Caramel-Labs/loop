"use client";
import Image from "next/image";
import {
	parseStringToDate,
	getTimeDifference,
} from "@/app/utility/getDaysLeft";

import Link from "next/link";

export default function EventList(props) {
	const joinedEvents = props.joinedEvents;

	function handleDaysLeft(date, time) {
		const parsedDate = parseStringToDate(date, time);
		const timeLeft = getTimeDifference(parsedDate);
		return timeLeft;
	}

	return joinedEvents.map((event, i) => (
		<Link key={i} href={`../event/${event._id}`}>
			<li key={i} className="py-3 sm:py-4">
				<div className="flex items-center space-x-4 pb-2">
					<div className="flex-shrink-0">
						<Image
							className="rounded-full"
							src="/../public/rota.jpeg"
							alt="event-image"
							width="32"
							height="32"
						/>
					</div>
					<div className="flex-1 min-w-0">
						<p className="text-xs font-medium text-white truncate">
							{event.name}
						</p>
						<p className="text-[10px] text-white truncate">{event.society}</p>
					</div>
					<div className="inline-flex items-center font-semibold text-white text-xs">
						{handleDaysLeft(event.date, event.time)} <br />
						more
					</div>
				</div>
				<hr className="h-px border-gray-700" />
			</li>
		</Link>
	));
}
