import { useContext, useEffect, useRef } from 'react';
import { cn } from '@/utils/lib';
import { useWavesurfer } from '@wavesurfer/react';
import { WavesurferContext } from '@/providers/WavesurferProvider';
import AudioPlayButton from '../../atoms/AudioPlayButton';
import { AudioSpeed1X, CloseIcon } from '../../atoms/icons';
import cls from './AudioTrackBar.module.scss';

const AudioTrackBar = ({
    className = '',
}) => {
    const trackRef = useRef()
    const { audio, setAudio } = useContext(WavesurferContext)
    const { wavesurfer, isPlaying } = useWavesurfer({
        height: 2,
        audioRate: 1,
        barHeight: 10,
        container: trackRef,
        hideScrollbar: true,
        waveColor: 'rgba(206, 210, 216, 1)',
        progressColor: 'rgba(18, 86, 219, 1)',
        url: audio?.url,
        normalize: true,
        autoplay: true
    })

    const onPlayPause = () => {
        wavesurfer && wavesurfer.playPause()
    }

    const handleChangeSpeed = () => {
        const speeds = [0.5, 1, 1.5, 2]
        const currentSpeed = wavesurfer?.getPlaybackRate()
        const nextSpeed = speeds[speeds.findIndex(speed => speed === currentSpeed) + 1] || speeds[0]

        wavesurfer.setPlaybackRate(nextSpeed)
    }

    useEffect(() => {
        if (wavesurfer) {
            wavesurfer.on('ready', () => {
                setAudio(state => ({ ...state, instanceAudio: wavesurfer }))
            })
        }
    }, [wavesurfer])

    return audio?.url ? (
        <div className={cn(cls.track, className)}>
            <div className={cls.track__nav}>
                <AudioPlayButton
                    isPlaying={isPlaying}
                    onClick={onPlayPause}
                    className={cls.track__nav__btn}
                />
                <div className={cls.track__nav__details}>
                    <span className={cls.track__nav__details__name}>Recording 1</span>
                    <span className={cls.track__nav__details__type}>Video qo’ng’roq</span>
                </div>
                <div className={cls.track__nav__controls}>
                    <button
                        onClick={handleChangeSpeed}
                        className={cls.track__nav__controls__btn}
                    >
                        <AudioSpeed1X />
                    </button>
                    <button
                        className={cls.track__nav__controls__btn}
                        onClick={() => setAudio(null)}
                    >
                        <CloseIcon />
                    </button>
                </div>
            </div>
            <div ref={trackRef} className={cls.track__bar}></div>
        </div>
    ) : (
        <></>
    )
}

export default AudioTrackBar;