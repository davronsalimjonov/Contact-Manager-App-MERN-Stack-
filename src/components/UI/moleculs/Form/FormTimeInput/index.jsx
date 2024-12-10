import { Controller } from 'react-hook-form';
import Input from '@/components/UI/atoms/Form/Input';
import FormElementWrapper from '../FormElementWrapper';
import cls from './FormTimeInput.module.scss';

const FormTimeInput = ({
    label = '',
    error = '',
    placeholder = '',
    name = '',
    control,
    rules,
    register,
    preffix,
    ...otherProps
}) => {
    return (
        <FormElementWrapper label={label} error={error}>
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field: { ref } }) => (
                    <Input
                        className={cls.time__input}
                        preffix={preffix}
                        placeholder={placeholder}
                        register={register}
                        type="time"
                        ref={ref}
                    />
                )
                } />
        </FormElementWrapper>
    );
}

export default FormTimeInput;