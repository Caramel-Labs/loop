//fetch data from a given endpoint
//return the data as a json object

export default async function getData(endpoint) {
  const res = await fetch(endpoint)
  const data = await res.json()
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
 // console.log(data)
  return data
}

