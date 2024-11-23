import { memo, useRef } from 'react';
import { cn } from '@/utils/lib';
import cls from './AudioPlayButton.module.scss';
import { CloseIcon } from '../icons';

const AudioPlayButton = ({
    onClick,
    isPlaying,
    percentage = 0,
    isLoading = false
}) => {
    const loaderRef = useRef()
    const radius = (loaderRef?.current?.getBoundingClientRect()?.width / 2) || 20
    const circumference = String(2 * Math.PI * radius);
    const progress = String((100 - percentage) / 100 * circumference);

    return (
        <button className={cls.btn} onClick={onClick}>
            {isLoading && (
                <div className={cls.btn__loader}>
                    <svg>
                        <circle ref={loaderRef} width='80%' height='80%' cx="50%" cy="50%" r='40%' stroke="rgba(255,255,255,0.2)" strokeWidth="5%" fill="none" />
                        <circle cx="50%" cy="50%" r='40%' stroke="white" strokeWidth="5%" fill="none" strokeDasharray={circumference} strokeDashoffset={progress} />
                    </svg>
                </div>
            )}
            {isLoading ? (
                <CloseIcon fill="white" />
            ) : (
                <div className={cn(cls.icon, isPlaying ? cls.paused : '')}></div>
            )}
        </button>
    );
}

export default memo(AudioPlayButton);