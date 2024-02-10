
import Image from 'next/image'
import getData from '@/app/utility/getData.js'
import { eventPageFormat } from '@/app/utility/formatDate'
import EventActionButton from '@/app/components/eventActionButton'
import LikeButton from '@/app/components/likeButton'
import PaymentActionButton from '@/app/components/paymentActionButton'
import EventUpdate from '@/app/components/eventUpdate'

export default async function Event({ params }) {

    const imgPath = `https://res.cloudinary.com/dekv3xmjm/image/upload/caramel/events/${params.id}.jpg`
    const locationPath = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#334155" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-map-pin"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
    const calendarPath = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#334155" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-calendar"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>


    const event = await getData(`http://localhost:3001/events/${params.id}`)
    console.log(event)
    const { _id, name, society, date, time, description, venue, tickets, participants, likes , updates} = event

    const formattedDate = eventPageFormat(date)
    const people = [
        "kalana2001",
        "ravindu2001",
        "manujaya2001"
    ]
    const props = {
        eventId: params.id,
        initialLikes: likes
    };

    console.log(props)

    const avatarPath1 = `https://res.cloudinary.com/dy3hecuzo/image/upload/v1691679809/ProfilePics/kalana2001.jpg`
    const avatarPath2 = `https://res.cloudinary.com/dy3hecuzo/image/upload/v1691679809/ProfilePics/lasindu2001.jpg`
    const avatarPath3 = `https://res.cloudinary.com/dy3hecuzo/image/upload/v1691679809/ProfilePics/ravindu2001.jpg`


    return (
        <div className='bg-zinc-900 h-screen'>
            <Image height="400" width="800" src={imgPath} alt='hero-image' className=''></Image>
            <h1 className='text-white ml-4 mt-4 text-xl'>{name}</h1>
            {/* already registered user avatars */}

            {/* <div class="flex -space-x-4 mt-4">
                <img className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src=".../public/kalana2001.jpg" alt="" />
                <img className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="@/public/ravindu2001.jpg" alt="" />
                <img className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="@/public/senindu2005.jpg" alt="" />

                <div className='ml-40'><p className='text-white mt-4'> {participants.length} already registered</p></div>
            </div> */}
            <div className='mt-4 ml-4 '>
                <div class="flex items-center justify-between">
                    <div className='flex'>
                        <div class="flex items-center justify-center -space-x-4 rtl:space-x-reverse">
                            <img className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src={avatarPath1} alt="" />
                            <img className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src={avatarPath2} alt="" />
                            <img className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src={avatarPath3} alt="" />
                        </div>
                        <div className='flex items-center ml-2'>
                            <p className='text-white text-[8px]'> {participants.length} already registered</p>
                        </div>
                    </div>
                    <LikeButton props={props} />
                </div>
            </div>

            {/* event description */}
            <p className='text-white text-xs mt-8 ml-4'>{description}</p>

            {/* event details */}
            <div className=''>
                <div>
                    <div class="flex mt-6">
                        <div class="w-1/4 p-4 flex items-center justify-center ml-10">
                            {calendarPath}
                        </div>
                        <div class="w-3/4 p-4 pl-0  ">
                            <p className='text-white text-xs font-bold'>{formattedDate}</p>
                            <p className='text-white text-[8px]'>{time}</p>
                        </div>
                    </div>
                </div>

                <div>
                    <div class="flex mt-3">
                        <div class="w-1/4 p-4 flex items-center justify-center ml-10">
                            {locationPath}
                        </div>
                        <div class="w-3/4 p-4 ">
                            <p className='ml-5 text-white'>{venue}</p>
                        </div>
                    </div>
                </div>


                {/* <Image height="100" width="100" src={""} alt='society-image' ></Image>
                    <p className='ml-20 text-white'>organized by </p>
                    <p className='ml-20 text-white'> {society}</p> */}
                <div class="flex mt-3 -ml-6">
                    <div class=" p-4  flex items-center justify-center ml-10 rounded-full bg-white h-12 w-12 border-solid ">
                        <Image height="100" width="100" src={""} alt='society-image' ></Image>
                    </div>
                    <div class="w-3/4 p-2 ml-4">
                        <p className='text-white text-xs'>Organized by </p>
                        <p className='text-white text-sm font-bold'>{society}</p>
                    </div>
                </div>

            </div >
            <div className='grid justify-items-center '>
                {tickets &&
                    <PaymentActionButton id={_id} />
                }
                {
                    !tickets &&
                    <EventActionButton id={_id} />
                }

            </div>


        </div>
    );
}


