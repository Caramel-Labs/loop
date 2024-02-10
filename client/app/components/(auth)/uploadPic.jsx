'use client'
import { useState } from 'react';
import { useFormState } from "@/app/utility/FormContext"

export default function UploadPic() {

  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();

  const { onHandleNext, formData } = useFormState()
  const defaultPic = "https://res.cloudinary.com/dy3hecuzo/image/upload/v1701959915/logo.png"
  const { username } = formData

  /**
   * handleOnChange
   * @description Triggers when the file input changes (ex: when a file is selected)
   */

  function handleOnChange(changeEvent) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    }

    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  /**
   * handleOnSubmit
   * @description Triggers when the main form is submitted
   */

  async function handleOnSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const fileInput = Array.from(form.elements).find(({ name }) => name === 'file');

    const formData = new FormData();

    for (const file of fileInput.files) {
      formData.append('file', file);
    }

    formData.append('public_id', username);
    formData.append('upload_preset', 'caramel-test');

    const data = await fetch('https://api.cloudinary.com/v1_1/dy3hecuzo/image/upload', {
      method: 'POST',
      body: formData
    }).then(r => r.json());

    setImageSrc(data.secure_url);
    setUploadData(data);

    onHandleNext()
  }

  return (
    <div className="h-screen bg-zinc-950">


      <h1 className="pt-32 bg-zinc-950 text-center text-white font-bold">
        ADD A PROFILE PICTURE
      </h1>
      <p className='text-center text-xs text-white pt-9'>Entering your personal email address
        means entering your details manually,
        but don't worry, we'll guide you through it!</p>

      <div className='rounded-full'>
        <img src={imageSrc || defaultPic} className='rounded-full mt-12 h-44 w-44 mx-20' />
      </div>


      <form className="" method="post" onChange={handleOnChange} onSubmit={handleOnSubmit}>

        <div className='mt-6 flex justify-center'>
          <input id="fileInput" type="file" name="file" />
        </div>



        {imageSrc && !uploadData && (
          <p>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded  h-12 w-80 rounded-lg text-xs mt-56 mx-4'>Next</button>
          </p>
        )}

        {/* {uploadData && (
                <code><pre>{JSON.stringify(uploadData, null, 2)}</pre></code>
              )} */}
      </form>

    </div>
  )
}

