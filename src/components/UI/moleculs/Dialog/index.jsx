import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import { cn } from '@/utils/lib';
import useClickOutside from '@/hooks/useClickOutside';
import cls from './Dialog.module.scss';

const Dialog = ({
    children,
    isOpen,
    onClose
}) => {
    const [isVisible, setIsVisible] = useState(true)
    const ref = useClickOutside({ onClickOutside: onClose, disable: !isOpen })

    useEffect(() => {
        if (!isOpen) {
            setTimeout(() => setIsVisible(false), 300)
        } else {
            setIsVisible(true)
        }
    }, [isOpen])

    return createPortal(isVisible ? (
        <div className={cn(cls.dialog, !isOpen && cls.close)}>
            <div className={cls.dialog__content} ref={ref}>
                {children}
            </div>
        </div>
    ) : <></>, document.getElementById('app'));
}

export default Dialog;