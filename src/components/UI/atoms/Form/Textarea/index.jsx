import { cn } from '@/utils/lib';
import cls from "./Textarea.module.scss";
import ErrorLabel from '../../ErrorLabel';

const Textarea = ({
    className,
    name = '',
    label = '',
    register = {},
    error,
    value,
    defaultValue,
}) => {
    return (
        <label className={cn(className,cls.label, error && cls.error)}>
            <span>{label}</span>
            <textarea
                className={cls.textarea}
                name={name} 
                value={value}
                defaultValue={defaultValue}
                {...register}
            />
            {error && <ErrorLabel>{error}</ErrorLabel>}
        </label>
    );
}

export default Textarea;