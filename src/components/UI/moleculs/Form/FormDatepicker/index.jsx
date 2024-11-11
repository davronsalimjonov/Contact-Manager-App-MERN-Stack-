import { Controller } from "react-hook-form";
import DatePicker from "@/components/UI/atoms/Form/DatePicker";
import FormElementWrapper from "../FormElementWrapper";
import cls from './FormDatepicker.module.scss'

const FormDatepicker = ({
    name = '',
    label = '',
    className = '',
    defaultValue,
    placeholder,
    onChange,
    disabled,
    readOnly,
    control,
    error,
    ...otherProps
}) => {
    return (
        <FormElementWrapper label={label} error={error}>
            <div className={cls.datepicker}>
                {control ? (
                    <Controller
                        name={name}
                        control={control}
                        defaultValue={defaultValue}
                        render={({ field: { onChange, value } }) => (
                            <DatePicker
                                selected={value ? new Date(value) : null}
                                placeholder={placeholder}
                                className={className}
                                disabled={disabled}
                                onChange={date => onChange(date ? new Date(date).toISOString() : null)}
                                readOnly={readOnly}
                                error={error}
                                {...otherProps}
                            />
                        )}
                    />
                ) : (
                    <DatePicker
                        defaultValue={defaultValue}
                        placeholder={placeholder}
                        className={className}
                        disabled={disabled}
                        onChange={onChange}
                        readOnly={readOnly}
                        error={error}
                        {...otherProps}
                    />
                )}
            </div>
        </FormElementWrapper>
    );
}

export default FormDatepicker;