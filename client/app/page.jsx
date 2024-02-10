'use-client'
import Link from "next/link"
import { MD5 } from 'crypto-js'


export default async function rickRoll() {
  
  const order_id = 69
  const inputString = process.env.MERCHANT_ID + order_id + 10000000000 + 'LKR' + process.env.MERCHANT_SECRET

  const md5Hash = MD5(inputString).toString()

  console.log(md5Hash, hash)
   async function handlePayment(){

    const transaction = {
      merchant_id : process.env.MERCHANT_ID,
      merchant_secret: process.env.MERCHANT_SECRET,
      amount:10000000000,
      currency:LKR,
      hash:md5Hash,
    }
    const response = await fetch('http://localhost:3001/payhere-callback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(transaction)
    })
    
   }
  return(
   <div className="grid h-screen place-items-center">
    {/* <Link href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">  */}
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handlePayment()}>මෙතන ඔබන්න</button>
    {/* </Link> */}
  </div>  
  )
}