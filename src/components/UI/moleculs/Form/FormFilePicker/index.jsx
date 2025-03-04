import FilePicker from '@/components/UI/atoms/Form/FilePicker';
import FormElementWrapper from '../FormElementWrapper';

const FormFilePicker = ({
    label = '',
    error = '',
    placeholder = '',
    accept = '',
    onChange = '',
    defaultFile = null
}) => {
    return (
        <FormElementWrapper label={label} error={error}>
            <FilePicker 
                accept={accept}
                onChange={onChange}
                defaultFile={defaultFile}
                placeholder={placeholder}
                error={error}
            />
        </FormElementWrapper>
    );
}

export default FormFilePicker;