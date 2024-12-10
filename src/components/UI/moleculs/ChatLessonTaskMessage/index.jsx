import Button from '../../atoms/Buttons/Button';
import { PinBoardUnreaded } from '../../atoms/icons';
import ChatMessageLayout from '../ChatMessageLayout';
import cls from './ChatLessonTaskMessage.module.scss';

const ChatLessonTaskMessage = ({
    fullName = '',
}) => {
    return (
        <ChatMessageLayout fullName={fullName}>
            <div className={cls.message}>
                <div className={cls.message__body}>
                    <div className={cls.message__body__icon}>
                        <PinBoardUnreaded />
                    </div>
                    <div className={cls.message__body__details}>
                        <div className={cls.message__body__details__header}>
                            <h3 className={cls.message__body__details__header__title}>{'Vazifa nomi'}</h3>
                            <span className={cls.message__body__details__header__time}>Du, 19:00 gacha</span>
                            <div className={cls.message__body__details__header__file}></div>
                        </div>
                        <div className={cls.message__body__details__description}>
                            {'Vazifa uchun batafsil tushintirilgan tekst kiritiladi'}
                        </div>
                    </div>
                </div>
                <div className={cls.message__actions}>
                    <Button rounded className={cls.message__actions__sended}>Yetkazildi</Button>
                    <Button rounded className={cls.message__actions__edit}>Tahrirlash</Button>
                </div>
            </div>
        </ChatMessageLayout>
    );
}

export default ChatLessonTaskMessage;