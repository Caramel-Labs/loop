import SocietyCard from "@/app/components/facultyCard"
import Link from 'next/link'
import getData from '@/app/utility/getData.js'
import FacultyCard from "@/app/components/facultyCard"

export default async function FacultyFeed(){
   
    const faculties= await getData("http://localhost:3001/faculty/all")
    console.log(faculties)
        return(
            <div className="bg-zinc-950 h-screen">
                <h1 className="text-center font-bold pt-4 text-white"> Faculties</h1>
    
                 {/* the search box */}
                 <div className="pt-2 relative mx-auto text-gray-600 flex flex-col mt-4 mr-4 ml-4 ">
                    <input className="border-2 border-zinc-900 bg-zinc-900 h-12 px-5 pr-16 rounded-lg text-sm focus:outline-none text-xs"
                    type="search" name="search" placeholder="Search faculties..."/>
                    <button type="submit" className="absolute right-0 top-0 mt-5 mr-4">
                    <svg
                        className="text-gray-600 h-4 w-4 fill-current"
                        width="512"
                        height="512"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        version="1.1"
                        id="Capa_1"
                        x="0px"
                        y="0px"
                        viewBox="0 0 56.966 56.966"
                        xmlSpace="preserve"
                    >
                    <path
                    d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"
                    />
                    </svg>
                    </button>
                </div>
    
                {/* the cards */}
                
                {faculties.map((faculty, i)=>(
                    <FacultyCard key={i} faculty ={faculty} /> 
             ))}
            </div>
        )
    
}