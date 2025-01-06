import { useState } from 'react';
import { usePopper } from 'react-popper';
import { createPortal } from 'react-dom';
import { cn } from '@/utils/lib';
import { STUDENT_STATUS_ENUMS } from '@/constants';
import useClickOutside from '@/hooks/useClickOutside';
import StudentStatus from '../../atoms/StudentStatus';
import cls from './StudentStatusPicker.module.scss';

const PopupContent = ({ 
    styles, 
    attributes, 
    isVisible, 
    isOpenPopup, 
    selectedStatus, 
    handleSelectStatus,
    setPopperEl 
}) => {
    if (!isVisible) return null;

    return createPortal(
        <div
            ref={setPopperEl}
            style={styles.popper}
            {...attributes.popper}
            className={cn(cls.popup, {
                [cls.popup_open]: isOpenPopup
            })}
        >
            <div className={cls.popup__content}>
                {STUDENT_STATUS_ENUMS.map((status, index) => (
                    <div
                        key={index}
                        onClick={() => handleSelectStatus(status)}
                        className={cn(cls.status_item, {
                            [cls.status_item_active]: selectedStatus === status
                        })}
                    >
                        <StudentStatus status={status} />
                    </div>
                ))}
            </div>
        </div>,
        document.body
    );
};

const StudentStatusPicker = ({
    defaultStatus,
    onChange
}) => {
    const [selectedStatus, setSelectedStatus] = useState(defaultStatus || STUDENT_STATUS_ENUMS[0]);
    const [isVisible, setIsVisible] = useState(false);
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const [popperEl, setPopperEl] = useState(null);
    const [referenceEl, setReferenceEl] = useState(null);
    
    const { styles, attributes } = usePopper(referenceEl, popperEl, {
        placement: 'bottom-start',
        modifiers: [
            {
                name: 'offset',
                options: {
                    offset: [0, 8],
                },
            },
            {
                name: 'preventOverflow',
                options: {
                    padding: 8,
                },
            },
        ],
    });

    const handleClosePopup = () => {
        setIsOpenPopup(false);
        setTimeout(() => setIsVisible(false), 300);
    };

    const ref = useClickOutside({ onClickOutside: handleClosePopup });

    const togglePopup = () => {
        if (isOpenPopup) {
            handleClosePopup();
        } else {
            setIsVisible(true);
            setTimeout(() => setIsOpenPopup(true), 0);
        }
    };

    const handleSelectStatus = (status) => {
        setSelectedStatus(status);
        onChange(status)
        handleClosePopup();
    };

    return (
        <div className={cls.wrapper} ref={ref}>
            <div 
                ref={setReferenceEl}
                onClick={togglePopup}
                className={cls.trigger}
            >
                <StudentStatus status={selectedStatus} />
            </div>
            <PopupContent 
                styles={styles}
                attributes={attributes}
                isVisible={isVisible}
                isOpenPopup={isOpenPopup}
                selectedStatus={selectedStatus}
                handleSelectStatus={handleSelectStatus}
                setPopperEl={setPopperEl}
            />
        </div>
    );
};

export default StudentStatusPicker;