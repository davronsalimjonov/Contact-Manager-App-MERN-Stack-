import { usePopper } from 'react-popper';
import { createPortal } from 'react-dom';
import { useRef, useState } from 'react';
import { cn } from '@/utils/lib';
import useClickOutside from '@/hooks/useClickOutside';
import { formatMessageDate, getTimeFromDate } from '@/utils/time';
import LessonTaskDatepicker from '../../organisms/LessonTaskDatepicker';
import { CloseIcon, EditIcon, NotificationIcon } from '../../atoms/icons';
import cls from './TaskItem.module.scss';

const TaskItem = ({
    title = '',
    deadline = '',
    expired = false,
    isCompleted = false,
    onUpdate,
    onStatusChange
}) => {
    const inputRef = useRef()
    const [isEditing, setIsEditing] = useState()
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

    const handleChangeCheckbox = (e) => onStatusChange?.(e.target.checked)

    const handleKeyUp = (e) => {
        const value = e.target.value?.trim()
        if (e.key === 'Enter' && value) setIsOpenDatepicker(true)
    }

    const handleUpdateTask = (date) => {
        const title = inputRef.current.value?.trim()
        onUpdate?.({ date, title })
        setIsEditing(false)
        setIsOpenDatepicker(false)
    }

    return (
        <div className={cn(cls.item, expired && cls.expired, isCompleted && cls.lineThrough)} ref={setReference}>
            <input 
                type="checkbox" 
                checked={isCompleted}
                disabled={isCompleted}
                className={cls.item__checkbox} 
                onChange={handleChangeCheckbox} 
            />
            {isEditing ? (
                <input
                    autoFocus
                    type='text'
                    ref={inputRef}
                    className={cls.item__input}
                    onKeyUp={handleKeyUp}
                    defaultValue={title}
                />
            ) : (
                <h3 className={cls.item__title} title={title}>{title}</h3>
            )}
            <span className={cls.item__deadline}>{formatMessageDate(deadline, { month: 'short' })}, {getTimeFromDate(deadline)}</span>
            <NotificationIcon width={24} height={24} fill={expired ? 'var(--red-color)' : 'var(--dark-gray-700-color)'} />
            {isEditing ? (
                <button className={cls.item__close}  onClick={() => setIsEditing(false)}>
                    <CloseIcon fill='rgba(95, 108, 134, 1)' />
                </button>
            ) : (
                <button disabled={isCompleted} className={cls.item__edit} onClick={() => setIsEditing(true)}>
                    <EditIcon width={18} height={18} />
                </button>
            )}
            {isOpenDatepicker && isEditing && createPortal(
                <div ref={setPopper} style={styles.popper} {...attributes.popper}>
                    <div ref={ref}>
                        <LessonTaskDatepicker
                            defaultValue={deadline}
                            onSave={handleUpdateTask}
                        />
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
}

export default TaskItem;