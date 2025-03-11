import cls from './SmsTemplatePopup.module.scss';

const SmsTemplatePopup = ({
    onSelectTemplate
}) => {
    const templates = [
        {
            id: 1,
            text: `Assalomu alaykum, hurmatli o'quvchi

Bugun belgilangan vaqtda sizga qo'ng'iroq qildim, ammo aloqaga chiqa olmadik. Iltimos, aloqaga chiqing va vazifalarni o'z vaqtida topshiring. Sizning natijangiz biz uchun muhim.

Hurmat bilan,
Myteacher
`
        },
        {
            id: 2,
            text: `Assalomu alaykum, hurmatli o'quvchi!

Nazoratchi mentoringiz aloqaga chiqa olmayapti. Iltimos, vazifalaringizni o'z vaqtida topshiring. Agar ushbu holat ketma-ket 3 marta takrorlansa, kuratorlik xizmati bekor qilinadi. Biz bilan shartnoma tuzgansiz iltimos darslarga e'tiborli bo'ling. 

Sizning natijangiz biz uchun juda muhim.

Hurmat bilan,
Myteacher`
        },
        { 
            id: 3, 
            text: `Assalomu alaykum, hurmatli o'quvchi!

Nazoratchi mentoringiz aloqaga chiqa olmayapti. Iltimos, vazifalaringizni o'z vaqtida topshiring. Agar ushbu holat ketma-ket 3 marta takrorlansa, kuratorlik xizmati bekor qilinadi, shartnoma esa bekor qilinmaydi va pulingiz qaytarilmaydi.

Sizning natijangiz biz uchun juda muhim.

Hurmat bilan,
Myteacher`
        },
        { 
            id: 4, 
            text: `Assalomu alaykum, hurmatli o'quvchi!

Nazoratchi mentoringiz siz bilan bog'lana  olmadi. Vazifalaringizni o'z vaqtida topshirmadingiz hamda ushbu holat ketma-ket 3 marotaba takrorlandi. Eslatib o'tamiz, siz bilan tuzilgan shartnomaga muvofiq kuratorlik xizmati bekor qilindi va pulingiz qaytarilmaydi faqat platformadan mustaqil ravishda foydalana olasiz. 

Sizning natijangiz biz uchun juda muhim.

Hurmat bilan,
Myteacher` 
        },
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