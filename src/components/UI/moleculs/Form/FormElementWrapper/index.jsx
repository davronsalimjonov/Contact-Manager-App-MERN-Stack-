import LabelText from '@/components/UI/atoms/LabelText';
import ErrorLabel from '@/components/UI/atoms/ErrorLabel';
import cls from './FormElementWrapper.module.scss';

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