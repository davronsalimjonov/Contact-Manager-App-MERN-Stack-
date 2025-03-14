import { cn } from '@/utils/lib';
import LabelText from '@/components/UI/atoms/LabelText';
import ErrorLabel from '@/components/UI/atoms/ErrorLabel';
import cls from './FormElementWrapper.module.scss';

const FormElementWrapper = ({
    className = '',
    label = '',
    error = '',
    children
}) => {
    return (
        <label className={cn(cls.label, className)}>
            {label && <LabelText>{label}</LabelText>}
            {children}
            {error && <ErrorLabel>{error}</ErrorLabel>}
        </label>
    );
}

export default FormElementWrapper;