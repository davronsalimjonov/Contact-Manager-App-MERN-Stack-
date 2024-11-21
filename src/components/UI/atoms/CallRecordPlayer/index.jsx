import { useRef, useState } from 'react';
import { useWavesurfer } from '@wavesurfer/react';
import { cn } from '@/utils/lib';
import cls from './CallRecordPlayer.module.scss';

const CallRecordPlayer = ({
    className = '',
    url = '',
}) => {
    const containerRef = useRef()
    const { wavesurfer, isReady, isPlaying, currentTime } = useWavesurfer({
        container: containerRef,
        height: 24,
        barGap: 2,
        barWidth: 2,
        barHeight: 2,
        waveColor: 'rgba(61, 73, 98, 1)',
        progressColor: 'rgba(18, 86, 219, 1)',
        cursorColor: 'transparent',
        barAlign: 'bottom',
        url
    })

    const [isAudioLoaded, setIsAudioLoaded] = useState(false);

    const onPlayPause = async () => {
        wavesurfer && wavesurfer.playPause();
        // if (!isAudioLoaded) {
        //     try {
        //         const response = await fetch(url);
        //         const blob = await response.blob();
        //         url = URL.createObjectURL(blob);

        //         wavesurfer.load(url);

        //         wavesurfer.on("ready", () => {
        //             setIsAudioLoaded(true);
        //             wavesurfer.play();
        //         });
        //     } catch (error) {
        //         console.error("Failed to load audio:", error);
        //     }
        // } else {
        //     wavesurfer.playPause();
        // }
    }

    return (
        <div className={cn(cls.player, className)}>
            <button className={cls.player__btn} onClick={onPlayPause}>
                <div className={cn(cls.icon, isPlaying ? cls.paused : '')}></div>
            </button>
            <div ref={containerRef} style={{ flex: 1 }}></div>
        </div>
    );
}

export default CallRecordPlayer;