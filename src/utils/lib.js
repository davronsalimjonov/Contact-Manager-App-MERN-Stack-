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
    if (isNaN(sizeInKilobytes) && sizeInKilobytes == null) return '0 KB';
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

export const getFileType = (file) => {
    const parts = file.type.split('/');
    const type = parts[0];
    return type;
}

export const fileToObject = async (file) => {
    if (!file) return
    const fileName = file?.name
    const fileSize = Math.ceil((file?.size || 0) / 1024)
    const fileUrl = URL.createObjectURL(file)
    const fileType = getFileType(file)

    const fileObj = {}

    if (fileType === 'image') {
        const image = new Image()
        image.src = fileUrl

        await new Promise((resolve, reject) => {
            image.onload = () => {
                fileObj.width = image.width
                fileObj.height = image.height
                resolve()
            }
            image.onerror = reject
        })
    }

    return {
        fileName,
        size: fileSize,
        url: fileUrl,
        ...fileObj
    }
}

export function getFileTypeFromUrl(url) {
    const fileExtensionMatch = url.match(/\.([a-zA-Z0-9]+)$/);
    if (!fileExtensionMatch) {
        throw new Error("Не удалось определить расширение файла из URL.");
    }

    const extension = fileExtensionMatch[1].toLowerCase();

    const mimeTypes = {
        // Images
        jpg: "image/jpeg",
        jpeg: "image/jpeg",
        png: "image/png",
        gif: "image/gif",
        bmp: "image/bmp",
        svg: "image/svg+xml",
        webp: "image/webp",
        ico: "image/x-icon",
        tiff: "image/tiff",

        // Videos
        mp4: "video/mp4",
        mov: "video/quicktime",
        avi: "video/x-msvideo",
        mkv: "video/x-matroska",
        flv: "video/x-flv",
        webm: "video/webm",
        wmv: "video/x-ms-wmv",
        mpeg: "video/mpeg",
        '3gp': "video/3gpp",

        // Audio
        mp3: "audio/mpeg",
        wav: "audio/wav",
        ogg: "audio/ogg",
        flac: "audio/flac",
        m4a: "audio/mp4",
        aac: "audio/aac",
        amr: "audio/amr",

        // Documents
        pdf: "application/pdf",
        doc: "application/msword",
        docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        xls: "application/vnd.ms-excel",
        xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        ppt: "application/vnd.ms-powerpoint",
        pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        txt: "text/plain",
        csv: "text/csv",
        rtf: "application/rtf",
        odt: "application/vnd.oasis.opendocument.text",
        ods: "application/vnd.oasis.opendocument.spreadsheet",
        odp: "application/vnd.oasis.opendocument.presentation",

        // Archives
        zip: "application/zip",
        rar: "application/vnd.rar",
        tar: "application/x-tar",
        gz: "application/gzip",

        // Code/Markup files
        html: "text/html",
        css: "text/css",
        js: "application/javascript",
        json: "application/json",
        xml: "application/xml",
        ts: "application/typescript",
        jsx: "application/jsx",
        py: "text/x-python",
        java: "text/x-java-source",
        cpp: "text/x-c++src",
        cs: "text/plain",
        php: "application/x-httpd-php",
        sql: "application/sql",

        // Fonts
        ttf: "font/ttf",
        otf: "font/otf",
        woff: "font/woff",
        woff2: "font/woff2",
    };

    return mimeTypes[extension] || "Неизвестный тип файла";
}

export function getFileCategory(input) {
    let extension;
  
    if (input instanceof Object) {
      const fileName = input.name;
      const fileExtensionMatch = fileName.match(/\.([a-zA-Z0-9]+)$/);
      if (!fileExtensionMatch) return;
      extension = fileExtensionMatch[1].toLowerCase();
    }
    // Если передан URL
    else if (typeof input === "string") {
      const fileExtensionMatch = input.match(/\.([a-zA-Z0-9]+)$/);
      if (!fileExtensionMatch) return;
      extension = fileExtensionMatch[1].toLowerCase();
    } else {
      return "any"; // Неподдерживаемый тип входных данных
    }
  
    const fileCategories = {
      image: ["png", "jpg", "jpeg", "gif", "bmp", "svg", "webp"],
      video: ["mp4", "mkv", "mov", "avi", "wmv", "flv", "webm"],
      audio: ["mp3", "wav", "aac", "ogg", "flac", "m4a"],
      pdf: ["pdf"],
      docs: ["doc", "docx", "xls", "xlsx", "ppt", "pptx", "txt", "csv", "odt", "rtf"],
    };
  
    for (const [category, extensions] of Object.entries(fileCategories)) {
      if (extensions.includes(extension)) {
        return category;
      }
    }
  
    return "any";
  }
  