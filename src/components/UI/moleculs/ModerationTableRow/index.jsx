
import cls from './ModerationTableRow.module.scss';
import { CheckIcon, CloseIcon, StarIcon } from '../../atoms/icons';
import { useForm } from 'react-hook-form';
import FormRadioGroup from '../Form/FormRadioGroup';
import RadioButton from '../../atoms/Form/RadioButton';
import { useEffect } from 'react';


const isActive_OPTIONS = [
    { value: '1', label: 'Active' },
    { value: '0', label: 'Not Active' },
]

const ModerationTableRow = ({
    index,
    fullName,
    phoneNumber,
    comment,  //TODO
    avarageRate,
    isActive
}) => {
    const { register, watch, handleSubmit } = useForm({
        mode: 'onSubmit',
    })


    const selectedOption = watch('isActive', '');

    const onSubmit = (data) => {
        console.log(data);
        // TODO
    }

    useEffect(() => {
        if (selectedOption) {
            handleSubmit(onSubmit)();
        }
    }, [selectedOption, handleSubmit, onSubmit]);



    return (
        <tr className={cls.row}>
            <td>{index}.</td>
            <td className={cls.row__name}>
                <span className={cls.row__fullname}>{fullName}</span>
                <span className={cls.row__phone}>{phoneNumber}</span>
            </td>
            <td>{comment}</td>
            <td className={cls.row__rate__cell}>
                <span className={cls.row__rate}><StarIcon begining={avarageRate * 20} />{avarageRate}</span>
                {isActive === null && <form className={cls.row__form}>
                    <RadioButton
                        className={cls.row__form__label}
                        radioClassName={cls.row__form__radio}
                        register={{ ...register('isActive') }}
                        value={true}
                        preffix={<CheckIcon />}
                    />

                    <RadioButton
                        className={cls.row__form__label}
                        radioClassName={cls.row__form__radio}
                        register={{ ...register('isActive') }}
                        value={false}
                        preffix={<CloseIcon fill='#fff' />}
                    />
                </form>}
            </td>
        </tr>
    )
}

export default ModerationTableRow;