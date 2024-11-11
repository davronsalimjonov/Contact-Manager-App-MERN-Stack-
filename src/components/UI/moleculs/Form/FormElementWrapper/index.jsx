import LabelText from '@/components/UI/atoms/LabelText';
import cls from './FormElementWrapper.module.scss';
import ErrorLabel from '@/components/UI/atoms/ErrorLabel';

const FormElementWrapper = ({
    label = '',
    error = '',
    children
}) => {
    return (
        <label className={cls.label}>
            {label && <LabelText>{label}</LabelText>}
            {children}
            {error && <ErrorLabel>{error}</ErrorLabel>}
        </label>
    );
}

export default FormElementWrapper;