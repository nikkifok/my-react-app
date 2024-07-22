// BGM.js

import React, { useEffect, useRef } from "react";

const BGM = ({ src, volume = 0.5, shouldPlay }) => {
  const audioRef = useRef(null);

    useEffect(() => {
        const audio = audioRef.current;

        if (shouldPlay && audio) {
            audio.volume = volume;
            audio.loop = true; // Ensure the audio loops
            const playPromise = audio.play();
            if (playPromise !== undefined) {
              playPromise
                .then(() => {
                  console.log("Audio is playing automatically.");
                })
                .catch((error) => {
                  console.error("Audio playback was prevented:", error);
                });
            }
          }
        }, [shouldPlay, volume]);


    return <audio ref={audioRef} src={src} />;
};

export default BGM;
