"use client"
import { titleAnimation } from '@/helpers/animations';
import parse from 'html-react-parser';
import { useEffect, useRef } from 'react';

function getTextContent(node) {
    if (Array.isArray(node)) return node.map(getTextContent).join('');
    if (typeof node === 'string' || typeof node === 'number') return String(node);
    if (!node || typeof node !== 'object' || !('props' in node)) return '';
    const text = getTextContent(node.props.children);
    return node.type === 'br' ? `${text} ` : text;
}

export default function BigText({Tag='h2', children, ...props}){
    const ref = useRef(null);
    const animatedTextRef = useRef(null);
    const parsedChildren = parse(children);
    const accessibleText = getTextContent(parsedChildren);
    useEffect(() => {
        if(ref.current.classList.contains('no-animation')) return;
        var tml = titleAnimation(animatedTextRef.current);
        return () => {
            if(tml){
                tml.scrollTrigger?.kill();
                tml.kill();
            }
        }
    }, []);
    return (
        <Tag {...props} ref={ref} className={`${props.className || ''}`}>
            <span className="sr-only">{accessibleText}</span>
            <span ref={animatedTextRef} aria-hidden="true">{parsedChildren}</span>
        </Tag>
    );
}