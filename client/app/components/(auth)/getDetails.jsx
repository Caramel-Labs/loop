'use client'
import { useState } from 'react'
import Link from "next/link"
import { useFormState } from "@/app/utility/FormContext"


export default function GetDetails() {

    const { onHandleNext,setFormData, formData} = useFormState()

    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
      })
    
    
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setUserData((prevUserData) => ({
          ...prevUserData,
          [name]: value
        }))
      }

    async  function handleSubmit(e) {
        e.preventDefault()
        

        setFormData((prev) => ({ ...prev, 
            firstName: userData.firstName,
            lastName: userData.lastName,
        }))

        console.log(userData, "user data")
        onHandleNext()
        //setUserData({})
    }

    return (
        <form method="post" onSubmit={handleSubmit}> 
        <div className="bg-grey-lighter min-h-screen flex flex-col">
                    <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                            <h1 className="mb-8 text-3xl text-center">Sign up</h1>
                            <input
                                type="text"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="firstName"
                                value={userData.firstName}
                                onChange={(e) => handleInputChange(e)}
                                placeholder="First Name"
                                required ={true}
                            />

                            <input
                                type="text"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="lastName"
                                value={userData.lastName}
                                onChange={(e) => handleInputChange(e)}
                                placeholder="Last Name"
                                required ={true}
                            />

                           
                            <button
                                type='submit'
                                className="w-full text-center py-3 rounded bg-blue-700 text-black hover:bg-green-dark focus:outline-none my-1"
                            >Next</button>
        
                            <div className="text-center text-sm text-grey-dark mt-4">
                                By signing up, you agree to the 
                                <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                                    Terms of Service
                                </a> and 
                                <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                                    Privacy Policy
                                </a>
                            </div>
                        </div>
        
                    </div>
                </div>
              </form>  
    )
}