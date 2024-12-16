import axios from "axios";

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

export const adjustHeight = (e, { minHeight = 50, maxHeight = 200 } = {}) => {
    const textarea = e.target;
    if (!textarea) return;

    textarea.style.height = 'inherit';

    const computed = window.getComputedStyle(textarea);
    const height = textarea.scrollHeight + parseInt(computed.paddingTop) + parseInt(computed.paddingBottom);

    const limitedHeight = Math.max(Math.min(height, maxHeight), minHeight);

    textarea.style.height = `${limitedHeight}px`;

    textarea.style.overflowY = height > maxHeight ? 'auto' : 'hidden';
};

export function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export const getFileFromUrl = (url, fileName) => {
    return axios.get(url, { responseType: 'blob' }).then((res) => {
        return new File([res.data], fileName, { type: res.data?.type })
    })
}

export function formatFileSize(sizeInKilobytes = 0) {
    if(isNaN(sizeInKilobytes) && sizeInKilobytes == null) return '0 KB';
    const units = ["KB", "MB", "GB", "TB", "PB"];
    let index = 0;

    let size = sizeInKilobytes;
    while (size >= 1024 && index < units.length - 1) {
        size /= 1024;
        index++;
    }

    return `${size?.toFixed(2)} ${units[index]}`;
}

export function getProportionalDimensions({
    maxWidth = 0, 
    maxHeight = 0, 
    minWidth = 0, 
    minHeight = 0, 
    originalWidth = 0, 
    originalHeight = 0
} = {}) {
    const widthRatio = maxWidth / originalWidth;
    const heightRatio = maxHeight / originalHeight;
    const scale = Math.min(widthRatio, heightRatio);

    let newWidth = Math.round(originalWidth * scale);
    let newHeight = Math.round(originalHeight * scale);

    // Применяем минимальные размеры после масштабирования
    if (newWidth < minWidth || newHeight < minHeight) {
        const minScale = Math.max(minWidth / originalWidth, minHeight / originalHeight);
        newWidth = Math.round(originalWidth * minScale);
        newHeight = Math.round(originalHeight * minScale);
    }

    // Убедимся, что новые размеры не превышают максимальные ограничения
    if (newWidth > maxWidth || newHeight > maxHeight) {
        const maxScale = Math.min(maxWidth / originalWidth, maxHeight / originalHeight);
        newWidth = Math.round(originalWidth * maxScale);
        newHeight = Math.round(originalHeight * maxScale);
    }

    return { width: newWidth, height: newHeight };
}