"use client"

import { useState } from 'react';
import { useSession } from 'next-auth/react'
import { useRouter } from "next/navigation"

export default function CreateEvent() {

  const router = useRouter()
  const { data: session } = useSession()
  const currentUser = session?.user
  console.log(currentUser)
  // State variables to manage form data
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventAvailability, setEventAvailability] = useState('all'); // Default value is 'all'
  const [selectedFaculties, setSelectedFaculties] = useState([]);
  const [society, setSociety] = useState('')

  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();

  // State variables to manage date and time
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');

  // State variable to manage the event banner (file input)
  const [eventBanner, setEventBanner] = useState(null);


  // List of all faculties (fetch from API later)
  const facultiesList = [
    'Faculty of Engineering',
    'Faculty of Defence and Strategic Studies',
    'Faculty of Law',
    'Faculty of Management, Social Sciences and Humanities',
    'Faculty of Computing',
    'Faculty of Medicine',
    'Faculty of Allied Health Sciences',
    'Faculty of Built Environment and Spatial Sciences',
    'Faculty of Technology',
    'Faculty of Criminal Justice'
  ];

  // Helper function to handle date changes (unnecessary??)
  const handleDateChange = (e) => {
    const { value } = e.target;
    setEventDate(value);
  };

  // Helper function to handle time changes
  const handleTimeChange = (e) => {
    const { value } = e.target;
    setEventTime(value);
  };


  // Helper function to handle file input change (event banner)
  const handleFileChange = async (changeEvent) => {
    const file = changeEvent?.target?.files?.[0]; // Check for null or undefined values
    
    if (!file) {
      console.error('File not selected');
      return;
    }
  
    setEventBanner(file);
  
    const reader = new FileReader();
  
    reader.onload = function (onLoadEvent) {
      if (onLoadEvent?.target?.result) {
        setImageSrc(onLoadEvent.target.result);
        setUploadData(undefined);
      } else {
        console.error('Error reading file');
      }
    };
  
    reader.readAsDataURL(file);
  };
  
  // Helper function to handle availability selection
  const handleAvailabilityChange = (e) => {
    const { value } = e.target;
    setEventAvailability(value);
  }

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();
    // Do something with the form data, e.g., send it to the server
    if( eventAvailability ==='all') {
      console.log("All faculties selected")
      selectedFaculties.push("all")
    }

    if(eventAvailability === 'facultyOnly') {
      console.log("My faculty only selected")
      selectedFaculties.push(currentUser.faculty)
    }

    const eventData = {
      name: eventName,
      description: eventDescription,
      selectedFaculties: selectedFaculties,
      date: eventDate,
      time: eventTime,
      society:society
      //banner: eventBanner,
    };

     // Reset the form after submission
     setEventName('');
     setEventDescription('');
     setEventAvailability('all');
     setSelectedFaculties([]);
     setEventDate('');
     setEventTime('');
     setEventBanner(null);
     setSociety('')

    console.log("output", eventData)

    // Send the data to the server
    const response = await fetch('http://localhost:3001/events/newEvent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventData)
      })

      if (response.ok) {
        console.log("Event created successfully")
        await handleCloudinary(e);
        router.push('/home')
        
      } else {
        console.log("Event creation failed")
      }

    
   
  };

  const handleCloudinary = async (event) => {
    event.preventDefault();
    
    // Find the file input by its name 'file' instead of accessing 'elements'
    const fileInput = document.getElementById('yourFileInputId')
    
    if (!fileInput) {
      console.error('File input not found');
      return;
    }
  
    const formData = new FormData();
  
    for (const file of fileInput.files) {
      formData.append('file', file);
    }
  
    formData.append('public_id', eventName); // Use eventName to set the public_id
    formData.append('upload_preset', 'events');
  
    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dy3hecuzo/image/upload', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        const data = await response.json();
        setImageSrc(data.secure_url);
        setUploadData(data);
      } else {
        console.error('Failed to upload image to Cloudinary');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
  

  return (
    <div className='p-5 bg-zinc-950'>
        <h2 className='text-2xl font-bold pb-3 text-white mt-6'>CREATE EVENT</h2>

        <form onSubmit={handleSubmit}>

            {/* Event Name ===================================================================================================== */}
            <div>
                <label className='text-white mt-6'>Event Name:</label>
                <br />
                <input
                    type="text"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    className='mt-2 border-2 p-2 w-full rounded-lg text-xs bg-zinc-900 text-gray-600 border-zinc-900'
                    placeholder='Keep your event name as short as possible'
                    required
                />
                <br /><br />
            </div>

            {/* Event Description ============================================================================================== */}
            <div>
                <label className='text-white mt-6'>Event Description:</label>
                <br />
                <textarea
                    value={eventDescription}
                    onChange={(e) => setEventDescription(e.target.value)}
                    className='mt-2 border-2 p-2 w-full  rounded-lg text-xs  bg-zinc-900 text-gray-600 border-zinc-900'
                    placeholder='What is your event all about?'
                    required
                />
                <br /><br />
            </div>

            {/* Event Availability ============================================================================================= */}
            <div>
                <label className='text-white mt-6'>Event Availability:</label>
                <br />
                <select
                    value={eventAvailability}
                    onChange={handleAvailabilityChange}
                    className='mt-2 p-2 w-full  rounded-lg text-xs  bg-zinc-900 text-gray-600 border-zinc-900'
                >
                    <option value="all">All Faculties</option>
                    <option value="facultyOnly">My Faculty Only</option>
                    <option value="faculty">Selected Faculties</option>
                </select>
                <br /><br />
            </div>

            {/* {eventAvailability === 'faculty' && (
                <div>
                    <label>Select Faculties:</label>
                    <br />
                    <select
                        multiple
                        value={selectedFaculties}
                        onChange={(e) => setSelectedFaculties(Array.from(e.target.selectedOptions, (option) => option.value))}
                    >
                    {facultiesList.map((faculty) => (
                        <option key={faculty} value={faculty}>
                        {faculty}
                        </option>
                    ))}
                    </select>
                    <br /><br />
                </div>
            )} */}

            {/* Select Availability ============================================================================================ */}
            {eventAvailability === 'faculty' && (
            <div>
                <label className='text-white mt-6'>Select Faculties:</label>
                <br />
                {facultiesList.map((faculty) => (
                <div key={faculty}>
                    <input
                    type="checkbox"
                    value={faculty}
                    checked={selectedFaculties.includes(faculty)}
                    onChange={(e) => {
                        const { value, checked } = e.target;
                        setSelectedFaculties((prevState) => {
                        if (checked) {
                            return [...prevState, value];
                        } else {
                            return prevState.filter((selectedFaculty) => selectedFaculty !== value);
                        }
                        });
                    }}
                    />
                    <label> {faculty}</label>
                    <br />
                </div>
                ))}
                <br />
            </div>
            )}

            {/* Event Date ===================================================================================================== */}
            <div>
              <label className='text-white mt-6'>Event Date:</label>
              <br />
                <input
                  type="date"
                  value={eventDate}
                  onChange={handleDateChange}
                  className='mt-2 border-2 p-2 w-full  rounded-lg text-xs  bg-zinc-900 text-gray-600 border-zinc-900'
                  min={new Date().toISOString().split("T")[0]}
                  required
                />
              <br /><br />
            </div>

            {/* Event Time ===================================================================================================== */}
            <div>
              <label className='text-white mt-6'>Event Time:</label>
              <br />
                <input
                  type="time"
                  name="eventTime"
                  value={eventTime}
                  onChange={handleTimeChange}
                  className='border-2 p-2  rounded-lg text-xs  bg-zinc-900 text-gray-600 border-zinc-900'
                  required
                />
              <br /><br />
            </div>

            {/* Event Banner =================================================================================================== */}
            <div>
                <label className='text-white mt-6'>
                Event Banner
                <br />
                <span className='text-xs text-white'>We recommend a 1920px by 1080px image</span>
                <input type="file" accept="image/*" onChange={handleFileChange} className='mt-2' id='yourFileInputId'/>
                </label>
            </div>

            {/* Submit Button ================================================================================================== */}
            <div className='pt-12 flex justify-center'>
                <button type="submit" className='border-2 p-3 px-16 rounded-lg bg-blue-600 border-zinc-900 text-white' onClick={handleSubmit}>Create Event</button>
            </div>

        </form>
    </div>
  );
}