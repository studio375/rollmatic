import parse from 'html-react-parser';
export default function Paragraph({children}){
    return <span>{parse(children)}</span>
}