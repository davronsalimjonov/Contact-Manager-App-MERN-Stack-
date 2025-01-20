import TextArea from '@/components/UI/atoms/Form/TextArea';
import FormElementWrapper from '../FormElementWrapper';

const FormTextArea = ({
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
            <TextArea
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

export default FormTextArea;