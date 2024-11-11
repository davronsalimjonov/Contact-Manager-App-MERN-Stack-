import RadioButton from '@/components/UI/atoms/RadioButton';
import FormElementWrapper from '../FormElementWrapper';
import cls from './FormRadioGroup.module.scss';

const FormRadioGroup = ({
    label = ''
}) => {
    return (
        <FormElementWrapper label={label}>
            <div className={cls.group}>
                <RadioButton name='gender' />
                <RadioButton name='gender' />
            </div>
        </FormElementWrapper>
    );
}

export default FormRadioGroup;