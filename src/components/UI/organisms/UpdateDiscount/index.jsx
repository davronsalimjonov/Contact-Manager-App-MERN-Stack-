import { useState } from "react";
import UpdateDiscountForm from "../UpdateDiscountForm";

const UpdateDiscount = ({
    errors,
    register,
    discount,
    control
}) => {
    const [startDate, setStartDate] = useState(discount?.discountStartDate||null);
    const [endDate, setEndDate] = useState(discount?.discountEndDate||null);

    return (

        <UpdateDiscountForm
            defaultValues={{
                price: discount.price,
                month: discount.month,
                discount: discount.discount,
                discountDate: "",
                discountPrice: discount.discountPrice,
                discountTime: discount.discountTime,
                description: discount.description,
            }}
            register={register}
            errors={errors}
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            control={control}
        />
    )
}

export default UpdateDiscount;