
import { queryClient } from "@/services/api";
import toast from "react-hot-toast";
import DiscountForm from "../DiscountForm";
import { addDiscount } from "@/services/course";
import { useState } from "react";
import cls from './UpdateDiscount.module.scss';

const UpdateDiscount = ({
    discount,
    courseId
}) => {


    const [startDate, setStartDate] = useState(discount?.discountStartDate||null);
    const [endDate, setEndDate] = useState(discount?.discountEndDate||null);

    const handleUpdateDiscount = async (data) => {
        try {
            delete data.discountDate;
            data.discountStartDate = startDate;
            data.discountEndDate = endDate;
            data.course = courseId;
            data.discount = data.discount.toString();
            data.discountPrice = data.discountPrice.toString();
            data.price = data.price.toString();
            const addedDiscount = await addDiscount(data)
            queryClient.setQueryData(['discount'], addedDiscount);
            toast.success("Yangi Chegirma qo'shildi!");
            onclose();
        } catch (error) {
            const errorMessage = error?.response?.data?.message || error?.message || 'Xatolik yuz berdi'
            toast.error(errorMessage)
        }
    }

    return (

        <DiscountForm
            className={cls.form}
            defaultValues={{
                price: discount.price,
                month: discount.month,
                discount: discount.discount,
                discountDate: "",
                discountPrice: discount.discountPrice,
                discountTime: discount.discountTime,
                description: discount.description,
            }}
            onSubmit={(data) => { handleUpdateDiscount(data) }}
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            btnShow={false}
        />
    )
}

export default UpdateDiscount;