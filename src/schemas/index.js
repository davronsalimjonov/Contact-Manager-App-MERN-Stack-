import * as Yup from 'yup';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { GENDER_OPTIONS } from '@/constants/form';

export const phoneNumberSchema = Yup.string().test('valid-phone', "Telefon raqamni to'liq kiriting", (value) => value ? isValidPhoneNumber(value) : true)
export const genderSchema = Yup.string().oneOf(GENDER_OPTIONS.map(option => option.value), 'Jinsini tanlang').required('Jinsini tanlash majburiy')
export const birthdaySchema = Yup.date().required("Tug'ilgan sanani tanlang").test('min-age', 'Yosh 7 dan katta bo‘lishi kerak',
    function (value) {
        if (!value) return true; 
        const today = new Date();
        const minDate = new Date(today.getFullYear() - 7, today.getMonth(), today.getDate());
        return value <= minDate;
    }
)