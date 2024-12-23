import { useState } from 'react';
import SmsTemplatePopup from '../SmsTemplatePopup';
import cls from './SmsTemplateButton.module.scss';
import { usePopper } from 'react-popper';
import useClickOutside from '@/hooks/useClickOutside';

const SmsTemplateButton = ({
    onSelect
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [popperEl, setPopperEl] = useState(null);
    const [referenceEl, setReferenceEl] = useState(null);
    const containerRef = useClickOutside({ onClickOutside: () => isOpen && handleClose() });
    const { styles, attributes } = usePopper(referenceEl, popperEl, {
        placement: 'right-end',
        modifiers: [
            {
                name: 'offset',
                options: {
                    offset: [0, 8],
                },
            },
        ],
    });

    const handleToggle = () => {
        if (isOpen) {
            handleClose();
        } else {
            setIsOpen(true);
            setTimeout(() => setIsVisible(true), 50);
        }
    };

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => setIsOpen(false), 300);
    };

    const handleSelect = (template) => {
        onSelect?.(template);
        handleClose();
    };

    return (
        <div ref={containerRef}>
            <button
                type='button'
                ref={setReferenceEl}
                className={cls.btn}
                onClick={handleToggle}
            >
                Shablondan yuborish
            </button>
            {isOpen && (
                <div
                    ref={setPopperEl}
                    style={styles.popper}
                    {...attributes.popper}
                    className={`${cls.popup} ${isVisible ? cls.popup__visible : ''}`}
                >
                    <SmsTemplatePopup
                        onSelectTemplate={handleSelect}
                    />
                </div>
            )}
        </div>
    );
}

export default SmsTemplateButton;