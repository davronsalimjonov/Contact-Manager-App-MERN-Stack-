import { Controller } from 'react-hook-form';
import Select from '@/components/UI/atoms/Form/Select';
import FormElementWrapper from '../FormElementWrapper';

const FormSelect = ({
    name = '',
    label = '',
    error = '',
    options = [],
    placeholder = '',
    isClearable = false,
    isSearchable = false,
    defaultValue,
    control,
    isMulti,
    onChange,
    className,
    register = {}
}) => {
    return (
        <FormElementWrapper label={label} error={error}>
            {control ? (
                <Controller
                    name={name}
                    control={control}
                    defaultValue={defaultValue}
                    render={({ field: { value, onChange } }) => (
                        <Select
                            value={isMulti ? options?.filter(option => value?.includes(option?.value)) : options.find(c => c.value === value) || null}
                            onChange={(selected) => onChange(isMulti ? selected?.map(option => option.value) : (selected?.value || null))}
                            options={options}
                            placeholder={placeholder}
                            isSearchable={isSearchable}
                            isClearable={isClearable}
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
                    isClearable={isClearable}
                    error={error}
                />
            )}
        </FormElementWrapper>
    );
}

export default FormSelect;