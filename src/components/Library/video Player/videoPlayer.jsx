"use client";
import dynamic from "next/dynamic";
import "plyr-react/plyr.css";
import { useEffect, useState } from "react";
const Plyr = dynamic(() => import('plyr-react').then((fun) => ({default: fun.Plyr})), { ssr: false });



export default function VideoPlayer({videoId}){
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        setLoaded(true);
    },[]);
    if(!loaded) return null;
    const plyrProps = {
        source: {
            type: "video",
            sources: [
                {
                    src: videoId,
                    provider: 'youtube',
                },
            ],
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
        },
    }
    return <Plyr {...plyrProps} />;
}