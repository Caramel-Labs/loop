 
 function getToday() {
      const date = new Date();  
      const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
      const dayOfWeek = daysOfWeek[date.getDay()];
      const month = months[date.getMonth()];
      const day = date.getDate();
    
      return `${dayOfWeek}, ${month} ${day}`;
    
 }

 function eventCardFormat(inputDate) {
          const dateParts = inputDate.split('-');
          const year = dateParts[0];
          const month = new Date(inputDate + 'T00:00:00').toLocaleString('en-us', { month: 'short' });
          const day = dateParts[2];
          return `${day} ${month} ${year}`;
   }
  
   function eventPageFormat(inputDate) {
     const date = new Date(inputDate);
     const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
     const day = date.getDate();
     const month = new Date(inputDate + 'T00:00:00').toLocaleString('en-us', { month: 'long' });
     const year = date.getFullYear();
   
     const daySuffix = getDaySuffix(day);
   
     return `${daysOfWeek[date.getDay()]}, ${day}${daySuffix} ${month} ${year}`;
   }
   
   function getDaySuffix(day) {
     if (day >= 11 && day <= 13) {
       return 'th';
     }
     const lastDigit = day % 10;
     switch (lastDigit) {
       case 1:
         return 'st';
       case 2:
         return 'nd';
       case 3:
         return 'rd';
       default:
         return 'th';
     }
   }  

   export { getToday, eventCardFormat, eventPageFormat}