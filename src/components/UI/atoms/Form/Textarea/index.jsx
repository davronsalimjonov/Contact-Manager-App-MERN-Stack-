import { cn } from '@/utils/lib';
import cls from "./Textarea.module.scss";
import ErrorLabel from '../../ErrorLabel';

const Textarea = ({
    name = '',
    label = '',
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
            {error && <ErrorLabel>{error}</ErrorLabel>}
        </label>
    );
}

export default Textarea;