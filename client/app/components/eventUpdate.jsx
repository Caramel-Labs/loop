export default function EventUpdate(props){

    const {caption, imgName } = props.data

    const imgPath = `https://res.cloudinary.com/dy3hecuzo/image/upload/v1691679809/ProfilePics/${imgName}.jpg`
    return(
      <div>
        <h1>{caption}</h1>
        <img src={imgPath} alt="" />
      </div> 
    )
}