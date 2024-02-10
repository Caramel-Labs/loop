export default async function getEventData(user) {

    try{
        const response =   await fetch('http://localhost:3001/events/all', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({faculty: user.faculty})
          })
        
          if(!response.ok){
            console.log("fetch failed")
          }
         
        const data = await response.json();
         return data

    } catch(err){
        console.log(err)
    }

  
  }
  
  