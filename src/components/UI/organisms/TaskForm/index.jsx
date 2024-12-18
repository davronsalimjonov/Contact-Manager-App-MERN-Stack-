import toast from 'react-hot-toast';
import { usePopper } from 'react-popper';
import { useRef, useState } from 'react';
import { createTask } from '@/services/task';
import { getTimeFromDate } from '@/utils/time';
import useClickOutside from '@/hooks/useClickOutside';
import { NotificationIcon } from '../../atoms/icons';
import LessonTaskDatepicker from '../LessonTaskDatepicker';
import cls from './TaskForm.module.scss';

const TaskForm = ({
    chatId = ''
}) => {
    const inputRef = useRef()
    const [popper, setPopper] = useState(null)
    const [reference, setReference] = useState(null)
    const [isOpenDatepicker, setIsOpenDatepicker] = useState(false)
    const ref = useClickOutside({ onClickOutside: () => setIsOpenDatepicker(false) })
    const { styles, attributes } = usePopper(reference, popper, {
        placement: "left",
        modifiers: [
            {
                name: "offset",
                options: {
                    offset: [-29, 8]
                },
            },
        ],
    })

    const handleInputKeyUp = (e) => {
        const value = e.target.value?.trim()
        if (e.key === 'Enter' && value) setIsOpenDatepicker(true)
    }

    const handleCreateTask = (date) => {
        try {
            const taskTitle = inputRef?.current?.value?.trim()
            createTask({ chat: chatId, title: taskTitle, date })
            setIsOpenDatepicker(false)
        } catch (error) {
            const errorMessage = error?.response?.data?.message || error?.message || 'Xatolik yuz berdi'
            toast.error(errorMessage)
        }
    }

    return (
        <div className={cls.form} ref={setReference}>
            <input
                ref={inputRef}
                onKeyUp={handleInputKeyUp}
                className={cls.form__input}
                placeholder='Task nomi'
            />
            <span className={cls.form__date}>{getTimeFromDate(Date.now())}</span>
            <NotificationIcon width={24} height={24} fill='var(--dark-gray-700-color)' />
            {isOpenDatepicker && (
                <div
                    ref={setPopper}
                    style={styles.popper}
                    {...attributes.popper}
                >
                    <div ref={ref}>
                        <LessonTaskDatepicker onSave={handleCreateTask} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default TaskForm;