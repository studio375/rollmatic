"use client"
import { useEffect, useRef } from "react"
import Paragraph from "../Paragraph/paragraph"

function handleClickFaq(faq, index){
    var singleLine = faq.children[index];
    var risposta = singleLine.querySelector('.risposta');
    singleLine.classList.toggle('open');
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
                    <div className="domanda w-full flex items-center">
                        <div className="flex items-center gap-4 max-m:gap-2 max-w-[calc(100%-50px)] max-m:max-w-[calc(100%-40px)]">
                            <span>{index+1}</span>
                            <span>{elem.domanda}</span>
                        </div>
                        <div className={`w-3 h-3 max-m:w-2 max-m:h-2 ml-auto relative`}>
                            <div className='hor absolute top-[50%] translate-y-[-50%] h-[2px] w-full bg-[var(--color-foreground)] rounded-[2px]'></div>
                            <div className='vert absolute top-[50%] translate-y-[-50%] h-[2px] w-full bg-[var(--color-foreground)] rounded-[2px] rotate-[-90deg] transition-all duration-[0.3s] ease [.open_&]:opacity-0'></div>
                        </div>
                    </div>     
                    <div className="risposta w-full h-0 overflow-hidden transition-all duration-300">
                        <Paragraph className="inner block pt-2">{elem.risposta}</Paragraph>
                    </div>     
                </div>
            })
        }
    </div>
}