import Dialog from "@/components/UI/moleculs/Dialog";
import { queryClient } from "@/services/api";
import toast from "react-hot-toast";
import cls from './AddDiscount.module.scss';
import DiscountForm from "../DiscountForm";
import { addDiscount } from "@/services/course";


const AddDiscount = ({
    isOpen,
    onclose,
    courseId
}) => {

    const handleAddDiscount = async (data) => {
        try {

            data.discountStartDate = data?.discountDate[0];
            data.discountEndDate = data?.discountDate[1];
            delete data?.discountDate;
            data.course = courseId;
            data.discount = data.discount.toString();
            data.discountPrice = data.discountPrice.replace(/\s+/g, '');
            data.price = data.price.replace(/\s+/g, '');
            const addedDiscount = await addDiscount(data);
            queryClient.setQueryData(['course', courseId], oldData => {
                oldData.prices = [...oldData.prices, addedDiscount];
                return oldData;
            });
            toast.success("Yangi Chegirma qo'shildi!");
            onclose();
        } catch (error) {
            const errorMessage = error?.response?.data?.message || error?.message || 'Xatolik yuz berdi'
            toast.error(errorMessage)
        }
    }

    return (
        <Dialog isOpen={isOpen} onClose={onclose}>
            <div className={cls.content}>
                <DiscountForm
                    defaultValues={{
                        price: "",
                        month: "",
                        discount: "",
                        discountDate: "",
                        discountPrice: "",
                        discountTime: "",
                        description: "",
                    }}
                    btnText={"Qo'shish"}
                    onSubmit={(data) => { handleAddDiscount(data) }}
                />
            </div>
        </Dialog>
    )
}

export default AddDiscount;