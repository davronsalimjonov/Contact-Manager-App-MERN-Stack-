import { cn } from '@/utils/lib';
import { CloseIcon } from '../../atoms/icons';
import cls from './NotificationToastWrapper.module.scss';

const NotificationToastWrapper = ({
    children,
    onClickClose,
    hide = false
}) => {
    return (
        <div className={cn(cls.wrapper, hide && cls.hide)}>
            {children}
            <button className={cls.wrapper__close} onClick={onClickClose}>
                <CloseIcon width={10} heigh={10} />
            </button>
        </div>
    );
}

export default NotificationToastWrapper;