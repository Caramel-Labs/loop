'use client'
import { useEffect, useState } from 'react';
import CarouselCard from '@/app/components/carouselCard';
// import EventCard from '@/app/components/eventCard';
import { useSession } from 'next-auth/react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Link from 'next/link';



export default function HomeCarousel() {
  const [events, setEvents] = useState([]);
  const { data: session } = useSession()
  const userName= session?.user.username 

  useEffect(() => {
    if (userName) {
        fetch(`http://localhost:8000/get-recommendations/${userName}/`)
          .then((response) => response.json())
          .then((data) => {
            // Assuming data from the endpoint is an object with a recommendations property (an array of events)
            setEvents(data.recommendations || []);
          })
          .catch((error) => {
            console.error('Error fetching recommendations:', error);
          });
      }

  }, [userName]);

  events && console.log(events);

  return (
    <div> 
    { events &&
        <Carousel showThumbs={false} showStatus={false} showIndicators={false} showArrows={false} autoPlay={true} infiniteLoop={true} interval={3000} transitionTime={1000} >
         {events.map((event, i) => (
           <Link key = {i}  href={`event/${event._id}`}>
            <CarouselCard  event={event} />
           </Link> 
           
         ))}
         </Carousel> 
   }  
    </div>
  );
 }