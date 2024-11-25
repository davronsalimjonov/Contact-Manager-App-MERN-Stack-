import { useCallback, useEffect, useRef, useState } from 'react';
import { useWavesurfer } from '@wavesurfer/react';
import { cn } from '@/utils/lib';
import { CALL_RECORD_DEFAULT_PEAKS } from '@/constants';
import AudioPlayButton from '../../atoms/AudioPlayButton';
import cls from './CallRecordPlayer.module.scss';

const CallRecordPlayer = ({
    url = '',
    className = '',
    onReady
}) => {
    const containerRef = useRef()
    const abortControllerRef = useRef(new AbortController());
    const [fetchParams, setFetchParams] = useState(() => ({ signal: abortControllerRef.current.signal }));
    const [isLoading, setIsLoading] = useState(false);
    const [isAudioLoaded, setIsAudioLoaded] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(0);

    const { wavesurfer, isPlaying } = useWavesurfer({
        container: containerRef,
        height: 24,
        barGap: 2,
        barWidth: 2,
        barHeight: 2,
        barAlign: 'bottom',
        cursorColor: 'transparent',
        waveColor: 'rgba(61, 73, 98, 1)',
        progressColor: 'rgba(18, 86, 219, 1)',
        peaks: CALL_RECORD_DEFAULT_PEAKS,
        normalize: true,
        duration: 210,
        fetchParams
    })

    const cancelLoading = useCallback(() => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
            abortControllerRef.current = new AbortController();
            setFetchParams({ signal: abortControllerRef.current.signal });
            setIsLoading(false);
            setLoadingProgress(0);
        }
    }, []);

    const onPlayPause = useCallback(async () => {
        if (!isAudioLoaded && wavesurfer && url) {
            try {
                setIsLoading(true);
                await wavesurfer.load(url);
                
                setIsAudioLoaded(true);
                setIsLoading(false);
                wavesurfer.play();
            } catch (error) {
                if (error.name === 'AbortError') {
                    console.log('Loading cancelled by user');
                } else {
                    console.error('Error loading audio:', error);
                }
                setIsLoading(false);
                setLoadingProgress(0);
            }
        } else if (wavesurfer) {
            wavesurfer.playPause();
        }
    }, [isAudioLoaded, wavesurfer, url]);

    useEffect(() => {
        if (wavesurfer) {
            wavesurfer.on('loading', (percent) => {
                setLoadingProgress(percent);
            });
            wavesurfer.on('ready', () => {
                onReady?.(wavesurfer)
                setIsLoading(false);
                setLoadingProgress(100);
            });
            wavesurfer.on('error', () => {
                setIsLoading(false);
                setLoadingProgress(0);
            });
        }
    }, [wavesurfer]);

    return (
        <div className={cn(cls.player, className)}>
            <AudioPlayButton
                onClick={isLoading ? cancelLoading : onPlayPause}
                isPlaying={isPlaying}
                isLoading={isLoading}
                percentage={loadingProgress}
            />
            <div ref={containerRef} style={{ flex: 1 }}></div>
        </div>
    );
}

export default CallRecordPlayer;