 
 export default function getToday() {
      const date = new Date();  
      const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
      const dayOfWeek = daysOfWeek[date.getDay()];
      const month = months[date.getMonth()];
      const day = date.getDate();
    
      return `${dayOfWeek}, ${month} ${day}`;
    
 }