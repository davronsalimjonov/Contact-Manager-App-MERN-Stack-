import ChatMessageLayout from '../ChatMessageLayout';
import cls from './ChatImageMessage.module.scss';

const ChatImageMessage = ({ imageUrl }) => {

    return (
        <ChatMessageLayout fullName="Obito suyunov" time="12:00">
            <div style={{ display: 'flex', width: '100%', maxWidth: '300px', maxHeight: '300px', position: 'relative', overflow: 'hidden' }}>
                <img
                    src={imageUrl}
                    style={{
                        width: '100%',
                        height: 'auto',
                        display: 'flex',
                        objectFit: 'cover'
                    }}
                    alt=""
                />
            </div>
        </ChatMessageLayout>
    );
}

export default ChatImageMessage;