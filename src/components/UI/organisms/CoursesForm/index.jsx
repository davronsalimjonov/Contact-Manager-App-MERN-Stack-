import { PAYMENT_LINK } from "@/constants";
import Textarea from "../../atoms/Form/Textarea";
import cls from './CoursesForm.module.scss';
import { useForm } from "react-hook-form";
import { PlusIcon } from "../../atoms/icons";
import AvatarUpload from "../../moleculs/AvatarUpload";
import FormInput from "../../moleculs/Form/FormInput";
import FormSelect from "../../moleculs/Form/FormSelect";
import Button from "../../atoms/Buttons/Button";
import RedButton from "../../atoms/Buttons/RedButton";

const CoursesForm = ({
    defaultValue,
    btn,
    onSubmit
}) => {

    const { register, control, watch, handleSubmit, reset,setValue, formState: { errors, isDirty, isSubmitting } } = useForm({
        mode: 'onSubmit',
        defaultValues: defaultValue
    })
    const avatar = watch('image')||"";

    return (
        <form className={cls.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={cls.page__form__avatar}>
                <AvatarUpload
                    className={cls.form__image}
                    value={avatar}
                    onChange={(image) => setValue('image', image, { shouldDirty: true, shouldValidate: true })}
                    onDelete={() => setValue('image', null, { shouldDirty: true, shouldValidate: true })}
                />
            </div>
            <div className={cls.form__elements}>
                <FormInput
                    className={cls.form__input}
                    label='Kurs nomi'
                    placeholder='Ismi'
                    register={{ ...register('courseName') }}
                    error={errors?.courseName?.message}
                />
                <FormSelect
                    className={cls.form__input}
                    name="paymentLinks"
                    key={1}
                    isClearable={true}
                    control={control}
                    options={PAYMENT_LINK}
                    placeholder="To'lov linkini tanlang"
                    label="To'lov linki"
                    multiple={true}
                    error={errors?.paymentLinks?.message}
                />
                <div className={cls.form__link__btn}>
                    <FormInput
                        className={cls.form__input}
                        label='Kurs linki'
                        placeholder='Kurs linkini kiriting'
                        register={{ ...register('link') }}
                        error={errors?.link?.message}
                    />
                    <Button className={cls.form__btn} type="button">Chegirma qo'shish <PlusIcon fill={"#1256DB"} /></Button>
                </div>
                <Textarea
                    className={cls.form__input}
                    label="Description"
                    register={{ ...register('description') }}
                    error={errors?.description?.message}
                />

                <div className={cls.form__buttons}>
                    <Button
                        type='submit'
                        isLoading={isSubmitting}
                    >
                        {
                            btn
                        }
                    </Button>
                    <RedButton
                        disabled={!isDirty}
                        onClick={() => reset()}
                    >
                        Bekor qilish
                    </RedButton>
                </div>
            </div>
        </form>
    )
}


export default CoursesForm;