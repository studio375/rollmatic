"use client"
import { gsap, SplitText } from '@/lib/gsap';
import parse from 'html-react-parser';
import { useEffect, useRef } from 'react';
export default function Paragraph({Tag = 'span', children, ...props}){
    const ref = useRef(null);
    // useEffect(() => {
    //     if(!ref.current) return;
    //     const split = SplitText.create(ref.current, {
    //         type: "chars, words", 
    //         charsClass: "single-char"
    //     });
    //     var tml = gsap.timeline({
    //         scrollTrigger: {
    //             trigger: ref.current,
    //             start: 'top 80%',
    //             end: `+=${ref.current.offsetHeight}px`,
    //             scrub:true,
    //         }
    //     });
    //     tml.to(split.chars, {opacity: 1, duration: 0.3, stagger: 0.2});
    // }, []);
    return <Tag ref={ref} {...props} className={` ${props.className || ''} [&_.single-char]:opacity-50`}>{parse(children)}</Tag>
}