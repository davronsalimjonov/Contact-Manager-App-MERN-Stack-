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
    preffix,
    suffix,
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
                preffix={preffix}
                suffix={suffix}
                {...otherProps}
            />
        </FormElementWrapper>
    );
}

export default FormInput;