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
import { courseSchema } from "@/schemas/student";
import { yupResolver } from "@hookform/resolvers/yup";
import AllDiscounts from "../AllDiscounts";

const CoursesForm = ({
    onOpenDiscount,
    defaultValue,
    btn,
    onSubmit,
    discount,
    courseId
}) => {

    const { register, control, watch, handleSubmit, reset, setValue, formState: { errors, isDirty, isSubmitting } } = useForm({
        mode: 'onSubmit',
        defaultValues: defaultValue,
        resolver: yupResolver(courseSchema)
    })
    return (
        <form className={cls.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={cls.page__form__avatar}>
                <AvatarUpload
                    className={cls.form__image}
                    value={(typeof watch('image') === 'string') ? watch('image') : watch('image') ? URL.createObjectURL(watch('image')) : null}
                    onChange={(image) => setValue('image', image, { shouldDirty: true, shouldValidate: true })}
                    onDelete={() => setValue('image', null, { shouldDirty: true, shouldValidate: true })}
                />
            </div>
            <div className={cls.form__elements}>
                <FormInput
                    className={cls.form__input}
                    label='Kurs nomi'
                    placeholder='Ismi'
                    register={{ ...register('title') }}
                    error={errors?.title?.message}
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
                    isMulti={true}
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
                    {
                        btn === "Qo'shish" ?
                            <></> :
                            <Button className={cls.form__btn} onClick={onOpenDiscount} type="button">Chegirma qo'shish <PlusIcon fill={"#1256DB"} /></Button>
                    }
                </div>
                <Textarea
                    className={cls.form__input}
                    label="Description"
                    register={{ ...register('description') }}
                    error={errors?.description?.message}
                />

                {
                    discount && <AllDiscounts discounts={discount} courseId={courseId} />

                }

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