import Image from "next/image"
import Link from "next/link"

export default function FacultyCard(props){
""
  const { _id, facultyName , description} = props.faculty
  console.log(props.faculty)

    const imgPath = "https://res.cloudinary.com/dekv3xmjm/image/upload/caramel/events/64c79c0b7bd1e0f15ef11476.jpg"
    return(
       
        <div className="relative mt-9 mr-4 ml-4 bg-zinc-900">
  {/* Image Section */}
  <Image className="rounded-t-lg" src={imgPath} alt="header img" width="500" height="200" priority={true} />

  {/* Overlay Section */}
  <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-end rounded-lg">
    {/* Content Section */}
    <div className="py-1 px-4 rounded-lg bg-black/50 text-white w-full h-full">
      {/* Faculty Name Section */}
      <h1 className="text-white font-bold text-sm hover:text-gray-900 hover:cursor-pointer mb-1  mt-6">{facultyName}</h1>

      {/* Description Section */}
      <p className="mb-4 text-[10px] mt-3 line-clamp-1">
        {description}
      </p>

      {/* Link Section */}
      <Link href={`faculty/${_id}`}>
        <button className="bg-violet-800 text-white px-4 py-2 rounded-md mt-3 text-[10px]">See Faculty</button>
      </Link>
    </div>
  </div>
</div>

    )

}