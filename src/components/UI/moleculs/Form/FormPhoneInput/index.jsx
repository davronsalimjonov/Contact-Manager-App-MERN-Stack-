import { Controller } from 'react-hook-form';
import ReactInputMask from 'react-input-mask';
import Input from '@/components/UI/atoms/Form/Input';
import FormElementWrapper from '../FormElementWrapper';

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
                    render={({ field }) => (
                        <ReactInputMask
                            mask='+\9\9\8 (99) 999-99-99'
                            onFocus={(readOnly || disabled) ? (e) => e.target.blur() : undefined}
                            value={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                        >
                            {inputProps => (
                                <Input
                                    ref={field.ref}
                                    className={className}
                                    placeholder={placeholder}
                                    label={label}
                                    error={error}
                                    {...otherProps}
                                    {...inputProps}
                                />
                            )}
                        </ReactInputMask>
                    )}
                />
            ) : (
                <ReactInputMask
                    mask='+\9\9\8 (99) 999-99-99'
                    onChange={onChange}
                    defaultValue={defaultValue}
                    onFocus={(readOnly || disabled) ? (e) => e.target.blur() : undefined}
                >
                    {inputProps => (
                        <Input
                            className={className}
                            placeholder={placeholder}
                            label={label}
                            error={error}
                            {...otherProps}
                            {...inputProps}
                        />
                    )}
                </ReactInputMask>
            )}
        </FormElementWrapper>
    );
}

export default FormPhoneInput;