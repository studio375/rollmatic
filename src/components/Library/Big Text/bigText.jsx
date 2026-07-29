"use client"
import { titleAnimation } from '@/helpers/animations';
import parse from 'html-react-parser';
import { useEffect, useRef } from 'react';
export default function BigText({Tag='h2', children, ...props}){
    const ref = useRef(null);
    useEffect(() => {
        if(ref.current.classList.contains('no-animation')) return;
        var tml = titleAnimation(ref.current);
        return () => {
            if(tml){
                tml.scrollTrigger?.kill();
                tml.kill();
            }
        }
    }, []);
    return <Tag {...props} ref={ref} className={`${props.className || ''}`} >{parse(children)}</Tag>;
}