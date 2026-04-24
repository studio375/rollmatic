import { useEffect, useState } from "react";
import './videoCarousel.scss';
import Image from "next/image";

export default function CarouselActions({swiperInstance}){
    var total = swiperInstance.slides.length / 2; // divido per 2 perchè per creare il loop infinito stampo il doppio delle slide totali
    const [currentSlide, setCurrentSlide] = useState(1);
    function handleClickNext(){
        swiperInstance.slideNext();
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
        <div className='slide-progress'>{currentSlide}/{total}</div>
        <div className='next' onClick={handleClickNext}><Image src="/next-arrow.svg" width={50} height={20} alt="Prossima slide" /></div>
    </div>;
}