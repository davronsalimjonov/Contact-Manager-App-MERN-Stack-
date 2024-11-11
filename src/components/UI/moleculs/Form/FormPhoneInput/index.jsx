import ReactInputMask from 'react-input-mask';
import Input from '@/components/UI/atoms/Form/Input';
import FormElementWrapper from '../FormElementWrapper';

const FormPhoneInput = ({
    className,
    placeholder,
    label = '',
    error = '',
    ...otherProps
}) => {
    return (
        <FormElementWrapper label={label}>
            <ReactInputMask
                mask='+\9\9\8 (99) 999-99-99'
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
        </FormElementWrapper>
    );
}

export default FormPhoneInput;