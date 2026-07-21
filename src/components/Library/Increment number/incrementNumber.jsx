"use client"
import { useEffect } from "react";
import BigText from "../Big Text/bigText"
import { gsap } from "@/lib/gsap";

export default function IncrementNumber({page, ...props}){
    useEffect(() =>{
        gsap.utils.toArray('.number').forEach((elem, index) => {
            gsap.from(elem, {
                scrollTrigger: {
                    trigger: elem,
                    start: "top 70%",
                    invalidateOnRefresh: true,
                },
                innerText: 0,
                duration: 4,
                snap : {
                    innerText: 1
                }
            });
        });
    }, []);
    return <div {...props}>
        {
            page.acf.ricerca_e_sviluppo.dati_numerici.map((elem, index) => {
                return <div key={index} className="flex flex-col items-center justify-start gap-2">
                    <div className="relative">
                        <BigText Tag="span" className={'h1 !text-[var(--color-primary)] !font-bold number'}>{elem.numero}</BigText>
                        {elem.testo_aggiuntivo_dato && <BigText Tag="span" className={'h1 l:!text-[80px] !text-[var(--color-primary)] !font-bold '}>{elem.testo_aggiuntivo_dato}</BigText>}
                    </div>
                    <BigText Tag="span" className="!text-[24px] font-semibold text-center">{elem.label}</BigText>
                </div>
            })
        }
    </div>
}   
