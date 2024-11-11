import DatePicker from "@/components/UI/atoms/Form/DatePicker";
import FormElementWrapper from "../FormElementWrapper";
import cls from './FormDatepicker.module.scss'

const FormDatepicker = ({
    label = '',
    placeholder,
    className = '',
    onChange,
    disabled,
    readOnly,
    ...otherProps
}) => {
    return (
        <FormElementWrapper label={label}>
            <div className={cls.datepicker}>
                <DatePicker 
                    placeholder={placeholder}
                    className={className}
                    disabled={disabled}
                    onChange={onChange}
                    readOnly={readOnly}
                    {...otherProps}
                />
            </div>
        </FormElementWrapper>
    );
}

export default FormDatepicker;