import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css';
import VideoPlayer from '../video Player/videoPlayer';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import './videoCarousel.scss';
import EffectCarousel from '@/lib/EffectCarousel/effect-carousel.esm.js';
import '@/lib/EffectCarousel/effect-carousel.scss';
import { useState } from 'react';
import CarouselActions from './carouselActions';


export default function VideoCarousel({videoIds}){
    const [swiperInstance, setSwiperInstance] = useState(null);

    return <div className='video-carousel-section'>
                <Swiper 
                    onSwiper={(swiper) => (setSwiperInstance(swiper))} 
                    // autoplay={{delay: 2500,disableOnInteraction: true}} 
                    slidesPerView={3} 
                    loop={false} 
                    effect='carousel' 
                    modules={[EffectCarousel, Autoplay, Navigation, Pagination]} 
                    className='video-carousel'
                >
                    {
                        videoIds.map(elem => {
                            return <SwiperSlide key={elem}><VideoPlayer videoId={elem} /></SwiperSlide>
                        })
                    }
                    {
                        (videoIds.length <= 3) && videoIds.map(elem => {
                            return <SwiperSlide key={elem}><VideoPlayer videoId={elem} /></SwiperSlide>
                        })
                    }
                </Swiper>
                {swiperInstance && <CarouselActions swiperInstance={swiperInstance} />}
            </div>
}