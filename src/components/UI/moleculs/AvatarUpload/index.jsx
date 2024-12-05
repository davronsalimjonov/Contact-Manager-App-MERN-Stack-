import { useEffect, useState } from 'react';
import { cn, onImageError } from '@/utils/lib';
import { PlusIcon, TrashIcon, UserIcon } from '../../atoms/icons';
import cls from './AvatarUpload.module.scss';

const AvatarUpload = ({
    value,
    className,
    defaultValue,
    onChange,
    onDelete,
    disabled
}) => {
    const [src, setSrc] = useState(defaultValue)

    const handleChange = (e) => {
        const image = e.target.files?.[0]
        setSrc(URL.createObjectURL(image))
        typeof onChange === 'function' && onChange(image)
    }

    const handleDelete = () => {
        setSrc(null)
        typeof onChange === 'function' && onDelete()
    }

    useEffect(() => {
        if(value === undefined && defaultValue !== src) {
            setSrc(value)
        }
    }, [value])

    return (
        <div className={className||cls.wrapper}>
            {(value || src) ? (
                <div className={cls.avatar}>
                    <img src={value || src} alt="avatar" onError={onImageError} />
                    <button
                        disabled={disabled}
                        type='button'
                        className={cn(cls.badge, cls.badge__delete)}
                        onClick={handleDelete}
                    >
                        <TrashIcon />
                    </button>
                </div>
            ) : (
                <label className={cls.upload}>
                    <UserIcon />
                    <input
                        disabled={disabled}
                        type="file"
                        accept='image/png, image/jpeg, image/jpg'
                        onChange={handleChange}
                    />
                    <div className={cn(cls.badge, cls.badge__add)}>
                        <PlusIcon />
                    </div>
                </label>
            )}
        </div>
    )
}

export default AvatarUpload;