import * as Yup from 'yup'

export const courseChema = Yup.object().shape({
    title: Yup.string().required('Kurs nomi kiritilsin'),
    description: Yup.string().required(`Kurs haqida ma'lumot kiritilsin`),
    link: Yup.string().required(`Link kiritilsin`),
    paymentLink: Yup.string().required(`Payment link kiritilsin`),
    paymentsLinks: Yup.array().string(),
    image: Yup.string()
})