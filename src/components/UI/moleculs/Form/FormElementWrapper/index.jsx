import LabelText from '@/components/UI/atoms/LabelText';
import cls from './FormElementWrapper.module.scss';

const FormElementWrapper = ({
    label = '',
    children
}) => {
    return (
        <label className={cls.label}>
            {label && <LabelText>{label}</LabelText>}
            {children}
        </label>
    );
}

export default FormElementWrapper;