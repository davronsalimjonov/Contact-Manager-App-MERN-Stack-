import Dialog from "@/components/UI/moleculs/Dialog";
import CoursesForm from "@/components/UI/organisms/CoursesForm";
import { queryClient } from "@/services/api";

import { objectToFormData } from "@/utils/lib";
import toast from "react-hot-toast";
import cls from './AddDiscount.module.scss';
import DiscountForm from "../DiscountForm";
import { addDiscount } from "@/services/course";
import { useState } from "react";

const AddDiscount = ({
    isOpen,
    onclose,
    courseId
}) => {

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);

    const handleAddDiscount = async (data) => {


        try {
            delete data.discountDate;
            data.discountStartDate = startDate;
            data.discountEndDate = endDate;
            data.course = courseId;
            data.discount = data.discount.toString();
            data.discountPrice = data.discountPrice.toString();
            data.price = data.price.toString();

            // console.log(data);
            // const fd = objectToFormData(data);


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
                    onSubmit={(data) => { handleAddDiscount(data) }}
                    startDate={startDate}
                    endDate={endDate}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                />
            </div>
        </Dialog>
    )
}

export default AddDiscount;