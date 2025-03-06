import { getTimeFromDate } from '@/utils/time';
import CallRecordPlayer from '../CallRecordPlayer';
import ChatMessageLayout from '../ChatMessageLayout';
import cls from './ChatVoiseMessage.module.scss';

const ChatVoiseMessage = ({
    time = '',
    avatar = '',
    fullName = '',
    audioUrl = '',
    isSender = false,
    isViewed = false,
}) => {
    return (
        <ChatMessageLayout 
            avatar={avatar}
            fullName={fullName} 
            time={getTimeFromDate(time)}
            isSender={isSender}
            isViewed={isViewed}
        >
            <div style={{ height: '50px', display: 'flex', alignItems: 'center', whiteSpace: 'normal !important' }}>
                <CallRecordPlayer className={cls.player} url={audioUrl} />
            </div>
        </ChatMessageLayout>
    );
}

export default ChatVoiseMessage;