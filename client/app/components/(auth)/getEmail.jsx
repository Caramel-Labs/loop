'use client'
import { useFormState } from "@/app/utility/FormContext"
import { useState } from 'react'

// export default function GetEmail() {


//     const [email, setEmail] = useState("");
//     const { onHandleNext, setFormData, formData } = useFormState();
//     // console.log(formData, "form data")

//    async function handleSubmit(e) {
//         e.preventDefault();
//         setFormData((prev) => ({ ...prev, ...{ email } }));

//         try {
//           const response = await fetch('http://localhost:3001/email/send-otp', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ email }) // Send the email as an object
//           });

//           if (response.ok) {
//             console.log("OTP requested successfully")
//             onHandleNext();
//           } else {
//             console.log("OTP request failed")
//           }
//         } catch (error) {
//           console.error("An error occurred:", error);
//         }

//     }

//     return (
//         <form className="flex gap-1 flex-col" method="post" onSubmit={handleSubmit}>
//         <label htmlFor="email">Email</label>
//             <input 
//             autoFocus 
//             id="email"
//             type="email"
//             name="email"
//             value={email}
//             required={true} 
//             placeholder="Enter your university email"
//             onChange={(e) => setEmail(e.target.value)}
//             className="border h-11 px-4 rounded-md focus:outline-blue-500 " 
//             />

//            {/* info section
//             <div>
//               <button onClick={toggleEmail}>
//               <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="15" height="15" viewBox="0 0 24 24">
//                <path d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 11 7 L 11 9 L 13 9 L 13 7 L 11 7 z M 11 11 L 11 17 L 13 17 L 13 11 L 11 11 z"></path>
//               </svg>
//               </button>
//               <p> Why do i need my university email address?</p>
//             </div>
//              */}

//             <div className="flex gap-4 justify-center mt-4">
//             <button type="submit" className="h-11 px-6 inline-block bg-blue-600 font-semibold text-white rounded-md">
//                 Send OTP
//             </button>
//             </div>
//       </form>
//     )

// }

export default function GetEmail() {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const { onHandleNext, setFormData } = useFormState();

    async function handleSubmit(e) {
        e.preventDefault();
        const isValid = validateEmail(email);

        if (isValid) {
            setFormData((prev) => ({ ...prev, ...{ email } }));

            try {
                const response = await fetch('http://localhost:3001/email/send-otp', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email }) // Send the email as an object
                });

                if (response.ok) {
                    console.log("OTP requested successfully");
                    onHandleNext();
                } else {
                    console.log("OTP request failed");
                }
            } catch (error) {
                console.error("An error occurred:", error);
            }
        }
    }

    const validateEmail = (value) => {
        setEmailError("");
        const emailRegex = /^[0-9a-zA-Z._-]+@kdu\.ac\.lk$/;
        if (!emailRegex.test(value)) {
            console.log("fucked")
            setEmailError("Invalid email format. Email should start with a number and end with '@kdu.ac.lk'");
            return false;
        }
        return true;
    };

    return (
        <form className="flex gap-1 flex-col bg-zinc-950 h-screen" method="post" onSubmit={handleSubmit}>

    <h1 className="text-center mt-52 text-2xl font-bold text-white">ENTER YOUR EMAIL</h1>
    <p className="text-center mt-9 text-xs mx-4 text-white">You are just a few steps away
        from connecting with everyone
        in your university.</p>
    <input
        autoFocus
        id="email"
        type="email"
        name="email"
        value={email}
        required={true}
        placeholder="Enter your university email"
        onChange={(e) => setEmail(e.target.value)}
        className="border-zinc-900 h-11 px-4 rounded-md focus:outline-blue-500  mt-9 mx-4 bg-zinc-900 text-xs text-white"
    />
    {emailError && <p className="text-red-500 text-sm">{emailError}</p>}

    <div className="flex gap-4 justify-center mt-4">
        <button type="submit" className="h-11 px-6 inline-block bg-blue-600 font-semibold text-white rounded-md mt-72 w-72 h-12 text-xs">
            Next
        </button>
    </div>
</form>
    );
}