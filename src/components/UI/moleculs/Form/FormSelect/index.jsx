import { Controller } from 'react-hook-form';
import Select from '@/components/UI/atoms/Form/Select';
import FormElementWrapper from '../FormElementWrapper';

const FormSelect = ({
    name = '',
    label = '',
    error = '',
    options = [],
    placeholder = '',
    isclearable = false,
    isSearchable = false,
    defaultValue,
    control,
    isMulti,
    onChange,
    className,
    register = {},
    rules 
}) => {
    return (
        <FormElementWrapper label={label} error={error}>
            {control ? (
                <Controller
                    name={name}
                    control={control}
                    rules={rules}
                    defaultValue={defaultValue}
                    render={({ field: { value, onChange } }) => (
                        <Select
                            value={isMulti ? options?.filter(option => value?.includes(option?.value)) : options.find(c => c.value === value) || null}
                            onChange={(selected) => onChange(isMulti ? selected?.map(option => option.value) : (selected?.value || null))}
                            options={options}
                            placeholder={placeholder}
                            isSearchable={isSearchable}
                            isclearable={isclearable}
                            isMulti={isMulti}
                            error={error}
                            className={className}
                            register={register}
                        />
                    )}
                />
            ) : (
                <Select
                    options={options}
                    placeholder={placeholder}
                    onChange={onChange}
                    isSearchable={isSearchable}
                    isclearable={isclearable}
                    error={error}
                />
            )}
        </FormElementWrapper>
    
    );
}

export default FormSelect;