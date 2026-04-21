import Image from "next/image"
import style from './scrollGallery.module.scss';
import { useState } from "react";

export default function ScrollGallery({images, ...props}){
    //var aspectRatio = `${images[0].width}/${images[0].height}`;
    const [currentSlide, setCurrentSlide] = useState(1);
    var images = images.map((elem, index) => {
        var slideHeight = 500 - (100 * index);
        var right=-100;
        var zIndex = 100 - index;
        var top = 20 * index;
        switch (index) {
            case 0:
                right= 200;
                break;
            case 1:
                right= 100;
                break;
            case 3:
                right= 0;
                break;
        }
        return <Image key={elem.ID} src={elem.url} width={elem.width} height={elem.height} alt={elem.alt || 'Immagine di galleria'} style={{height: slideHeight, right: right, zIndex: zIndex, top: top}}/>
    })
    
    return <div {...props} className={`${props.className || ''} ${style.scrollGallery}`}>
        <div className={style.slidesContainer}>{images}</div>
        <div className={style.actions}>
            <div className={style.counter}>{currentSlide}/{images.length}</div>
        </div>
    </div>
}