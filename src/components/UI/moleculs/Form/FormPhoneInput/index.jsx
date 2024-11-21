import { Controller } from 'react-hook-form';
import FormElementWrapper from '../FormElementWrapper';
import PhoneInput from '@/components/UI/atoms/Form/PhoneInput';

const FormPhoneInput = ({
    label = '',
    error = '',
    name = '',
    value,
    onChange,
    disabled,
    readOnly,
    className,
    placeholder,
    defaultValue,
    control,
    rules = {},
    ...otherProps
}) => {
    return (
        <FormElementWrapper label={label} error={error}>
            {control ? (
                <Controller
                    name={name}
                    rules={rules}
                    control={control}
                    defaultValue={defaultValue}
                    render={({ field: { value, onChange } }) => (
                        <PhoneInput
                            value={value ? value : null}
                            onChange={(newValue) => onChange(newValue || "")}
                            placeholder={placeholder}
                            disabled={disabled}
                            readOnly={readOnly}
                            className={className}
                            error={error}
                            {...otherProps}
                        />
                    )}
                />
            ) : (
                <PhoneInput
                    value={value ? value : undefined}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    readOnly={readOnly}
                    className={className}
                    error={error}
                    {...otherProps}
                />
            )}
        </FormElementWrapper>
    );
}

export default FormPhoneInput;