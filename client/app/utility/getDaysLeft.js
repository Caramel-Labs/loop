
// This function takes in a date string and time string and returns a Date object
// The date string must be in the format YYYY-MM-DD
function parseStringToDate(dateString, timeString) {
    // Split the timeString into hours, minutes, and AM/PM parts
    const [time, ampm] = timeString.split(' ');
    const [hours, minutes] = time.split(':');
  
    // Split the dateString into year, month, and day parts
    const [year, month, day] = dateString.split('-');
  
    // Convert the AM/PM time to 24-hour format
    let hoursIn24Format = parseInt(hours, 10);
    if (ampm.toLowerCase() === 'pm' && hoursIn24Format !== 12) {
      hoursIn24Format += 12;
    } else if (ampm.toLowerCase() === 'am' && hoursIn24Format === 12) {
      hoursIn24Format = 0;
    }
  
    // Create a new Date object
    const dateObject = new Date(year, month - 1, day, hoursIn24Format, parseInt(minutes, 10));
    return dateObject;
  }

// This function takes in a date object and returns the difference in days between the input date and the current date
function getTimeDifference(dateObject) {
  // Convert the input date string to a Date object
  const inputDate = new Date(dateObject)

  // Get the current date
  const currentDate = new Date()

  // Calculate the time difference in milliseconds
  const timeDifferenceInMilliseconds = inputDate - currentDate

  // If the event is over, return "Event is over!"
  if (timeDifferenceInMilliseconds < 0) {
    return "Event is over"
  }

  // Calculate the time left in hours
  const differenceInHours = Math.floor(timeDifferenceInMilliseconds / (1000 * 60 * 60))

  // If the event is within the same day, calculate the remaining hours, minutes, and seconds
  if (differenceInHours < 24) {
    const remainingMilliseconds = timeDifferenceInMilliseconds % (1000 * 60 * 60)
    const remainingMinutes = Math.floor(remainingMilliseconds / (1000 * 60))
    const remainingSeconds = Math.floor((remainingMilliseconds % (1000 * 60)) / 1000)
    return `${differenceInHours} hours`
  }

  // Convert the time difference to days
  const differenceInDays = Math.floor(timeDifferenceInMilliseconds / (1000 * 60 * 60 * 24))

  return `${differenceInDays} days`
}

export { parseStringToDate, getTimeDifference}

  

  