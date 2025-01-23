import { useEffect, useRef, useState } from 'react';
import { formatFileSize, getFileSizeFromUrl } from '@/utils/lib';
import AudioPlayButton from '../../atoms/AudioPlayButton';
import cls from './AudioPlayer.module.scss';

const AudioPlayer = ({
    url = 'https://api.myteacher.uz/file/material/296a4b1d-fc31-4f59-ba1b-9fa7ff246d0a-17309735691401737622741460.mp3',
    title = '2-dars. Present simple'
}) => {
    const [size, setSize] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {

        getFileSizeFromUrl(url).then(setSize)
    }, [url])

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };
    const handleSeek = (e) => {
        const audio = audioRef.current;
        const newTime = (e.target.value / 100) * duration;
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
            <AudioPlayButton
                className={cls.player__btn}
                isPlaying={isPlaying}
                onClick={togglePlay}
            />
            <span className={cls.player__title}>{title}</span>
            <input
                className={cls.player__range}
                type="range"
                min="0"
                max="100"
                value={(currentTime / duration) * 100 || 0}
                onChange={handleSeek}
            />
            <span className={cls.player__time}>
                {formatTime(currentTime)} / {formatTime(duration)}, <></>
                {formatFileSize(size || 0)}
            </span>
        </div>
    );
}

export default AudioPlayer;