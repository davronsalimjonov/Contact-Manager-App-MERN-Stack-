import { onImageError } from '@/utils/lib';

const getInitials = (name) => {
    if (!name) return '?';

    const parts = name.split(' ');
    if (parts.length === 1) {
        return name.substring(0, 2).toUpperCase();
    }

    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const getBackgroundColor = (name) => {
    if (!name) return '#cccccc';

    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';
    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xFF;
        color += ('00' + value.toString(16)).slice(-2);
    }

    return color;
};

const calculateFontSize = (size) => {
    return Math.max(Math.floor(size * 0.4), 10);
};

const Avatar = ({
    size = 30,
    round = true,
    src = '',
    name = '',
    className = ''
}) => {
    let initials = getInitials(name);
    let color = getBackgroundColor(name);
    let fontSize = calculateFontSize(size);


    const customStyle = {
        display: "flex",
        height: `${size}px`,
        width: `${size}px`,
        borderRadius: round ? "50%" : "0",
        color: "white",
        background: src ? 'transparent' : color,
        fontSize: `${fontSize}px`,
        lineHeight: 1,
        // margin: "auto"
    }

    return src ? (
        <img src={src} alt={name} style={customStyle} className={className} onError={onImageError} />
    ) : (
        <div style={customStyle} className={className}>
            <span style={{ margin: 'auto' }}> {initials} </span>
        </div>
    );
}

export default Avatar;