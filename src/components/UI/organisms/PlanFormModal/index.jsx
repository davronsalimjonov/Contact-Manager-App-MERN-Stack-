import { useForm } from 'react-hook-form';
import { extractPrice } from '@/utils/lib';
import Dialog from '../../moleculs/Dialog';
import Button from '../../atoms/Buttons/Button';
import FormInput from '../../moleculs/Form/FormInput';
import cls from './PlanFormModal.module.scss';
import { useEffect } from 'react';

const PlanFormModal = ({ isOpen = false, onClose, onSubmit, title = 'Plan kiriting' }) => {
    const { register, handleSubmit, reset, formState: { isDirty, isSubmitting, errors, isSubmitSuccessful } } = useForm()

    const formatToCurrency = (inputValue) => {
        const numericValue = inputValue.replace(/\D/g, "");
        const formattedValue = new Intl.NumberFormat("ru-RU").format(numericValue);
        return `${formattedValue} so'm`;
    };

    const handleChange = (e) => {
        const input = e.target;
        const rawValue = input.value;
        const cursorPosition = input.selectionStart;

        const formattedValue = formatToCurrency(rawValue);

        e.target.value = (formattedValue);

        const newCursorPosition = cursorPosition + 1 < formattedValue.length - 5 ? cursorPosition : formattedValue.length - 5;

        setTimeout(() => {
            input.setSelectionRange(newCursorPosition, newCursorPosition);
        });
    };

    const handleSubmitForm = async (data) => {
        data.plan = extractPrice(data.plan)
        await onSubmit?.(data)
    }

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset()
        }
    }, [isSubmitSuccessful])

    return (
        <Dialog isOpen={isOpen} onClose={onClose}>
            <form className={cls.form} onSubmit={handleSubmit(handleSubmitForm)}>
                <h2>{title}</h2>
                <FormInput
                    label='Plan kiriting'
                    placeholder='Plan kiriting'
                    onChange={handleChange}
                    register={register('plan', {
                        validate: (value) => extractPrice(value) >= 20_000_000 || "Minimal plan 20 000 000 so'm",
                        onChange: handleChange
                    })}
                    error={errors?.plan?.message}
                />
                <Button
                    type='submit'
                    disabled={!isDirty}
                    isLoading={isSubmitting}
                >
                    Kiritish
                </Button>
            </form>
        </Dialog>
    );
}

export default PlanFormModal;