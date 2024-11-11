import Input from '../../../atoms/Form/Input';
import FormElementWrapper from '../FormElementWrapper';

const FormInput = ({
    type = 'text',
    label = '',
    value,
    onChange,
    readOnly,
    disabled,
    placeholder,
    defaultValue,
    error,
    register = {},
    ...otherProps
}) => {
    return (
        <FormElementWrapper label={label} error={error}>
            <Input
                type={type}
                value={value}
                onChange={onChange}
                readOnly={readOnly}
                disabled={disabled}
                placeholder={placeholder}
                defaultValue={defaultValue}
                register={register}
                error={error}
                {...otherProps}
            />
        </FormElementWrapper>
    );
}

export default FormInput;