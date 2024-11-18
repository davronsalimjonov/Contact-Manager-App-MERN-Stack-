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

export function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

export function objectToFormData(obj, formData = new FormData()) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            if (value instanceof File) {
                formData.append(key, value);
            } else if (value instanceof FileList) {
                Array.from(value).forEach((file) => {
                    formData.append(key, file);
                });
            } else if (value instanceof Date) {
                formData.append(key, value.toISOString());
            } else if (Array.isArray(value)) {
                value.forEach((item) => {
                    formData.append(key, item);
                });
            } else if (typeof value === 'object' && value !== null) {
                objectToFormData(value, formData);
            } else {
                formData.append(key, value);
            }
        }
    }
    return formData;
}

export const onImageError = (e, url = '/images/not-found.jpg') => {
    e.target.id = url;
    e.target.src = url
}

export function convertSecondsToTimeFormat(seconds = 0) {
    if(isNaN(seconds)) {
        seconds = 0
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
}  