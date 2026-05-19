import { useEffect, useState } from "react";
import Image from "next/image";

export default function CarouselActions({swiperInstance}){
    var total = swiperInstance.slides.length; 
    const [currentSlide, setCurrentSlide] = useState(1);
    function handleClickNext(){
        swiperInstance.slideNext();
    }
    function handleClickPrev(){
        swiperInstance.slidePrev();
    }
    useEffect(() => {
        swiperInstance.on('slideChange', function(swiper){
            var curr = swiper.realIndex + 1;
            if(curr > total){
                curr = curr-total;
            }
            setCurrentSlide(curr);
        })
    })
    return <div className='w-[calc(200%/3)] flex items-center justify-between mt-[15px]'>
        <div className='cursor-pointer rotate-[-180deg]' onClick={handleClickPrev}><Image src="/next-arrow.svg" width={50} height={20} alt="Prossima slide" /></div>
        <div>{currentSlide}/{total}</div>
        <div className='cursor-pointer' onClick={handleClickNext}><Image src="/next-arrow.svg" width={50} height={20} alt="Prossima slide" /></div>
    </div>;
}