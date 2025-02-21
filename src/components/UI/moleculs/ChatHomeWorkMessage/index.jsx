import { memo, useState } from 'react';
import { getTimeFromDate } from '@/utils/time';
import { updateHomeWork } from '@/services/chat';
import Rater from '../../atoms/Rater';
import MediaPreviewer from '../MediaPreviewer';
import LessonTaskModal from '../LessonTaskModal';
import ChatMessageLayout from '../ChatMessageLayout';
import cls from './ChatHomeWorkMessage.module.scss';
import ChatFileItem from '../ChatFileItem';

const ChatHomeWorkMessage = memo(({
    avatar = '',
    onTime = false,
    rate = 0,
    workId = '',
    fullName = '',
    time = '',
    fileName = '',
    fileSize = 0,
    fileUrl = '',
    taskTitle = '',
    taskDescription = '',
    taskDate = ''
}) => {
    const [evaluated, setEvaluated] = useState(rate > 0);
    const [visible, setVisible] = useState(false);
    const [isOpenTaskModal, setIsOpenTaskModal] = useState(false);

    const handleChangeRate = (rate) => {
        try {
            updateHomeWork(workId, { rate })
            setEvaluated(true)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ChatMessageLayout
            avatar={avatar}
            fullName={fullName}
            time={getTimeFromDate(time)}
            timeStyle={{ color: onTime ? 'var(--green-color)' : 'var(--red-color)' }}
            fullNamePreffix={
                <><button onClick={() => setIsOpenTaskModal(true)} className={cls.work__text}>vazifa</button>ni yubordi</>
            }
        >
            <MediaPreviewer
                visible={visible}
                setVisible={setVisible}
                urls={[fileUrl]}
            />
            <LessonTaskModal
                isOpen={isOpenTaskModal}
                onClose={() => setIsOpenTaskModal(false)}
                title={taskTitle}
                description={taskDescription}
                date={taskDate}
            />
            <div className={cls.work}>
                <ChatFileItem 
                    fileName={fileName}
                    fileSize={fileSize}
                    onClick={() => setVisible(true)}
                />
                <div className={cls.work__ball}>
                    <span>Vazifani baholang:</span>
                    <Rater
                        isDisabled={evaluated}
                        defaultValue={rate}
                        onRate={handleChangeRate}
                    />
                </div>
            </div>
        </ChatMessageLayout>
    );
})

export default ChatHomeWorkMessage;