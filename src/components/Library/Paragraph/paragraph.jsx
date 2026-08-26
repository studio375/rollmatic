"use client"
import { paragraphAnimation } from '@/helpers/animations';
import parse from 'html-react-parser';
import { useEffect, useRef } from 'react';
export default function Paragraph({Tag = 'span', children, ...props}){
    const ref = useRef(null);
    useEffect(() => {
        if(ref.current.classList.contains('no-animation')) return;
       var tml = paragraphAnimation(ref.current);
       return () => {
            if(tml){
                tml.scrollTrigger?.kill();
                tml.kill();
            }
       }
    }, []);
    var text = `<p>${children.replace('<br>', '</p><br><p>')}</p>`;
    return <Tag ref={ref} {...props} className={` ${props.className || ''} [&_.single-line]:opacity-50`}>{parse(text.replace('<p><p>', '<p>').replace('</p></p>', '</p>'))}</Tag>
}