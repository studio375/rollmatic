"use client";
import Image from "next/image"
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";


export default function ScrollGallery({images, ...props}){
    //var aspectRatio = `${images[0].width}/${images[0].height}`;
    const [currentSlide, setCurrentSlide] = useState(1);
    const galleryRef = useRef(null);
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
            height:  `calc(50vh - ${100*index}px)`,
            right: right, 
            zIndex: 100 - index, 
            top: 20 * index
        }
        return <Image className={`h-auto absolute object-cover ${index == 0?'w-[calc(100%-200px)] max-m:relative':'w-[calc(100%-300px)]'} max-m:!w-full max-m:!right-0 max-m:!h-auto max-m:!max-h-[60vh] max-s:!max-h-[unset] max-m:!top-0`} key={elem.ID} src={elem.url} width={elem.width} height={elem.height} alt={elem.alt || 'Immagine di galleria'} style={styleObject}/>
    })

    useGSAP(() => {
        if(!galleryRef) return;
        var slides = galleryRef.current.querySelectorAll('img'); //array con tutte le slide (immagini) della galleria
        var totalSlides = slides.length;
        var totalScroll = 100 * totalSlides; // 100 è lo spazio in px tra una slide e l'altra
        
        var tml = gsap.timeline({
            scrollTrigger:{
                trigger: galleryRef.current,
                start: 'top 30%',
                end: `+=${500*totalSlides}px`,
                pin: galleryRef.current.closest('section'),
                scrub: true,
            } 
        });
        tml.to(slides, {
            right: `+=${totalScroll}px`, 
            top: 0,
            ease: 'none',
            onUpdate: () => {
                slides.forEach((elem, i) => {
                    var currRight = parseFloat(elem.style.right);
                    
                    if(currRight < 100){
                        gsap.set(elem, {height: `calc((50vh - 100px) - ${(100-currRight)}px)`});
                    }else if(currRight < 200){
                        gsap.set(elem, {height: `calc(50vh - ${(200-currRight)}px)`});
                    }
                    if(currRight > 200){
                        gsap.set(elem, {
                            opacity: gsap.utils.clamp(0, 1, (400-currRight) / 100),
                            x: `-${(100 - (400-currRight)) / 2}%`
                        });
                    }
                    if(currRight > 250){
                        setCurrentSlide(i + 1);
                    }
                });
            }
        });

        return () => {
            if(tml) tml.kill();
        };
    }, [galleryRef])
    
    return <div ref={galleryRef} {...props} className={`${props.className || ''} w-full relative flex flex-col items-start`}>
        <div className={`w-full relative m:h-[50vh]`}>{images}</div>
        <div className={`w-full mt-2`}>
            <div>{currentSlide}/{images.length}</div>
        </div>
    </div>
}