import { useEffect, useRef, useState } from 'react';
import { formatFileSize } from '@/utils/lib';
import { ArrowCircleDownIcon } from '../../atoms/icons';
import AudioPlayButton from '../../atoms/AudioPlayButton';
import useFileDownload from '@/hooks/useFileDownload';
import cls from './AudioPlayer.module.scss';

const AudioPlayer = ({
    url = null,
    title = ''
}) => {
    const audioRef = useRef(null);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isAudioLoaded, setIsAudioLoaded] = useState(false);
    const { progress, isDownloading, downloadFile, fileSize } = useFileDownload(url)

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const togglePlay = () => {
        if(isAudioLoaded){   
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        } else {
            downloadFile()
            setIsAudioLoaded(true)
            audioRef.current.play();
            setIsPlaying(true);
        }
    };

    const handleProgressChange = (e) => {
        const audio = audioRef.current;
        const newTime = Number(e.target.value);
        audio.currentTime = newTime;
        setCurrentTime(newTime);
    };

    useEffect(() => {
        const audio = audioRef.current;

        const updateCurrentTime = () => setCurrentTime(audio.currentTime);
        const handleEnded = () => setIsPlaying(false);
        const handleMetadata = () => setDuration(audio.duration)

        audio.addEventListener('timeupdate', updateCurrentTime);
        audio.addEventListener('loadedmetadata', handleMetadata);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('timeupdate', updateCurrentTime);
            audio.removeEventListener('loadedmetadata', handleMetadata);
            audio.removeEventListener('ended', handleEnded);
        };
    }, []);

    return (
        <div className={cls.player}>
            <audio
                preload='metadata'
                ref={audioRef}
                src={url}
            />
            <div className={cls.player__controls}>
                <AudioPlayButton
                    className={cls.player__btn}
                    isPlaying={isPlaying}
                    isLoading={isDownloading}
                    percentage={progress}
                    onClick={togglePlay}
                />
                {!isAudioLoaded && <ArrowCircleDownIcon />}
            </div>
            <span className={cls.player__title}>{title}</span>
            <input
                className={cls.player__range} 
                type="range" 
                min="0" 
                max={duration} 
                step="0.1"
                value={currentTime}
                onChange={handleProgressChange}
            />
            <span className={cls.player__time}>
                {formatTime(currentTime)} / {formatTime(duration)}, <></>
                {formatFileSize(fileSize || 0)}
            </span>
        </div>
    );
}

export default AudioPlayer;