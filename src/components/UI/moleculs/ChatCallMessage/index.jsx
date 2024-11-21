import { convertSecondsToTimeFormat } from '@/utils/lib';
import CallRecordPlayer from '../../atoms/CallRecordPlayer';
import { PhoneForwardedIcon } from '../../atoms/icons';
import cls from './ChatCallMessage.module.scss';

const ChatCallMessage = ({
    recordUrl = '',
    recordDuration = 0
}) => {
    return (
        <div className={cls.msg}>
            <div className={cls.msg__icon}>
                <PhoneForwardedIcon />
            </div>
            <div className={cls.msg__body}>
                <div className={cls.msg__body__header}>
                    <span className={cls.msg__body__header__name}>Chiquvchi qo’g’iroq</span>
                    <CallRecordPlayer 
                        className={cls.msg__body__header__record} 
                        url={recordUrl}
                    />
                    <span className={cls.msg__body__header__time}>19:01</span>
                </div>
                <span className={cls.msg__body__text}>Qo’ng’iroq <span>{convertSecondsToTimeFormat(recordDuration)} daqiqa</span> davom etdi</span>
            </div>
        </div>
    );
}

export default ChatCallMessage;