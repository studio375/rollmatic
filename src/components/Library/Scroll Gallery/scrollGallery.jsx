"use client";
import Image from "next/image"
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";


export default function ScrollGallery({images, ...props}){
    //var aspectRatio = `${images[0].width}/${images[0].height}`;
    const [currentSlide, setCurrentSlide] = useState(1);
    const galleryRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);
    const [maxSlides, setMaxSlides] = useState(10);
    const [tmlObject, setTmlObject] = useState(null);
    var images = images.map((elem, index) => {
        var right = (-100 * index) + 200;
        switch (index) {
            case 0:
                right= 200;
                break;
            case 1:
                right= 100;
                break;
            case 2:
                right= 0;
                break;
        }
        var styleObject = {
            height:  `calc(50vh - ${100*(index > 3?index:index)}px)`,
            right: right, 
            zIndex: 100 - index, 
            top: 20 * index
        }
        return <Image className={`slide h-auto absolute object-cover rounded-[5px] w-[calc(100%-200px)] ${index == 0?'max-m:relative':''} max-m:!w-full max-m:!right-0 max-m:!h-auto max-m:!max-h-[60vh] max-s:!max-h-[unset] max-m:!top-0`} key={elem.ID} src={elem.url} width={elem.width} height={elem.height} alt={elem.alt || 'Immagine di galleria'} style={styleObject}/>
    })
    useEffect(() => {
        setIsMobile(window.innerWidth < 1025);
        window.addEventListener('resize', () => setIsMobile(window.innerWidth < 1025));
    }, []);
    useGSAP(() => {
        if(!galleryRef) return;
        var slides = isMobile?galleryRef.current.querySelectorAll('.slide:not(:last-child)'):galleryRef.current.querySelectorAll('.slide'); //array con tutte le slide (immagini) della galleria
        var totalSlides = slides.length;
        var totalScroll = (100 * totalSlides); // 100 è lo spazio in px tra una slide e l'altra
        setMaxSlides(galleryRef.current.querySelectorAll('.slide').length);
        var tml = gsap.timeline({
            scrollTrigger:{
                trigger: galleryRef.current,
                start: 'top 30%',
                end: `+=${500*totalSlides}px`,
                pin: galleryRef.current.closest('section'),
                scrub: true,
                invalidateOnRefresh: true,
                onLeave: () => {
                    setCurrentSlide(galleryRef.current.querySelectorAll('.slide').length);
                }
            } 
        });
        setTmlObject(tml);
        if(isMobile){
            slides.forEach((elem, i) => {   
                tml.to(elem, {xPercent:-100, ease: 'none'})
                   .to(elem, {opacity: 0, ease: 'none', delay: (i) => i*0.4, onUpdate: () => setCurrentSlide(i + 1)}, '<');
            });
        }else{
            tml.to(slides, {
                right: (i) => `+=${(i==totalSlides-1)?totalScroll-100:totalScroll}px`, 
                top: 0,
                height:'50vh',
                ease: 'none', 
                onUpdate: () => {
                    slides.forEach((elem, i) => {
                        var currRight = parseFloat(elem.style.right);
                        // if(!isMobile){
                            // if(currRight < 100 && currRight > 0){
                            //     gsap.set(elem, {height: `calc((50vh - 100px) - ${(100-currRight)}px)`});
                            // }
                        // }
                        if(currRight > 200){
                            gsap.set(elem, {
                                opacity: gsap.utils.clamp(0, 1, (400-currRight) / 100),
                                x: `-${(100 - (400-currRight)) / 2}%`
                            });
                        }
                        
                        if(currRight > 200){
                            setCurrentSlide(i + 1);
                        }
                    });
                }
            });
        }
        

        return () => {
            if(tml) {
                tml.scrollTrigger?.kill();
                tml.kill();
                ScrollTrigger.refresh();
            }
        };
    },{dependencies:[galleryRef, isMobile], revertOnUpdate: true})

    function manualChangeSlide(index){
        var slides = isMobile?galleryRef.current.querySelectorAll('.slide:not(:last-child)'):galleryRef.current.querySelectorAll('.slide'); //array con tutte le slide (immagini) della galleria
        var totalSlides = slides.length;
        var stObj = tmlObject.scrollTrigger; 
        var newProgress = (1/(totalSlides))*index;
        console.log(index);
        var stTotalScroll = stObj.end - stObj.start; //calcolo il totale del valore dello scroll della tml
        var dest = stObj.start + (stTotalScroll * newProgress); //parto dall'inizio e scrollo per il valore del nuovo progress
        stObj.scroll(dest);
        ScrollTrigger.refresh();
    }
    
    return <div ref={galleryRef} {...props} className={`${props.className || ''} w-full relative flex flex-col items-start`}>
        <div className={`w-full relative m:h-[50vh]`}>{images}</div>
        <div className={`w-[calc(100%-200px)] max-m:w-full mt-2 flex justify-between align-center`}>
            <Image onClick={() => manualChangeSlide(currentSlide-1)}  className={`cursor-pointer ${currentSlide==1?'opacity-0':''} transition-all duration-300 rotate-[-180deg]`} src={'/next-arrow.svg'} width={50} height={30} alt="arrow"/> 
            <div>{currentSlide}/{images.length}</div>
            <Image onClick={() => manualChangeSlide(currentSlide+1)}  className={`cursor-pointer ${currentSlide==maxSlides?'opacity-0':''} transition-all duration-300`} src={'/next-arrow.svg'} width={50} height={30} alt="arrow"/>
        </div>
    </div>
}