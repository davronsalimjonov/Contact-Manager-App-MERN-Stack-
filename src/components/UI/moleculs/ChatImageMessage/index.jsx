import { memo, useState } from 'react';
import { getTimeFromDate } from '@/utils/time';
import { getProportionalDimensions, onImageError } from '@/utils/lib';
import MediaPreviewer from '../MediaPreviewer';
import ChatMessageLayout from '../ChatMessageLayout';
import cls from './ChatImageMessage.module.scss';

const ChatImageMessage = memo(({
    imageUrl,
    width = 300,
    height = 300,
    fullName = '',
    time = ''
}) => {
    const [isOpenModal, setIsOpenModal] = useState(false)
    const { width: imageWidth, height: imageHeight } = getProportionalDimensions({
        minWidth: 300,
        minHeight: 200,
        maxWidth: 450,
        maxHeight: 300,
        originalWidth: width,
        originalHeight: height
    });

    return (
        <ChatMessageLayout fullName={fullName} time={getTimeFromDate(time)}>
            <MediaPreviewer
                visible={isOpenModal}
                setVisible={setIsOpenModal}
                urls={[imageUrl]}
            />
            <img
                src={imageUrl}
                className={cls.image}
                style={{ width: imageWidth, height: imageHeight }}
                onClick={() => setIsOpenModal(true)}
                onError={onImageError}
                alt=""
            />
        </ChatMessageLayout>
    );
})

export default ChatImageMessage;