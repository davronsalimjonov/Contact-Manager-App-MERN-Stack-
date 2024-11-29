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

export const getUserFullName = (user) => {
    let { firstName, lastName } = user || {}
    firstName = firstName?.charAt(0).toUpperCase() + firstName?.slice(1)?.toLowerCase();
    lastName = lastName?.charAt(0).toUpperCase() + lastName?.slice(1)?.toLowerCase();
    return `${firstName || ''} ${lastName || ''}`
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

export const adjustHeight = (e, { minHeight = 50, maxHeight = 200 } = {}) => {
    const textarea = e.target;
    if (!textarea) return;

    textarea.style.height = 'inherit';

    const computed = window.getComputedStyle(textarea);
    const height = textarea.scrollHeight
        + parseInt(computed.paddingTop)
        + parseInt(computed.paddingBottom);

    const limitedHeight = Math.max(
        Math.min(height, maxHeight),
        minHeight
    );

    textarea.style.height = `${limitedHeight}px`;

    textarea.style.overflowY = height > maxHeight ? 'auto' : 'hidden';
};