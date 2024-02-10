<div className="flex-1 p-2 sm:p-6 justify-between flex flex-col h-screen">

    
    <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
        <div className="relative flex items-center space-x-4">
            <div className="relative">
                <span className="absolute text-green-500 right-0 bottom-0">
                    <svg width="20" height="20">
                    <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
                    </svg>
                </span>
                <img
                    src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
                    alt=""
                    className="w-10 sm:w-16 h-10 sm:h-16 rounded-full"
                />
                </div>
                <div className="flex flex-col leading-tight">
                <div className="text-2xl mt-1 flex items-center">
                    <span className="text-gray-700 mr-3">Anderson Vanhron</span>
                </div>
                <span className="text-lg text-gray-600">Junior Developer</span>
                </div>
         </div>
        <div className="flex items-center space-x-2">
              {/* ... Buttons */}
        </div>
    </div>


    <div id="messages" className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
            {/* ... Chat messages */}
    </div>
            <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
            <div className="relative flex">
                <span className="absolute inset-y-0 flex items-center">
                {/* ... More buttons */}
                </span>
                <input type="text" placeholder="Write your message!" className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3" />
                <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
                {/* ... More buttons */}
                </div>
        </div>
        </div>
    <style>
    {`
        .scrollbar-w-2::-webkit-scrollbar {
        width: 0.25rem;
        height: 0.25rem;
        }
        /* ... rest of the styles */
    `}
    </style>



    <form className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0" onSubmit={sendMessage} >
      <div className="relative flex"> 
         <input 
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            placeholder="say something nice"
            type="text"
            className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"/>
         <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
         <button type="submit" disabled={!formValue} className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none">
            {sendIcon}
        </button>
         </div>
      </div>
   </form>
</div>