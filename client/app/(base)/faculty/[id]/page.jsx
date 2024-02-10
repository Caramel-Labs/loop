'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import SocietyCard from "@/app/components/societyCard";
import EventCard from "@/app/components/eventCard";
import Link from "next/link";

export default function Faculty({ params }) {

  const [facultyData, setFacultyData] = useState(null);
  const [active, setActive] = useState('Faculty'); // Set the initial active tab

  const menus = ["Faculty", "Societies", "Events"];

  const fetchFacultyData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/faculty/${params.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      setFacultyData(data);
    } catch (error) {
      console.error(error);
      // Handle errors (e.g., set an error state, show error message)
    }
  };

  useEffect(() => {
    fetchFacultyData();
  }, [params.id]);

  const handleClick = (item) => {
    setActive(item); // Update active state based on clicked tab
    // Perform actions based on the clicked tab (e.g., change content)
  };

  // facultyData && console.log(facultyData.faculty.facultyName)
  const imgPath = "https://res.cloudinary.com/dekv3xmjm/image/upload/caramel/events/64c79c0b7bd1e0f15ef11476.jpg"

  return (
    <div className="bg-zinc-950 h-screen">
      {/*tabs*/}
      <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400 pt-16 mx-10">
        {menus.map((item) => (
          <li key={item} className="me-2">
            <a
              href="#"
              className={`inline-block px-4 py-3 rounded-lg ${active === item
                ? 'text-white bg-blue-600 active'
                : 'hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white'
                }`}
              onClick={() => handleClick(item)}
              aria-current={active === item ? 'page' : undefined}
            >
              {item}
            </a>
          </li>
        ))}
      </ul>

      {/* Display Faculty section */}
      {active === 'Faculty' && facultyData && (
        <div className="mt-7 mx-4 ">
          <Image height="400" width="800" className="rounded-lg" src={imgPath} alt='hero-image'></Image>
          <h1 className="mt-8 text-white ml-4 text-3xl">{facultyData.faculty.facultyName}</h1>
          <p className="mt-3 text-white ml-4 text-xs">{facultyData.faculty.description}</p>
          <div className="flex mt-9 mx-5 ">
            <button className="bg-blue-600 p-4 rounded-lg text-xs text-white w-40">See Events</button>
            <button className="ml-4 bg-blue-600 p-4 rounded-lg text-xs text-white w-40">See Societies</button>
          </div>
        </div>
      )}

      {/* Display Societies section */}
      {active === 'Societies' && facultyData && (
        <div>
          <p className="mt-6 text-white mx-4 text-xs"> The {facultyData.faculty.facultyName} has {facultyData.faculty.societies.length} societies for its undergraduate students to engage with.</p>
          {/* Add content for Societies section */}
          <div className="mx-4"> 
          {facultyData.faculty.societies.map((society, i) => (
           <Link key={i} href={`http://localhost:3000/society/${society._id}`}>
            <SocietyCard key={i} society={society} />
          </Link> 
          ))}</div>
         
        </div>
      )}

      {/* Display Events section */}
     {active === 'Events' && facultyData && (
        <div className="mx-4">
          <h2 className="text-white mt-4 ml-4 text-xl">Whats happening at {facultyData.faculty.facultyName}? </h2>
          {/* Add content for Events section */}
          {facultyData.filteredEvents.map((event, i) => (
             <Link key={i} href={`http://localhost:3000/event/${event._id}`}>
            <EventCard key={i} event={event} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
