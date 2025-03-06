import Button from '../../atoms/Buttons/Button';
import ChatMessageLayout from '../ChatMessageLayout';
import cls from './ChatLessonHomeworkMessage.module.scss';

const ChatLessonHomeworkMessage = ({
    avatar,
    fullName
}) => {
    return (
        <ChatMessageLayout
            avatar={avatar}
        >
            <div className={cls.homework}>
                <div>
                    <span className={cls.homework__icon}></span>
                    <span className={cls.homework__name}>Uyga vazifa</span>
                    <span className={cls.homework__title}>12-dars</span>
                </div>
                <div>
                    <Button>Bajarildi</Button>
                </div>
            </div>
        </ChatMessageLayout>
    );
}

export default ChatLessonHomeworkMessage;