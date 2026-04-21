export default function CustomButton({Tag="a", children, ...props}){
    return <Tag {...props} className={`custom-button ${props.className || ''}`} >{children}</Tag>
}