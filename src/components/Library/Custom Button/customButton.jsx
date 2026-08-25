"use client"
import { fadeAnimation } from "@/helpers/animations";
import { Link } from "@/i18n/navigation";
import { useEffect, useRef } from "react";

export default function CustomButton({Tag=Link, children, ...props}){
    const ref = useRef(null);
    useEffect(() => {
        if(ref.current.classList.contains('no-animation')) return;
        var tml = fadeAnimation(ref.current, true);
        return () => {
            if(tml)
                tml.scrollTrigger?.kill();
                tml.kill();
        }
    }, []);
    return <Tag {...props} ref={ref} className={`${props.className || ''} btn [&:not(.no-animation)]:opacity-0 relative inline-flex border-[2px] border-[var(--color-primary)] rounded-[50px] px-[16px] uppercase cursor-pointer text-[var(--color-primary)] text-[20px]/[30px] bg-transparent [&.light]:border-[var(--background)] [&.light]:!text-[var(--background)] overflow-hidden [&:hover]:!text-[var(--background)] transition-all duration-300 [&:hover_*]:!text-[var(--background)] [&_*]:transition-all [&_*]:duration-300 z-1`} >
        <div className="back absolute left-0 top-0 h-full w-0 bg-[var(--color-primary)] [.btn:hover_&]:w-full transition-all duration-300 -z-1"></div>
        {children}
    </Tag>
}