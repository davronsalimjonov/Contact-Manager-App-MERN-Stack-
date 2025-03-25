import FormMaskInput from '../FormMaskInput';
import cls from './FormPassportInput.module.scss';

const FormPassportInput = ({ control, error, label, placeholder, name }) => {
    
    const handleChangePassportField = (e) => {
        const upperCaseValue = e.target.value.toUpperCase();    
        e.target.value = upperCaseValue;
    }

    return (
        <FormMaskInput
            label={label}
            placeholder={placeholder}
            mask='aa9999999'
            maskChar="_"
            formatChars={{ '9': '[0-9]', 'a': '[A-Za-z]' }}
            onChange={handleChangePassportField}
            name={name}
            control={control}
            error={error}
        />
    );
}

export default FormPassportInput;