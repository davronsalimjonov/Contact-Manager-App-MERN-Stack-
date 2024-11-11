import RadioButton from '@/components/UI/atoms/Form/RadioButton';
import FormElementWrapper from '../FormElementWrapper';
import cls from './FormRadioGroup.module.scss';

const FormRadioGroup = ({
    name = '',
    label = '',
    options = [],
    disabled,
    register = {}
}) => {
    return (
        <FormElementWrapper label={label}>
            {options?.length > 0 && (
                <div className={cls.group}>
                    {options.map(option => (
                        <RadioButton
                            name={name}
                            key={option.value}
                            value={option.value}
                            label={option.label}
                            disabled={disabled}
                            register={register}
                            defaultChecked={option.defaultChecked}
                        />
                    ))}
                </div>
            )}
        </FormElementWrapper>
    );
}

export default FormRadioGroup;