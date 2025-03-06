import { useNavigate } from 'react-router-dom';
import { cn } from '@/utils/lib';
import { getTimeFromDate } from '@/utils/time';
import Button from '../../atoms/Buttons/Button';
import { DocumentIcon } from '../../atoms/icons';
import ChatMessageLayout from '../ChatMessageLayout';
import cls from './ChatLessonHomeworkMessage.module.scss';

const ChatLessonHomeworkMessage = ({
    avatar,
    fullName,
    taskTitle = '',
    isChecked = false,
    homeWorkId = '',
    time = ''
}) => {
    const navigate = useNavigate()

    return (
        <ChatMessageLayout
            avatar={avatar}
            fullName={fullName}
            time={getTimeFromDate(time)}
        >
            <div className={cls.homework}>
                <div>
                    <span className={cls.homework__icon}><DocumentIcon /></span>
                    <span className={cls.homework__name}>Uyga vazifa</span>
                    <span className={cls.homework__title}>{taskTitle}</span>
                </div>
                <div>
                    <Button 
                        className={cn(isChecked ? cls.homework__checked : cls.homework__check)}
                        onClick={() => navigate(`/homework/${homeWorkId}`)}
                    >
                        {isChecked ? 'Baholangan' : 'Tekshirish'}
                    </Button>
                </div>
            </div>
        </ChatMessageLayout>
    );
}

export default ChatLessonHomeworkMessage;