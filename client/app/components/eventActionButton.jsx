'use client'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/router';

export default function EventActionButton(props) {

    const [join, setJoin] = useState(false)
    const { data: session } = useSession()
    const currentUser = session?.user
    const isAdmin = currentUser?.isAdmin
    // console.log(currentUser,"current user")
    const router = useRouter()
     // handle event registration
     async function handleClick() {
      
      setJoin(true)
      const data = {
        user_id: currentUser._id,
        event_id: props.id
      }

      const response = await fetch('http://localhost:3001/profiles/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if (response.ok) {
        console.log("Event joined successfully")
      } else {
        console.log("Event join failed")
        setJoin(false)
      }

    }
     function handleUpdate() {
      
      router.push('/createUpdate')

    }

    return (
     <div>
       <button
          onClick={handleClick}
          className='bg-blue-600  rounded-lg h-12 w-80 mt-3 text-center text-xs text-white '
        >
          {`${join? "Registered":"Register Now"}`}
        </button>

        {
          isAdmin && (
            <button
              onClick={handleUpdate}
              className='bg-red-500 p-4 rounded-lg h-12 w-80 mt-3 '
            >
              Add Event Update
            </button>
          )
        }
     </div> 
       
    );
}


