"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import VideoPlayer from "../video Player/videoPlayer";
import { useState } from "react";
import CarouselActions from "./carouselActions";
import "swiper/css/effect-cards";
import "swiper/css/autoplay";
import { EffectCards, Autoplay } from "swiper/modules";
import Image from "next/image";

export default function VideoCarousel({ videoIds, images = null }) {
  const [swiperInstance, setSwiperInstance] = useState(null);

  return (
    <div className="video-carousel-section overflow-hidden">
      <Swiper
        onSwiper={(swiper) => setSwiperInstance(swiper)}
        slidesPerView={1}
        effect="cards"
        speed={600}
        autoplay={
          images
            ? {
                delay: 1700,
                disableOnInteraction: false,
              }
            : false
        }
        modules={[EffectCards, Autoplay]}
        className={"video-carousel-cards s:max-w-[calc(200%/3)] !ml-0 relative"}
        cardsEffect={{ rotate: false, perSlideOffset: 30 }}
      >
        {images
          ? images.map((elem, i) => {
              return (
                <SwiperSlide key={i}>
                  <Image
                    src={elem.url}
                    width={elem.width}
                    height={elem.height}
                    alt=""
                    className="aspect-5/3 object-cover w-full"
                  />
                </SwiperSlide>
              );
            })
          : videoIds.map((elem) => {
              return (
                <SwiperSlide key={elem}>
                  <VideoPlayer videoId={elem} />
                </SwiperSlide>
              );
            })}
      </Swiper>
      {swiperInstance && <CarouselActions swiperInstance={swiperInstance} />}
    </div>
  );
}
