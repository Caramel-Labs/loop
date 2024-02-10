'use client'
import { useState } from 'react'
import Link from "next/link"
import { useFormState } from "@/app/utility/FormContext"


export default function GetCredentials() {

    const { onHandleNext,setFormData} = useFormState()
    const [userData, setUserData] = useState({
        username:'',
        firstName: '',
        lastName: '',
        password: '',
        confirm_password: ''
      })
    
    const[passwordError, setPasswordError] = useState(false)
    
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setUserData((prevUserData) => ({
          ...prevUserData,
          [name]: value
        }))
      }

      async function handleSubmit(e) {
        e.preventDefault();
      
        if (userData.password !== userData.confirm_password) {
          setPasswordError(true);
          setUserData((prevUserData) => ({
            ...prevUserData,
            password: '',
            confirm_password: '', // Clear the confirm password field too
          }));
          return;
        }
      
        // Create a new object excluding confirm_password
        const { confirm_password, ...formDataWithoutConfirmPassword } = userData;
      
        setFormData((prev) => ({
          ...prev,
          ...formDataWithoutConfirmPassword, // Add form data except confirm_password
        }));
      
        console.log(formDataWithoutConfirmPassword, "form data without confirm password");
        onHandleNext();
      }
      

    return(
      <form method="post" onSubmit={handleSubmit}> 
      <div className="bg-grey-lighter min-h-screen flex flex-col bg-zinc-950">
          <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
              <div className="bg-zinc-950 px-6 py-8 rounded shadow-md text-white w-full">
                  <h1 className="mb-8 text-center text-2xl">Get Started</h1>
                  <p className='text-xs text-center mt-9'>First things first, lets get some basics out of the way.</p>
  
                  <div className='mt-14'>
                      <input
                          type="text"
                          className="block border border-zinc-900 w-full p-3 rounded-lg mb-4 bg-zinc-900 text-xs text-white"
                          name="firstName"
                          value={userData.firstName}
                          onChange={(e) => handleInputChange(e)}
                          placeholder="Enter First Name"
                          required
                      />
  
                      <input
                          type="text"
                          className="block border border-zinc-900 w-full p-3 rounded-lg mb-4 bg-zinc-900 text-xs text-white"
                          name="lastName"
                          value={userData.lastName}
                          onChange={(e) => handleInputChange(e)}
                          placeholder="Enter Last Name"
                          required
                      />
  
                      <input
                          type="text"
                          className="block border border-zinc-900 w-full p-3 rounded-lg mb-4 bg-zinc-900 text-xs text-white"
                          name="username"
                          value={userData.username}
                          onChange={(e) => handleInputChange(e)}
                          placeholder="Enter Username"
                          required
                      />
  
                      <input
                          type="password"
                          className={`block border border-zinc-900 w-full p-3 rounded-lg mb-4 bg-zinc-900 text-xs ${passwordError ? 'border-red-500' : ''} text-white`}
                          name="password"
                          minLength={8}
                          value={userData.password}
                          onChange={(e)=> handleInputChange(e)}
                          placeholder="Enter Password"
                          required
                      />
  
                      <input
                          type="password"
                          className={`block border border-zinc-900 w-full p-3 rounded-lg mb-4 bg-zinc-900 text-xs ${passwordError ? 'border-red-500' : ''} text-white`}
                          name="confirm_password"
                          minLength={8}
                          value={userData.confirm_password}
                          onChange={(e)=>handleInputChange(e)}
                          placeholder="Confirm Password"
                          required
                      />
                  </div>
                  
                  {passwordError && <p className="text-red-500 text-xs italic">Passwords do not match.</p>}
  
              </div>
  
              <div className="text-grey-dark mt-6 text-xs text-white">
                  Already have an account? 
                  <Link className="no-underline border-b border-blue text-blue-400 ml-4" href="/auth/login">
                      Sign in
                  </Link>
              </div>
  
              <button
                  type='submit'
                  className=" text-center py-3  bg-blue-700  hover:bg-green-dark focus:outline-none my-1 mt-14 h-12 w-72 text-xs rounded-lg text-white"
              >
                  Next
              </button>
          </div>
      </div>
  </form>
    
    )
}