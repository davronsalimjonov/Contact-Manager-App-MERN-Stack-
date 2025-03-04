import Mapper from "../../atoms/Mapper";
import DiscountForm from "../DiscountForm";
import UpdateDiscount from "../UpdateDiscount";
import cls from './AllDiscounts.module.scss';


const AllDiscounts = (
    {
        discounts,
        courseId
    }
) => {

    return (
        <>
            <Mapper
                data={discounts}
                isInfinityQuery
                renderItem={(discount) => {
                    return (
                        <UpdateDiscount key={discount?.id} discount={discount} discountId={discount?.id} courseId={courseId} />
                    )
                }}
            />
        </>
    )
}

export default AllDiscounts;