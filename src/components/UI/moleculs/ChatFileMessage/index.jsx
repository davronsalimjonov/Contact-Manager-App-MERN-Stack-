import { useState } from 'react';
import { getTimeFromDate } from '@/utils/time';
import ChatFileItem from '../ChatFileItem';
import ChatMessageLayout from '../ChatMessageLayout';
import MediaPreviewer from '../MediaPreviewer';

const ChatFileMessage = ({
    avatar = '',
    time = '',
    fullName = '',
    fileName = '',
    fileSize = 0,
    fileUrl = '',
    isSender = false,
    isViewed = false
}) => {
    const [isOpenModal, setIsOpenModal] = useState(false)

    return (
        <ChatMessageLayout
            fullName={fullName}
            avatar={avatar}
            time={getTimeFromDate(time)}
            isSender={isSender}
            isViewed={isViewed}
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