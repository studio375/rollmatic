import parse from 'html-react-parser';
export default function BigText({Tag='h2', children, ...props}){
    return <Tag {...props} className={`${props.className || ''}`}>{parse(children)}</Tag>;
}