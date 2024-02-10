export default function ChatHeader(){

    return(
        <div className="flex sm:items-center justify-between py-3 border-b-2 border-zinc-900">
        <div className="relative flex items-center space-x-4">
            <div className="relative">

                <img
                    src="https://res.cloudinary.com/dy3hecuzo/image/upload/v1701959915/logo.png"
                    alt=""
                    className="w-10 sm:w-16 h-10 sm:h-16 rounded-full"
                />
                </div>
                <div className="flex flex-col leading-tight">
                <div className="text-2xl mt-1 flex items-center">
                    <span className=" mr-3 text-white">Loop AI</span>
                </div>
                </div>
         </div>
    </div>
    )
}