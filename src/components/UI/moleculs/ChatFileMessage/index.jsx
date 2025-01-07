import { useState } from 'react';
import { getTimeFromDate } from '@/utils/time';
import ChatFileItem from '../ChatFileItem';
import ChatMessageLayout from '../ChatMessageLayout';
import cls from './ChatFileMessage.module.scss';
import MediaPreviewer from '../MediaPreviewer';

const ChatFileMessage = ({
    avatar = '',
    time = '',
    fullName = '',
    fileName = '',
    fileSize = 0,
    fileUrl = ''
}) => {
    const [isOpenModal, setIsOpenModal] = useState(false)

    return (
        <ChatMessageLayout
            fullName={fullName}
            avatar={avatar}
            time={getTimeFromDate(time)}
        >
            <MediaPreviewer
                visible={isOpenModal}
                setVisible={setIsOpenModal}
                urls={[fileUrl]}
            />
            <ChatFileItem
                fileName={fileName}
                fileSize={fileSize}
                onClick={() => setIsOpenModal(true)}
            />
        </ChatMessageLayout>
    );
}

export default ChatFileMessage;