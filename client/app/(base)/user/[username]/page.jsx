import Image from "next/image";
import Link from "next/link";
import getData from "@/app/utility/getData.js";
import EventList from "@/app/components/eventList";

export default async function Profile({ params }) {
	const response = await fetch(
		`http://localhost:3001/profiles/${params.username}`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		}
	);
	const user = await response.json();
	const { username, faculty, intake, firstName, lastName } = user;
	const joinedEvents = user.eventId;

	console.log(user);

	const imgPath = `https://res.cloudinary.com/dy3hecuzo/image/upload/v1691679809/ProfilePics/${username}.jpg`;
	console.log(imgPath);

	return (
		<div className="p-4 bg-zinc-950">
			{/* Header for logout button */}
			<div className="flex justify-end">
				<Link href="http://localhost:3000/api/auth/signout">
					<button className=" mr-4 mt-4 ">
						{" "}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="#ffffff"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							className="w-6 h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
							/>
						</svg>
					</button>
				</Link>
			</div>

			<div className="grid h-auto">
				<div className="p-5 text-black max-w-sm ">
					<div className="flex justify-center">
						<Image
							className="w-32 h-32 rounded-full mx-auto border-black border-1 object-cover mr-6"
							src={imgPath}
							alt="profile-picture"
							width="128"
							height="128"
						/>

						<div className="text-mt-5">
							<div>
								<p className="text-4xl text-white">{firstName}</p>

								<p className="text-sm text-white">{lastName}</p>
							</div>

							<div className="bg-white p-2 text-xs rounded-lg text-black mt-2">
								<p>@{username}</p>
							</div>
						</div>
					</div>

					{/* Bio (not needed) */}

					{/* <p className="mt-2 text-sm text-black">
						Lorem ipsum dolor sit amet, consecte adipisicing elit. Voluptatibus
						quia. Maiores et perferendis eaque.
					</p> */}

					{/* <p className="mt-2 text-sm text-black">
						Faculty of {faculty}
						<br />
						Intake {intake}
					</p> */}

					<div className="flex justify-center gap-x-8 mt-12 text-center">
						<div className="">
							<p className="text-xs text-white">Intake</p>
							<p className="text-base mt-1 text-white">{intake}</p>
						</div>

						<div>
							<p className="text-xs text-white">Faculty</p>
							<p className="text-base mt-1 text-white">{faculty}</p>
						</div>

						<div>
							<p className="text-xs text-white">Degree</p>
							<p className="text-base mt-1 text-white line-clamp-1">
								Software Eng.
							</p>
						</div>
					</div>
				</div>
				<p className="text-white text-xs pt-9">
					Your profile is private. All information on this page is only visible
					to you.
				</p>

				{/* Event List */}
				<div className="">
					<h2 className="text-white pt-5"> Registered Events</h2>
					<br />
					<ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
						<EventList joinedEvents={joinedEvents} />
					</ul>
				</div>
			</div>
		</div>
	);
}
