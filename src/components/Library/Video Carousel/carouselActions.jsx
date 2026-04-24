import { useEffect, useState } from "react";
import './videoCarousel.scss';
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
    return <div className='carousel-actions'>
        <div className='prev' onClick={handleClickPrev}><Image src="/next-arrow.svg" width={50} height={20} alt="Prossima slide" /></div>
        <div className='slide-progress'>{currentSlide}/{total}</div>
        <div className='next' onClick={handleClickNext}><Image src="/next-arrow.svg" width={50} height={20} alt="Prossima slide" /></div>
    </div>;
}