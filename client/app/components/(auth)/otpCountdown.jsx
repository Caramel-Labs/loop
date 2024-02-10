import { useState, useEffect } from 'react';

export default function CountdownTimer(props) {
  const [minutes, setMinutes] = useState(1)
  const [seconds, setSeconds] = useState(59)
  const {onClickHandler}  = props

  useEffect(() => {
    let interval

    if (minutes === 0 && seconds === 0) {
      // Timer is up, do something or stop the countdown
      // For example, you can show a message, trigger an action, etc.
      clearInterval(interval)
    
    } else {
      interval = setInterval(() => {
        if (seconds === 0) {
          setMinutes(prevMinutes => prevMinutes - 1)
          setSeconds(59)
        } else {
          setSeconds(prevSeconds => prevSeconds - 1)
        }
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [minutes, seconds, onClickHandler])

  return (
    <div>
     
      { minutes === 0 && seconds === 0 ? (
        <div>
          <a
            className="flex flex-row items-center text-blue-600"
            href="http://"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClickHandler}
          >
            Resend code
          </a>
        </div>
      ) :
      <p>{`You can request a new code in ${minutes}:${seconds.toString().padStart(2, '0')}`}</p>
      }
    </div>
  )
}

