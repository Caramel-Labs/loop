'use client'
import { useState } from 'react';
import { useRouter } from "next/navigation"

export default function CreateUpdate(props) {
  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();
  const [eventDescription, setEventDescription] = useState('');

  const router = useRouter();

  // Helper function to handle file input change (event banner)
  const handleFileChange = async (changeEvent) => {
    const file = changeEvent?.target?.files?.[0]; // Check for null or undefined values
    
    if (!file) {
      console.error('File not selected');
      return;
    }
  
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

  // Handle Cloudinary upload
  const handleCloudinary = async (event) => {
    event.preventDefault();
    
    // Find the file input by its name 'file' instead of accessing 'elements'
    const fileInput = document.getElementById('yourFileInputId');
    
    if (!fileInput) {
      console.error('File input not found');
      return;
    }
  
    const formData = new FormData();
  
    for (const file of fileInput.files) {
      formData.append('file', file);
    }
  
    formData.append('upload_preset', 'addUpdate');
  
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

  async function handleSubmit(e) {
    e.preventDefault();
    // Do something with the form data, e.g., send it to the server
   
     setEventDescription('');

    // Send the data to the server
    const response = await fetch('http://localhost:3001/events/addEventUpdate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({eventDescription})
      })

      if (response.ok) {
        console.log("Event created successfully")
        await handleCloudinary(e);
        router.push('/home')
        
      } else {
        console.log("Event creation failed")
      } 
   
  };
  

  return (
    <div className='p-5 bg-zinc-950 h-screen'>
        <h2 className='text-2xl font-bold pb-3 mt-6 text-white'>IMAGE UPLOAD</h2>

        <form onSubmit={handleCloudinary}>

            {/* Image Caption ===================================================================================================== */}
            <div>
                <label className='text-white mt-4'>Event Description:</label>
                <br />
                <textarea
                    value={eventDescription}
                    onChange={(e) => setEventDescription(e.target.value)}
                    className='mt-2 border-2 p-2 w-full  rounded-lg bg-zinc-900 text-white border-zinc-900'
                    placeholder='What is your event all about?'
                    required
                />
                <br /><br />
            </div>

            {/* Image Upload ===================================================================================================== */}
            <div>
                <label className='text-white'>
                Image Upload
                <br />
                
                <input type="file" accept="image/*" onChange={handleFileChange} className='mt-2' id='yourFileInputId'/>
                </label>
            </div>

            {/* Submit Button ================================================================================================== */}
            <div className='pt-12 flex justify-center items-end'>
                <button onClick={handleSubmit} className='bg-blue-600  rounded-lg h-12 w-80  text-center text-xs text-white  mt-80'>Upload Image</button>
            </div>

        </form>
    </div>
  );
}
