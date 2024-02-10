'use client'
import { useSession } from 'next-auth/react'
import { useState } from 'react'


export default function PaymentActionButton(props) {

    const [pay, setPay] = useState(false)
    const { data: session } = useSession()
    const currentUser = session?.user
    // console.log(currentUser,"current user")

     // handle event registration
     async function handlePayment() {
      
      const data = {
        user_id: currentUser._id,
        event_id: props.id
      }

      
      if (response.ok) {
        console.log("Event joined successfully")
        setPay(true)
      } else {
        console.log("Event join failed")
        setJoin(false)
      }

    }

    return (
        <button
          onClick={handlePayment}
          className='bg-blue-600  rounded-lg h-12 w-80  text-center text-xs text-white mt-9  '
        >
          {`${pay? "Tickets Booked":"Buy Tickets"}`}
        </button>
    );
}


