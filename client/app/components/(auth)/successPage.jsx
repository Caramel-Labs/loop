import Image from "next/image"
import { useFormState } from "@/app/utility/FormContext"
import { useRouter } from "next/navigation"


export default function SuccessPage() {
   
    const {formData} = useFormState()
    const router = useRouter()

    //This function creates a user account in the db
    async function handleCreateAccount() {

        const userData = {
            ...formData,
        }
            
        try {
            const response = await fetch('http://localhost:3001/profiles/newProfile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData) // Send the email as an object
        });
    
        if (response.ok) {
         router.push('/auth/login')
         console.log("Account Created successfully")
        } else {
         console.log("Account Creation failed")
        
        }
        } catch (error) {
           console.error("Ah shit here we go again", error);
    }
  }

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-zinc-950 ">
                <img
                alt="logo"
                src="https://res.cloudinary.com/dy3hecuzo/image/upload/v1701959915/logo.png"
                className="mt-32 h-36 w-36 flex flex-col items-center justify-center mt-28"
            />
                <h1 className="font-bold mb-4 mt-56 text-2xl text-white">
                    ALL DONE
                </h1>
                <p className="mt-8 mx-4 text-center text-white text-xs">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
           
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-11 h-12 w-80 rounded-lg text-xs" onClick={handleCreateAccount}>
                Let's go
            </button>
        </div>
    );
}


