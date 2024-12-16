import Mapper from "../../atoms/Mapper";
import DiscountForm from "../DiscountForm";
import UpdateDiscount from "../UpdateDiscount";

const AllDiscounts = (
    {
        errors,
        register,
        discounts,
        courseId,
        control,
    }
) => {

    console.log("Discounts:", discounts);
    return (
        <>
            <Mapper
                data={discounts}
                isInfinityQuery
                renderItem={(discount, index) => (
                    <UpdateDiscount key={index} errors={errors} register={register} discount={discount} courseId={courseId} control={control} />
                )} />
        </>
    )
}

export default AllDiscounts;