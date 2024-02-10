import Image from "next/image";
import { useFormState } from "@/app/utility/FormContext"

export default function WelcomePage() {

    const { onHandleNext } = useFormState()

    return (
        // <div className="flex flex-col items-center justify-center">
        //        <img alt="logo" src="https://res.cloudinary.com/dy3hecuzo/image/upload/v1701959915/logo.png" className="mt-20 h-36 w-36 flex flex-col items-center justify-center" />
        //         <h1 className="text-4xl font-bold mb-4">
        //             STAY IN THE LOOP
        //         </h1>
        //         <p>Lorem ipsum dolor sit amet</p>

        //     <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={onHandleNext}>
        //         Get Started
        //     </button>
        // </div>
        <div className="flex flex-col items-center justify-center bg-zinc-950 h-screen">
            <img
                alt="logo"
                src="https://res.cloudinary.com/dy3hecuzo/image/upload/v1701959915/logo.png"
                className="mt-32 h-36 w-36 flex flex-col items-center justify-center"
            />
            <h1 className="text-2xl font-bold mb-4 mt-56 text-white">STAY IN THE LOOP</h1>
            <p className="mt-9 text-white text-xs mx-4 text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-11 h-12 w-80 rounded-lg text-xs"
                onClick={onHandleNext}
            >
                Get Started
            </button>
        </div>
    );
}


