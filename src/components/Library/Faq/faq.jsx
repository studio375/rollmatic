"use client"
import { useEffect, useRef } from "react"
import Paragraph from "../Paragraph/paragraph"

function handleClickFaq(faq, index){
    var singleLine = faq.children[index];
    var risposta = singleLine.querySelector('.risposta');
    if (risposta.style.height && risposta.style.height !== '0px') {
        risposta.style.height = '0px';
    } else {
        risposta.style.height = `${risposta.scrollHeight}px`;
    }
}

export default function Faq({faq}){
    const ref = useRef([]);
    
    return <div ref={ref} className="flex flex-col items-start w-full">
        {
            faq.map((elem, index) => {
                return <div onClick={() => handleClickFaq(ref.current, index)} key={index} className="w-full py-2 border-b-[1px] border-b-[var(--color-primary)] [&:first-child]:border-t-[1px] [&:first-child]:border-t-[var(--color-primary)] cursor-pointer">
                    <div className="domanda w-full flex items-center gap-4">
                        <span>{index+1}</span>
                        <span>{elem.domanda}</span>
                    </div>     
                    <div className="risposta w-full h-0 overflow-hidden transition-all duration-300">
                        <Paragraph className="inner block pt-2">{elem.risposta}</Paragraph>
                    </div>     
                </div>
            })
        }
    </div>
}