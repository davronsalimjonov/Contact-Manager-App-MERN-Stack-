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
    register = {},
    ...otherProps
}) => {
    return (
        <FormElementWrapper label={label}>
            <Input
                type={type}
                value={value}
                onChange={onChange}
                readOnly={readOnly}
                disabled={disabled}
                placeholder={placeholder}
                defaultValue={defaultValue}
                register={register}
                {...otherProps}
            />
        </FormElementWrapper>
    );
}

export default FormInput;