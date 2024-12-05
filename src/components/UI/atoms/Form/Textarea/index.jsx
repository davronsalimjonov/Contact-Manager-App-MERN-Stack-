import { cn } from '@/utils/lib';
import cls from "./Textarea.module.scss";

const Textarea = ({
    name = '',
    label = '',
    value = '',
    register = {},
    error,
    defaultValue,
}) => {
    return (
        <label className={cn(cls.label, error && cls.error)}>
            <span>{label}</span>
            <textarea
            className={cls.textarea}
                name={name}  
                defaultValue={defaultValue}
                {...register}
            />
        </label>
    );
}

export default Textarea;