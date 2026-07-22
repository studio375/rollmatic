"use client"
import { useEffect } from "react";
import BigText from "../Big Text/bigText"
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

export default function IncrementNumber({page, ...props}){
    useGSAP(() =>{
        var tml = gsap.timeline({
            scrollTrigger: {
                trigger: '.number',
                start: "top 70%",
                invalidateOnRefresh: true,
            }
        });
        tml.from('.number', {innerText: 0, duration: 4, snap : {innerText: 1}});
        return () => {
            tml.scrollTrigger?.kill();
            tml.kill();
        }
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
