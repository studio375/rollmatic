import parse from 'html-react-parser';
export default function Paragraph({Tag = 'span', children, ...props}){
    return <Tag {...props}>{parse(children)}</Tag>
}