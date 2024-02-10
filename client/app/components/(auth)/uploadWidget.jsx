
import { CldUploadWidget } from 'next-cloudinary';

export default function UploadWidget(){
    <CldUploadWidget
    uploadPreset="<Your Upload Preset>"
    onSuccess={(result, { widget }) => {
      setResource(result?.info);
      widget.close();
    }}
  >
    {({ open }) => {
      function handleOnClick() {
        setResource(undefined);
        open();
      }
      return (
        <button onClick={handleOnClick}>
          Upload an Image
        </button>
      );
    }}
  </CldUploadWidget>
}