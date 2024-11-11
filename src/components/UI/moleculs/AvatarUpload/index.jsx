import { useState } from 'react';
import { cn } from '@/utils/lib';
import { PlusIcon, TrashIcon, UserIcon } from '../../atoms/icons';
import cls from './AvatarUpload.module.scss';

const AvatarUpload = ({
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

    return (
        <div className={cls.wrapper}>
            {src ? (
                <div className={cls.avatar}>
                    <img src={src} alt="avatar" />
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