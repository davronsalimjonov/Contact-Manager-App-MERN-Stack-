import { usePopper } from 'react-popper';
import { useRef, useState } from 'react';
import { getTimeFromDate } from '@/utils/time';
import { useTaskMutations } from '@/hooks/useTask';
import useClickOutside from '@/hooks/useClickOutside';
import { NotificationIcon } from '../../atoms/icons';
import LessonTaskDatepicker from '../LessonTaskDatepicker';
import cls from './TaskForm.module.scss';
import { createPortal } from 'react-dom';

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
    const { createTaskMutation } = useTaskMutations(chatId)

    const handleInputKeyUp = (e) => {        
        const value = e.target.value?.trim()
        if (e.key === 'Enter' && value) setIsOpenDatepicker(true)
    }

    const handleCreateTask = (date) => {
        const taskTitle = inputRef?.current?.value?.trim()
        createTaskMutation.mutate({ chat: chatId, title: taskTitle, date })
        setIsOpenDatepicker(false)
        inputRef.current.value = ''
    }

    return (
        <div className={cls.form} ref={setReference}>
            <input
                ref={inputRef}
                autoFocus
                onKeyUp={handleInputKeyUp}
                className={cls.form__input}
                placeholder='Task nomi'
            />
            <span className={cls.form__date}>{getTimeFromDate(Date.now())}</span>
            <NotificationIcon width={24} height={24} fill='var(--dark-gray-700-color)' />
            {isOpenDatepicker && createPortal(
                <div
                    ref={setPopper}
                    style={styles.popper}
                    {...attributes.popper}
                >
                    <div ref={ref}>
                        <LessonTaskDatepicker onSave={handleCreateTask} />
                    </div>
                </div>, 
                document.body
            )}
        </div>
    );
}

export default TaskForm;