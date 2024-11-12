
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