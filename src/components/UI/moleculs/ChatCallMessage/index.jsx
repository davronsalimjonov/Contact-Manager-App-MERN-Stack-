import { useContext } from 'react';
import { convertSecondsToTimeFormat } from '@/utils/lib';
import { WavesurferContext } from '@/providers/WavesurferProvider';
import CallRecordPlayer from '../CallRecordPlayer';
import { PhoneForwardedIcon } from '../../atoms/icons';
import cls from './ChatCallMessage.module.scss';

const ChatCallMessage = ({
    recordUrl = '',
    recordDuration = 0
}) => {
    const { setAudio } = useContext(WavesurferContext)

    return (
        <div className={cls.msg}>
            <div className={cls.msg__icon}>
                <PhoneForwardedIcon />
            </div>
            <div className={cls.msg__body}>
                <div className={cls.msg__body__header}>
                    <span className={cls.msg__body__header__name}>Chiquvchi qo’g’iroq</span>
                    <CallRecordPlayer
                        url={recordUrl}
                        className={cls.msg__body__header__record}
                        onReady={(wavesurfer) => setAudio((state) => ({ ...state, sourseAudio: wavesurfer, url: recordUrl }))}
                    />
                    <span className={cls.msg__body__header__time}>19:01</span>
                </div>
                <span className={cls.msg__body__text}>Qo’ng’iroq <span>{convertSecondsToTimeFormat(recordDuration)} daqiqa</span> davom etdi</span>
            </div>
        </div>
    );
}

export default ChatCallMessage;