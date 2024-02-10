import Image from "next/image";

export default async function ProfileCard(props) {
	const { username, faculty, intake, firstName, lastName } = props.user;
	return (
		<div className="p-5 text- text-black max-w-sm ">
			<div className="flex justify-center">
				<Image
					className="w-32 h-32 rounded-full mx-auto border-black border-1 object-cover"
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

					<div className="bg-white p-2 text-xs rounded-lg text-black">
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
					<p className="text-base font-bold text-white">{intake}</p>
				</div>

				<div>
					<p className="text-xs text-white">Faculty</p>
					<p className="text-base font-bold text-white">{faculty}</p>
				</div>

				<div>
					<p className="text-xs text-white">Degree</p>
					<p className="text-base font-bold text-white">Software Eng.</p>
				</div>
			</div>
		</div>
	);
}
