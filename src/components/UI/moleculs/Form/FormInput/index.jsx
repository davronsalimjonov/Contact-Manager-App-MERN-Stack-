import Input from '../../../atoms/Form/Input';
import FormElementWrapper from '../FormElementWrapper';

const FormInput = ({
    label = '',
    type = 'text',
    placeholder,
    onChange
}) => {
    return (
        <FormElementWrapper label={label}>
            <Input
                type={type}
                placeholder={placeholder}
                onChange={onChange}
            />
        </FormElementWrapper>
    );
}

export default FormInput;