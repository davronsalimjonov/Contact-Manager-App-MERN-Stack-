import RadioButton from '@/components/UI/atoms/Form/RadioButton';
import FormElementWrapper from '../FormElementWrapper';
import cls from './FormRadioGroup.module.scss';

const FormRadioGroup = ({
    name = '',
    label = '',
    options = [],
    register = {},
    onChange,
    disabled,
    error,
}) => {
    return (
        <FormElementWrapper label={label} error={error}>
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
                            onChange={onChange}
                            defaultChecked={option.defaultChecked}
                            error={error}
                        />
                    ))}
                </div>
            )}
        </FormElementWrapper>
    );
}

export default FormRadioGroup;