import { createContext, useEffect, useState } from "react";

export const WavesurferContext = createContext()

export const WavesurferProvider = ({ children }) => {
    const [audio, setAudio] = useState({ url: null })

    useEffect(() => {
        const sourse = audio?.sourseAudio
        const instance = audio.instanceAudio

        if (sourse && instance) {
            const EventHandlers = {
                pause: (from) => {
                    return () => {
                        from === 'sourse' ? instance.pause() : sourse.pause()
                    }
                },
                play: (from) => {
                    return () => {
                        from === 'sourse' ? instance.play() : sourse.play()
                    }
                },
                seeking: (from) => {
                    return (seek) => {
                        if (from === 'sourse') {
                            const duration = 1 / sourse.getDuration()
                            instance.seekTo(seek * duration)
                        } else {
                            const duration = 1 / instance.getDuration()
                            sourse.seekTo(seek * duration)
                        }
                        sourse.play()
                        instance.play()
                    }
                }
            }


            Object.entries(EventHandlers).map(([event, func]) => {
                sourse.on(event, func('sourse'))
                instance.on(event, func('instanse'))
            })
        }
    }, [audio])

    return (
        <WavesurferContext.Provider value={{ audio, setAudio }}>
            {children}
        </WavesurferContext.Provider>
    )
}