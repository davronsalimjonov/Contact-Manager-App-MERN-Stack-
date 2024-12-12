import dayjs from 'dayjs';
import ChatMessageLayout from '../ChatMessageLayout';
import CallRecordPlayer from '../CallRecordPlayer';
import cls from './ChatVoiseMessage.module.scss';

const ChatVoiseMessage = ({
    fullName = '',
    time = '',
    audioUrl = ''
}) => {
    return (
        <ChatMessageLayout fullName={fullName} time={dayjs(time).format('HH:mm')}>
            <div style={{position: 'relative', height: '50px', display: 'flex'}}>
                <CallRecordPlayer className={cls.player} url={audioUrl} />
            </div>
        </ChatMessageLayout>
    );  
}

export default ChatVoiseMessage;