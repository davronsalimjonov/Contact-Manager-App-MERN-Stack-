import { queryClient } from "@/services/api";
import toast from "react-hot-toast";
import cls from './UpdateDiscount.module.scss';
import DiscountForm from "../DiscountForm";
import { updateDiscount } from "@/services/course";


const UpdateDiscount = ({
    courseId,
    discountId,
    discount
}) => {

    const handleUpdateDiscount = async (data) => {
        try {
            data.discountStartDate = data?.discountDate[0];
            data.discountEndDate = data?.discountDate[1];
            delete data?.discountDate;
            delete data?.discountId;
            delete data?.course;

            data.discount = data.discount.toString();
            data.discountPrice = data.discountPrice.replace(/\s+/g, '');
            data.price = data.price.replace(/\s+/g, '');
            const updatedDiscount = await updateDiscount(discountId, data);
            queryClient.setQueryData(['course', courseId], oldData => {
                oldData.prices = [...oldData.prices, updatedDiscount];
                return oldData;
            });
            toast.success("Chegirma o'zgartirildi!");

        } catch (error) {
            const errorMessage = error?.response?.data?.message || error?.message || 'Xatolik yuz berdi'
            toast.error(errorMessage)
        }
    }

    return (
        <>
            <DiscountForm
                className={cls.discount}
                classNameElement={cls.discount__element}
                isUpdate={true}
                btnText="Tahrirlash"
                onSubmit={handleUpdateDiscount}
                defaultValues={{
                    discountId: discount?.id,
                    price: discount?.price,
                    month: discount?.month,
                    discount: discount?.discount,
                    discountDate: [discount?.discountStartDate, discount?.discountEndDate],
                    discountPrice: discount?.discountPrice,
                    discountTime: discount?.discountTime,
                    description: discount?.description,
                }}
            />
        </>
    )
}

export default UpdateDiscount;