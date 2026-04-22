import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import VideoPlayer from '../video Player/videoPlayer';

export default function VideoCarousel({videoIds}){
    return <Swiper>
        {
            videoIds.map(elem => {
                return <SwiperSlide><VideoPlayer videoId={elem} /></SwiperSlide>
            })
        }
    </Swiper>;
}