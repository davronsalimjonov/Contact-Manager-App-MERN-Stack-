import { useState } from 'react';
import { usePopper } from 'react-popper';
import { createPortal } from 'react-dom';
import { cn } from '@/utils/lib';
import useClickOutside from '@/hooks/useClickOutside';
import StudentStatus from '../../atoms/StudentStatus';
import cls from './StudentStatusPicker.module.scss';

const statuses = [
    { id: 1, label: 'Adaptatsiya', value: 'adaptation' },
    { id: 2, label: 'Aktiv', value: 'active' },
    { id: 3, label: 'Muzlatilgan', value: 'frozen' },
    { id: 4, label: 'Yakunlangan', value: 'completed' }
];

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
                {statuses.map(status => (
                    <div
                        key={status.id}
                        onClick={() => handleSelectStatus(status)}
                        className={cn(cls.status_item, {
                            [cls.status_item_active]: selectedStatus.id === status.id
                        })}
                    >
                        <StudentStatus status={status.label} />
                    </div>
                ))}
            </div>
        </div>,
        document.body
    );
};

const StudentStatusPicker = () => {
    const [selectedStatus, setSelectedStatus] = useState(statuses[0]);
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
        handleClosePopup();
    };

    return (
        <div className={cls.wrapper} ref={ref}>
            <div 
                ref={setReferenceEl}
                onClick={togglePopup}
                className={cls.trigger}
            >
                <StudentStatus status={selectedStatus.label} />
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