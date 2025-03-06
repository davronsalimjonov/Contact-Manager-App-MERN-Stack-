import { memo, useState } from 'react';
import { getTimeFromDate } from '@/utils/time';
import { getProportionalDimensions, onImageError } from '@/utils/lib';
import MediaPreviewer from '../MediaPreviewer';
import ChatMessageLayout from '../ChatMessageLayout';
import cls from './ChatImageMessage.module.scss';

const DEFAULT_IMAGE_WIDTH = 300;
const DEFAULT_IMAGE_HEIGHT = 300;

const ChatImageMessage = memo(({
    imageUrl,
    width = DEFAULT_IMAGE_WIDTH,
    height = DEFAULT_IMAGE_HEIGHT,
    fullName = '',
    avatar = '',
    time = '',
    isSender = false,
    isViewed = false
}) => {
    const [isOpenModal, setIsOpenModal] = useState(false)
    const { width: imageWidth, height: imageHeight } = getProportionalDimensions({
        minWidth: 300,
        minHeight: 200,
        maxWidth: 450,
        maxHeight: 300,
        originalWidth: width || DEFAULT_IMAGE_WIDTH,
        originalHeight: height || DEFAULT_IMAGE_HEIGHT
    });

    return (
        <ChatMessageLayout 
            avatar={avatar}
            fullName={fullName} 
            time={getTimeFromDate(time)}
            isViewed={isViewed}
            isSender={isSender}
            showViewedStatus
        >
            {imageUrl && (
                <MediaPreviewer
                    visible={isOpenModal}
                    setVisible={setIsOpenModal}
                    urls={[imageUrl]}
                />
            )}
            <img
                src={imageUrl}
                className={cls.image}
                style={{ width: imageWidth, height: imageHeight }}
                onClick={() => setIsOpenModal(true)}
                onError={onImageError}
                loading='lazy'
                alt=""
            />
        </ChatMessageLayout> 
    );
})

export default ChatImageMessage;