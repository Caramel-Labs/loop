
export default function base64Converter(data) {
    const base64String = btoa(
        String.fromCharCode(...new Uint8Array(data.image.data.data))
      );

      return base64String
}