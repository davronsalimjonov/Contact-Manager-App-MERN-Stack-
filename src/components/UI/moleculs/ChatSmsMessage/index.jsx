import { getTimeFromDate } from '@/utils/time';
import ChatMessageLayout from '../ChatMessageLayout';
import cls from './ChatSmsMessage.module.scss';

const ChatSmsMessage = ({
    text = '',
    fullName = '',
    avatar = '',
    time = '',
    status = ''
}) => {
    
    const getStatusLabel = (status) => {
        switch (status) {
            case 'waiting': return 'Kutilmoqda';
            case 'STORED': return 'Kutilmoqda';
            case 'ACCEPTED': return 'Kutilmoqda';
            case 'DELIVERED': return 'Yekazildi'
            default: return 'Kutilmoqda';
        }
    }

    return (
        <ChatMessageLayout 
            date={time}
            avatar={avatar} 
            fullName={fullName} 
            time={<span className={cls.sms__status}><span>SMS {getTimeFromDate(time)}</span> <span>{getStatusLabel(status)}</span></span>}
        >
            <div className={cls.sms}>
                <span>{text}</span>
            </div>
        </ChatMessageLayout>
    );
}

export default ChatSmsMessage;