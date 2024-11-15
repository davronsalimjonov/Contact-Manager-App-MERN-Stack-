import { Controller } from 'react-hook-form';
import ReactInputMask from 'react-input-mask';
import Input from '@/components/UI/atoms/Form/Input';
import FormElementWrapper from '../FormElementWrapper';

const FormTimeRangaInput = ({
    label = '',
    error = '',
    placeholder = '',
    name = '',
    control,
    rules,
    ...otherProps
}) => {
    const correctTimePart = (part, max) => {
        if (!part || isNaN(part)) return part;
        const num = Number(part);
        return Math.min(Math.max(num, 0), max).toString().padStart(2, '0');
    };

    const handleChange = (e, onChange) => {
        let newValue = e.target.value;

        const timeParts = newValue.match(/^(\d{0,2}):?(\d{0,2})? - (\d{0,2}):?(\d{0,2})?$/);

        if (timeParts) {
            let [, startHour, startMinute, endHour, endMinute] = timeParts;

            startHour = startHour?.length === 2 ? correctTimePart(startHour, 23) : startHour;
            startMinute = startMinute?.length === 2 ? correctTimePart(startMinute, 59) : startMinute;
            endHour = endHour?.length === 2 ? correctTimePart(endHour, 23) : endHour;
            endMinute = endMinute?.length === 2 ? correctTimePart(endMinute, 59) : endMinute;

            const correctedValue = `${startHour || ''}:${startMinute || ''} - ${endHour || ''}:${endMinute || ''}`;
            e.target.value = (correctedValue);
            onChange(correctedValue)
        } else {
            e.target.value = (newValue); 
            onChange(newValue)
        }
    };


    return (
        <FormElementWrapper label={label} error={error}>
            {control ? (
                <Controller
                    name={name}
                    control={control}
                    rules={rules}
                    render={({ field }) => (
                        <ReactInputMask
                            value={field.value}
                            onBlur={field.onBlur}
                            onChange={(e) => handleChange(e, field.onChange)}
                            mask={'99:99 - 99:99'}
                        >
                            {(inputProps) => (
                                <Input
                                    error={error}
                                    placeholder={placeholder}
                                    {...inputProps}
                                    ref={field.ref}
                                />
                            )}
                        </ReactInputMask>
                    )}
                />
            ) : (
                <ReactInputMask
                    mask={'99:99 - 99:99'}
                >
                    {(inputProps) => (
                        <Input
                            error={error}
                            placeholder={placeholder}
                            {...inputProps}
                            {...otherProps}
                        />
                    )}
                </ReactInputMask>
            )}
        </FormElementWrapper>
    );
}

export default FormTimeRangaInput;