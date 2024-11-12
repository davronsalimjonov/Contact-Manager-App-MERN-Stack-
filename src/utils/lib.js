import { daysOfWeekFull, daysOfWeekShort } from "@/constants";

export const formatPrice = num => {
    num = String(num).replace(/\s+/g, '').replace(/[^+\d]/g, '')
    return new Intl.NumberFormat('ru-RU').format(num)
}

export function cn(...args) {
    return args
        .flatMap(arg => {
            if (Array.isArray(arg)) {
                return cn(...arg);
            } else if (typeof arg === 'object' && arg !== null) {
                return Object.keys(arg).filter(key => arg[key]);
            }
            return arg;
        })
        .filter(Boolean)
        .join(' ');
}

export const sanitizePhoneNumber = (value) => {
    if (value) return value.replace(/[^\d+]/g, '')
    return null
}

export const getUserFullName = (user) => {
    const { firstName, lastName } = user || {}
    return `${firstName || ''} ${lastName || ''}`
}

export function formatPhoneNumber(phoneNumber) {
    phoneNumber = '' + phoneNumber
    const cleaned = phoneNumber.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})$/);

    if (match) {
        return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}-${match[5]}`;
    }

    return null;
}

export function removeEmptyKeys(obj) {
    return Object.fromEntries(Object.entries(obj).filter(([_, value]) => value !== null && value !== undefined && value !== ''));
}


export function getDayName(dayNumber, format = 'full') {
    if (dayNumber < 0 || dayNumber > 6) {
        return 'Noto‘g‘ri kun raqami';
    }

    return format === 'short' ? daysOfWeekShort[dayNumber] : daysOfWeekFull[dayNumber];
}