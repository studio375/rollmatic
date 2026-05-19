import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import VideoPlayer from '../video Player/videoPlayer';
import { useState } from 'react';
import CarouselActions from './carouselActions';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper/modules';


export default function VideoCarousel({videoIds}){
    const [swiperInstance, setSwiperInstance] = useState(null);

    return <div className='video-carousel-section overflow-hidden'>
                <Swiper 
                    onSwiper={(swiper) => (setSwiperInstance(swiper))} 
                    slidesPerView={1} 
                    effect='cards' 
                    modules={[EffectCards]} 
                    className={'video-carousel-cards max-w-[calc(200%/3)] !ml-0 relative'}
                    cardsEffect={{rotate: false, perSlideOffset: 30}}
                >
                    {
                        videoIds.map(elem => {
                            return <SwiperSlide key={elem}><VideoPlayer videoId={elem} /></SwiperSlide>
                        })
                    }
                </Swiper>
                {swiperInstance && <CarouselActions swiperInstance={swiperInstance} />}
            </div>
}