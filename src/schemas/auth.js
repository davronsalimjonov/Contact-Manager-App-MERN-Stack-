import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
    password: Yup.string().required('Parol majburiy'),
    phone: Yup.string().matches(/^\+998 \(\d{2}\) \d{3}-\d{2}-\d{2}$/, "Telefon raqamni to'liq kiriting"),
    email: Yup.string().email("Noto'g'ri email")
})