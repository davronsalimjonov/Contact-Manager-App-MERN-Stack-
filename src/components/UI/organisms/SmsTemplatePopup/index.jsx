import cls from './SmsTemplatePopup.module.scss';

const SmsTemplatePopup = ({
    onSelectTemplate
}) => {
    const templates = [
        { id: 1, text: "Salom! Sizga eslatma: Darsimiz bugun soat 14:00 da boshlanadi. Iltimos, vaqtida kelishga harakat qiling." },
        { id: 2, text: "Salom! Afsuski, bugungi dars bekor qilindi. Iltimos, keyingi dars jadvalini tekshirib ko'ring." },
        { id: 3, text: "Salom! Sizga eslatma: Ijtimoiy fanlar bo'yicha vazifangizni 25-dekabrga qadar topshirishingiz kerak." },
        { id: 4, text: "Salom! Dars vaqti o'zgardi. Bugun darsimiz soat 16:00 da bo'ladi. Iltimos, o'z vaqtida kelishingizni unutmang." },
        { id: 5, text: "Salom! Sizga dars haqida fikr bildirishni so'raymiz. Sizning fikringiz biz uchun muhim!" },
        { id: 6, text: "Salom! Agar sizda biron bir savol bo'lsa, iltimos, menga yozing. Men yordam berishga tayyorman!" },
    ];
    return (
        <div className={cls.wrapper}>
            <div className={cls.popup}>
                {templates?.length > 0 && templates?.map((template) => (
                    <button
                        key={template.id}
                        type='button'
                        onClick={() => onSelectTemplate(template.text)}
                        title={template.text}
                    >
                        {template.text}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default SmsTemplatePopup;