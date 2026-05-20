"use client"
export default function VideoHtml({videoObj, ...props}){
    return <video {...props} className={`relative w-full h-full object-cover ${props.className || ''}`} autoPlay muted loop playsInline onContextMenu={() => {return false;}}> 
        <source src={`${videoObj.url}#t=0.1`} type="video/mp4" />
    </video>
}