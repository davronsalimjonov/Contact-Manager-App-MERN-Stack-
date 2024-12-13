import dayjs from 'dayjs';
import { memo, useState } from 'react';
import PreviewModal from 'react-media-previewer';
import { formatFileSize } from '@/utils/lib';
import { updateHomeWork } from '@/services/chat';
import Rater from '../../atoms/Rater';
import { FileIcon } from '../../atoms/icons';
import LessonTaskModal from '../LessonTaskModal';
import ChatMessageLayout from '../ChatMessageLayout';
import cls from './ChatHomeWorkMessage.module.scss';

const ChatHomeWorkMessage = memo(({
    onTime = false,
    rate = 0,
    workId = '',
    fullName = '',
    time = '',
    fileName = 'File name is not defined',
    fileSize = 0,
    fileUrl = ''
}) => {
    const [visible, setVisible] = useState(false);
    const [isOpenTaskModal, setIsOpenTaskModal] = useState(false);

    const handleChangeRate = (rate) => {
        try {
            updateHomeWork(workId, { rate })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ChatMessageLayout
            fullName={fullName}
            time={dayjs(time).format('HH:mm')}
            timeStyle={{ color: onTime ? 'var(--green-color)' : 'var(--red-color)' }}
            fullNamePreffix={
                <> <button onClick={() => setIsOpenTaskModal(true)} className={cls.work__text}>vazifa</button>ni yubordi</>
            }
        >
            <PreviewModal
                className={cls.modal}
                visible={visible}
                setVisible={setVisible}
                urls={[fileUrl]}
            />
            <LessonTaskModal
                isOpen={isOpenTaskModal}
                onClose={() => setIsOpenTaskModal(false)}
            />
            <div className={cls.work}>
                <div className={cls.work__file} onClick={() => setVisible(true)}>
                    <div className={cls.work__file__icon}>
                        <FileIcon />
                    </div>
                    <h4 className={cls.work__file__name}>{fileName}</h4>
                    <span className={cls.work__file__size}>{formatFileSize(fileSize || 0)}</span>
                </div>
                <div className={cls.work__ball}>
                    <span>Vazifani baholang:</span>
                    <Rater
                        defaultValue={rate}
                        onRate={handleChangeRate}
                    />
                </div>
            </div>
        </ChatMessageLayout>
    );
})

export default ChatHomeWorkMessage;