import { deleteWord, updateWord } from "@/services/words";
import { useForm } from "react-hook-form";
import FormInput from "../../moleculs/Form/FormInput";
import FormSelect from "../../moleculs/Form/FormSelect";
import { DEGREEOPTIONS, UNITS } from "@/constants";
import cls from './UpdateWordForm.module.scss';
import Button from "../../atoms/Buttons/Button";
import { customToast } from "@/utils/toast";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";

const UpdateWordForm = ({ word, wordId, closeModal}) => {
    const queryClient = useQueryClient();
    const defaultValues = {
        word: word?.word,
        description: word?.description,
        lvl: word?.lvl,
        unit: word?.unit
    };

    const handleUpdateWord = async (data) => {
        try {
            if (typeof data.lvl === 'object') data.lvl = data.lvl.value;
            if (typeof data.unit === 'object') data.unit = data.unit.value;
            data.unit = Number(data.unit);
            const updatedWord = await updateWord(wordId, data);
            queryClient.setQueryData(['word'], updatedWord);
            toast.success("So\'z o'zgartirildi");
            queryClient.setQueriesData(['dictionary'], oldData => {
                return {
                    ...oldData,
                    items: oldData?.items?.map(word => {
                        if (word.id === wordId) {
                            word = { ...word, ...data }
                        }
                        return word
                    })
                }
            });
            queryClient.invalidateQueries(['word', wordId])
            closeModal();
        } catch (error) {
            const res = error?.response?.data
            customToast.error(res?.message || error?.message || 'Xatolik yuz berdi')

        }
    }


    const handleDeleteWord = async (e) => {
        e.preventDefault();

        try {
            const deletedWord = await deleteWord(wordId)
            toast.success("So\'z o'chirildi");

            queryClient.setQueriesData(['dictionary'], oldData => {
                return {
                    ...oldData,
                    items: oldData?.items?.filter(word => {
                        if (word.id !== wordId) return word
                    })
                }
            });
            closeModal();

        } catch (error) {
            const res = error?.response?.data
            customToast.error(res?.message || error?.message || 'Xatolik yuz berdi')

        }
    }


    const { register, control, handleSubmit, formState: { errors } } = useForm({
        defaultValues,
        mode: 'onSubmit'
    });

    return (
        <>
            <form onSubmit={handleSubmit(handleUpdateWord)} className={cls.update__form}>
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
                    error={errors?.word?.message}
                />

                <FormSelect
                    className={cls.field}
                    control={control}
                    name='unit'
                    rules={{ require: 'Mavzuni tanlang' }}
                    options={UNITS}
                    label='Mavzular'
                    placeholder='Mavzular'
                    error={errors?.word?.message}
                />

                <FormSelect
                    className={cls.field}
                    name="lvl"
                    control={control}
                    rules={{ require: 'So\'z darajasini tanlang' }}
                    options={DEGREEOPTIONS}
                    placeholder='Darajasi'
                    label='Darajasi'
                    error={errors?.word?.message}
                />
                <div className={cls.dictionary__buttons}>
                    <Button className={cls.add__button} type="submit" >O'zgartirish</Button>
                    <Button onClick={handleDeleteWord} type="button">O'chirish</Button>
                </div>
            </form>
        </>
    )
}

export default UpdateWordForm;