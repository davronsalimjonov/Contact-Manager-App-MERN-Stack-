import { Controller } from 'react-hook-form';
import FormElementWrapper from '../FormElementWrapper';
import MaskInput from '@/components/UI/atoms/Form/MaskInput';

const FormMaskInput = ({
    label = '',
    error = '',
    className = '',
    placeholder = '',
    onChange,
    mask = '',
    formatChars,
    maskChar = '_',
    control,
    rules = {},
    name = '',
    ...otherProps
}) => {
    return (
        <FormElementWrapper label={label} error={error} className={className}>
            {control ? (
                <Controller
                    control={control}
                    name={name}
                    rules={rules}
                    render={({ field }) => (
                        <MaskInput 
                            mask={mask} 
                            error={error}
                            maskChar={maskChar} 
                            placeholder={placeholder}
                            formatChars={formatChars}
                            {...otherProps}
                            onChange={e => (onChange?.(e), field.onChange(e))}
                            name={field.name}
                            value={field.value || ''}
                            onBlur={field.onBlur}
                            ref={field.ref}
                        />
                    )}
                />
            ) : (
                <MaskInput 
                    mask={mask} 
                    onChange={onChange}
                    placeholder={placeholder}
                    formatChars={formatChars}
                    maskChar={maskChar} 
                    error={error}
                    {...otherProps} 
                />
            )}
        </FormElementWrapper>
    );
}

export default FormMaskInput;