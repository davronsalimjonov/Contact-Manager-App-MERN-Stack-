import { useForm } from "react-hook-form";
import FormInput from "../../moleculs/Form/FormInput";
import FormSelect from "../../moleculs/Form/FormSelect";
import { addNewWord } from "@/services/words";
import toast from "react-hot-toast";
import { customToast } from "@/utils/toast";
import cls from './AddNewWordForm.module.scss';
import { DEGREEOPTIONS, UNITS } from "@/constants";
import Button from "../../atoms/Buttons/Button";

const AddNewWordForm = ({
    closeModal
}) => {
    const defaultValues = {
        word: '',
        description: '',
        lvl: null,
        unit: null,
    }

    const { register, control, handleSubmit, reset, watch, formState: { isDirty, errors, isSubmitting, isSubmitSuccessful } } = useForm({
        defaultValues,
        mode: 'onSubmit'
    });

    const add = async (word) => {
        try {
            const { data } = addNewWord(word);
            toast.success("Yangi so'z kiritildi.");
            reset(defaultValues);
            closeModal();

        } catch (error) {
            const res = error?.response?.data
            customToast.error(res?.message || error?.message || 'Xatolik yuz berdi')

        }
    }

    return (
        <form onSubmit={handleSubmit(add)} className={cls.add__word__content}>
            <FormInput
                className={cls.field}
                label='Inglizchasi'
                placeholder='Inglizchasi'
                type="text"
                register={{
                    ...register('word', { required: 'Ingliz tilidagi so\'zni kiriting' })
                }}
                error={errors?.word?.message}
            />

            <FormInput
                className={cls.field}
                label='O’zbekcha'
                placeholder='O’zbekcha'
                register={{ ...register('description', { required: 'Tarjimasini kiriting' }) }}
                error={errors?.description?.message}
            />

            <FormSelect
                key={0}
                className={cls.field}
                control={control}
                name='unit'
                options={UNITS}
                isClearable={true}
                label='Mavzular'
                placeholder='Mavzular'
                rules={

                    {
                        required: { value: true, message: 'Mavzuni tanlang' },
                        validate: (value) => value && value !== null || "Mavzuni tanlang"
                    }

                }
                error={errors?.unit?.message}
            />

            <FormSelect
                className={cls.field}
                name="lvl"
                key={1}
                isClearable={true}
                control={control}
                options={DEGREEOPTIONS}
                placeholder='Darajasi'
                label='Darajasi'
                rules={

                    {
                        required: { value: true, message: 'Til darajasini belgilang' },
                        validate: (value) => value && value !== null || "Til darajasini belgilang"
                    }

                }
                error={errors?.lvl?.message}
            />
            <Button className={cls.add__button} type="submit" disabled={
                !(watch('word') !== '' && watch('description') !== '' && watch('lvl')&&watch('unit'))
            }>Qo'shish</Button>

        </form>
    )
}

export default AddNewWordForm;