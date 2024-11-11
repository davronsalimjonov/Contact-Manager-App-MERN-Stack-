import FormDatepicker from '../../moleculs/Form/FormDatepicker';
import FormInput from '../../moleculs/Form/FormInput';
import FormPhoneInput from '../../moleculs/Form/FormPhoneInput';
import FormRadioGroup from '../../moleculs/Form/FormRadioGroup';
import cls from './StudentInformationForm.module.scss';

const StudentInformationForm = () => {
    return (
        <form className={cls.form}>
            <FormInput
                label='Ismi'
            />
            <FormPhoneInput 
                label='Telefon nomer' 
            />
            <FormDatepicker 
                label='Tug’ilgan sanasi'
            />
            <FormRadioGroup label='Jinsi' />
        </form>
    );
}

export default StudentInformationForm;