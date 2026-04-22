import parse from 'html-react-parser';
export default function Paragraph({Tag = 'span', children}){
    return <Tag>{parse(children)}</Tag>
}