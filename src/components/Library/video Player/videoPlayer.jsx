"use client";
import dynamic from "next/dynamic";
import "plyr-react/plyr.css";
const Plyr = dynamic(() => import('plyr-react').then((fun) => ({default: fun.Plyr})), { ssr: false });



export default function VideoPlayer({videoId}){
    const plyrProps = {
        id:{videoId},
        source: {
            type: "video",
            sources: [
                {
                    src: videoId,
                    provider: 'youtube',
                },
                // {
                //     src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4',
                //     type: "video/mp4",
                //     size: 720,
                // }
            ],
            poster: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg",
        },
        options: {
            // Full list of options: https://github.com/sampotts/plyr#options
            controls: [
                "play-large",
                "play",
                "progress",
                "current-time",
                "mute",
                "volume",
                "captions",
                "settings",
                "pip",
                "airplay",
                "fullscreen",
            ],
            youtube: { noCookie: true },
        },
    }
    return <Plyr {...plyrProps} />;
}