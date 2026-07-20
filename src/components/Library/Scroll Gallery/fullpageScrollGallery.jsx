"use client"
import { Link } from "@/i18n/navigation";
import BigText from "../Big Text/bigText";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useTranslations } from "next-intl";

export default function FullpageScrollGallery({elements,children}){
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const ref = useRef(null);
    const t = useTranslations('strings');
    const handleScroll = (distance, count) => {
        var galleryProgress = (window.scrollY - distance);
        var total = 500 * count;
        var singleStep = total / (count-1);
        for (let index = 0; index < (count - 1); index++) {
            var step = (singleStep * index) + (singleStep/2);
            var nextStep = singleStep * (index+1); 
            if(galleryProgress >= step && galleryProgress < nextStep){
                setCurrentSlideIndex(index + 1);
            }else if(galleryProgress < nextStep && galleryProgress >= (singleStep*index)){
                setCurrentSlideIndex(index);
            }
        }
    }
    useEffect(() => {
        if(!ref.current) return;
        var slides = ref.current.children[0].children;
        const slidesArray = Array.from(slides);
        var tml = gsap.timeline({
            scrollTrigger: {
                trigger: ref.current,
                start: 'top 0',
                end: `+=${500*elements.length}px`,
                pin: true,
                scrub: true,
                invalidateOnRefresh: true,
            }
        });
        slidesArray.forEach((element, index) => {
            if(index == (slidesArray.length - 1)) return;
            tml.to(element, {marginLeft: `-${element.offsetWidth}px`, ease: 'none'});
        });
        var dist = ref.current.getBoundingClientRect().top + window.scrollY;
        window.addEventListener("scroll", () => handleScroll(dist, slidesArray.length));
        return () => {
            tml.scrollTrigger.kill();
            tml.kill();
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);
    return <div className="w-full h-screen relative" ref={ref}>
        <div className="w-full h-full relative flex items-start justify-start">{children}</div>
        <div className="w-full absolute bottom-0 left-0 flex items-center justify-between pl-3 pr-12 pb-3">
            <div className="flex items-center justify-start gap-5">
                <div className="block"><span className="text-[var(--color-primary)] uppercase">{t('Settori')}</span></div>
                {
                    elements.map((elem, index) => {
                        return <div key={elem.id} data-id={elem.id} className="single-cat block"><span className={`text-[var(--color-background)] uppercase ${index == currentSlideIndex && 'font-bold'}`}>{elem.title.rendered}</span></div>;
                    })
                }
            </div>
            <div className="block relative">
                {
                    elements.map((elem, index) => {
                        return <div key={elem.id} className={`single-link ${index == currentSlideIndex && 'active'} absolute right-0 bottom-0 opacity-0 [&.active]:opacity-100`}>
                            <Link className="flex flex-col items-end" href={`/${t('Settori').toLowerCase()}/${elem.slug}`}>
                                <BigText tag="span" className="font-bold text-[48px] text-[var(--color-background)]">{elem.title.rendered}</BigText>
                                <Image className="mt-2" src="/next-arrow-light.svg" width={50} height={20} alt=""/>
                            </Link>
                        </div>
                    })
                }
            </div>
        </div>
    </div>
}