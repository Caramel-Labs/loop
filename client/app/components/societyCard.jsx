import Image from 'next/image'

export default function SocietyCard(props) {

  const { i, _id, societyName, description, volunteers } = props.society

  const avatarPath1 = `https://res.cloudinary.com/dy3hecuzo/image/upload/v1691679809/ProfilePics/kalana2001.jpg`
  const avatarPath2 = `https://res.cloudinary.com/dy3hecuzo/image/upload/v1691679809/ProfilePics/lasindu2001.jpg`
  const avatarPath3 = `https://res.cloudinary.com/dy3hecuzo/image/upload/v1691679809/ProfilePics/ravindu2001.jpg`


  const imgPath = `https://res.cloudinary.com/dy3hecuzo/image/upload/v1701971490/Socities/${societyName}.jpg`
  return (
    <div key={i}>

      <div className="relative flex w-full max-w-[48rem]  bg-clip-border text-gray-700 shadow-md mt-9 rounded-lg bg-zinc-950">
        <div className="relative m-0 w-2/5 shrink-0 overflow-hidden bg-clip-border text-gray-700 flex items-center rounded-lg bg-zinc-950">
          <img
            src={imgPath}
            alt="image"
            className="h-98 w-98 object-cover rounded-lg"
          />
        </div>
        <div className="p-6 bg-zinc-950 rounded-lg">
          <h4 className="mb-2 font-sans leading-snug tracking-normal text-blue-gray-900 antialiased text-base font-bold text-white">
            {societyName}
          </h4>
          <p className="mb-8 font-sans  antialiased text-xs line-clamp-1 text-white">
            {description}
          </p>

          {/* user avatars */}
          <div className='flex'><div className="flex items-center justify-center -space-x-4 rtl:space-x-reverse">
          <img className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src={avatarPath1} alt="" />
            <img className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src={avatarPath2} alt="" />
             <img className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src={avatarPath3} alt="" />

            <div className="flex items-center ml-2">
              <p className='text-white text-[8px] ml-4'>{volunteers.length} members</p>
            </div>
          </div></div>

        </div>
      </div>;
    </div>
  )
}