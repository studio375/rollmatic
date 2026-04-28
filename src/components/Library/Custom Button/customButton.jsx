import Link from "next/link";

export default function CustomButton({Tag=Link, children, ...props}){
    return <Tag {...props} className={`custom-button ${props.className || ''}`} >{children}</Tag>
}