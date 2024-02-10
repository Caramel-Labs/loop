'use client'
import { useState } from "react";
import { useSession } from 'next-auth/react'


export default function LikeButton(props) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(props.props.initialLikes);
   console.log(props.props)
  const { data: session } = useSession()
  //const user = verifyJWT(session?.accessToken)
  const currentUser = session?.user

  const heart = liked ? "❤️" : "♡";
  
  const handleLike = async () => {

    setLikes(liked ? likes - 1 : likes + 1);
    setLiked(!liked);

    try {
      const userId = currentUser.username; // Replace with actual user ID
      const eventId = props.props.eventId; // Replace with actual event ID
      
      const response = await fetch(`http://localhost:3001/events/${liked ? 'dislike' : 'like'}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_id: userId, event_id: eventId })
      });

      if (response.ok) {
        // Update likes based on like/dislike action
     console.log('Liked/disliked event')
      } else {
        // Handle error if the request fails
        console.error('Failed to like/dislike event');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <button onClick={handleLike} className="bg-blue-600 w-12 h-7 flex items-center justify-center mr-4 rounded-lg text-xs p-4">
  {heart} <span className="ml-1">{likes}</span>
</button>
  );
}
