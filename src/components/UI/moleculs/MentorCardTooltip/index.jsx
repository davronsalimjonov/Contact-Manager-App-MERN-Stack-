import { useEffect, useRef, useState } from 'react';
import { cn, formatPrice } from '@/utils/lib';
import { MENTOR_CARDS_ENUM } from '@/constants/enum';
import cls from './MentorCardTooltip.module.scss';

const Polygon = () => {
    return (
        <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.2456 9.25L8 0.800752L14.7544 9.25H1.2456Z" fill="white" stroke="#FFF2F2" />
        </svg>
    )
}

const getTooltipIcon = (type) => {
    switch (type) {
        case MENTOR_CARDS_ENUM.FINE: return <img src="/images/fine-icon.svg" alt="fine icon" />;
        case MENTOR_CARDS_ENUM.WARNING: return <img src="/images/warning-icon.svg" alt="warning icon" />;
        case MENTOR_CARDS_ENUM.BONUS: return <img src="/images/bonus-icon.svg" alt="bonus icon" />;
        default: return <></>;
    }
}

const getTooltipColor = (type) => {
    switch (type) {
        case MENTOR_CARDS_ENUM.FINE: return 'rgba(255, 248, 248, 1)';
        case MENTOR_CARDS_ENUM.WARNING: return 'rgba(255, 252, 239, 1)';
        case MENTOR_CARDS_ENUM.BONUS: return 'rgba(243, 255, 240, 1)';
        default: return 'white';
    }
}

const getTooltipText = (type) => {
    switch (type) {
        case MENTOR_CARDS_ENUM.FINE: return 'Jarima';
        case MENTOR_CARDS_ENUM.WARNING: return 'Ogohlantirish';
        case MENTOR_CARDS_ENUM.BONUS: return 'Bonus';
        default: return '';
    }
}

const MentorCardTooltip = ({
    children,
    type = '',
    amount = 0,
    description = ''
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);
    const timeoutRef = useRef(null);

    useEffect(() => {
        if (isVisible) {
            setShouldRender(true);
        } else {
            timeoutRef.current = setTimeout(() => {
                setShouldRender(false);
            }, 300);
        }

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [isVisible]);


    return (
        <div
            className={cls['tooltip-wrapper']}
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}

            {shouldRender && (
                <div className={cn(cls.tooltip, isVisible && cls.visible)}>
                    <Polygon />
                    <div className={cls.tooltip__content}>
                        <div className={cls.tooltip__content__type}>
                            {getTooltipIcon(type)}
                            <span className={cls.tooltip__content__type__text}>{getTooltipText(type)}</span>
                        </div>
                        <div className={cls.tooltip__content__description} style={{ backgroundColor: getTooltipColor(type) }}>
                            {type !== MENTOR_CARDS_ENUM.WARNING && (
                                <div className={cls.tooltip__content__description__sum}>
                                    <span className={cls.tooltip__content__description__sum__text}>Summa</span>
                                    <span className={cls.tooltip__content__description__sum__value}>{formatPrice(amount || 0)} UZS</span>
                                </div>
                            )}
                            <p className={cls.tooltip__content__description__text}>{description}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MentorCardTooltip;