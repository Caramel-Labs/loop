
import Link from 'next/link'
import Image from 'next/image'
import EventCard from '@/app/components/eventCard'

export default async function Society({ params }) {


  const getSociety = await fetch(`http://localhost:3001/society/${params.id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })

  const response = await getSociety.json()
  console.log(response)
  const imgPath = "https://res.cloudinary.com/dekv3xmjm/image/upload/caramel/events/64c79c0b7bd1e0f15ef11476.jpg"
  const { societyName, description, volunteers, events } = response

  const avatarPath1 = `https://res.cloudinary.com/dy3hecuzo/image/upload/v1691679809/ProfilePics/kalana2001.jpg`
  const avatarPath2 = `https://res.cloudinary.com/dy3hecuzo/image/upload/v1691679809/ProfilePics/lasindu2001.jpg`
  const avatarPath3 = `https://res.cloudinary.com/dy3hecuzo/image/upload/v1691679809/ProfilePics/ravindu2001.jpg`


  return (
    <div className='bg-zinc-950 h-auto'>
    <Image height="400" width="800" src={imgPath} alt='hero-image' />
    <h1 className='text-[24px] font-bold mt-6 ml-4 text-white'>{societyName}</h1>
    {/* already joined user avatars */}
    <div className="flex -space-x-4 mt-6 ml-4">
    <img className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src={avatarPath1} alt="" />
            <img className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src={avatarPath2} alt="" />
             <img className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src={avatarPath3} alt="" />
      <div className="w-3/4 p-4 ml-2 text-xs text-black">
        <p className='mt- text-[8px] text-white'>{volunteers.length} followers</p>
      </div>
      <div className="mr-4 ronded-lg">
        <button className="bg-blue-500 text-white w-14 h-7 text-[10px] rounded-lg mr-4">Follow</button>
      </div>
    </div>
  
    {/* event description */}
    <p className='text-[12px] ml-4 text-white'>{description}</p>
  
    <h2 className='mt-6 text-[20px] ml-4 text-white'> Events </h2>
    {/* event list */}
    <div className=' mx-4 mt-6 '> 
      {events.map((event, i) => (
        <Link key={i} href={`event/${event._id}`}>
          <EventCard key={i} event={event} />
        </Link>
      ))}
    </div>
  
    {/* Manage society */}
    <div>
      <h2 className='text-white mt-9 text-[20px] ml-4'> Manage this society</h2>
      <p className='text-white mt-6 text-[12px] ml-4'> If you are a public team member, apply as admin</p>
      <Link href={`/society/${params.id}/manage`}>
        <button className='text-white mt-7 bg-blue-500 w-80 h-12 rounded-lg mb-24 mx-4'>Apply as admin</button>
      </Link>
    </div>
  </div>
  );
}