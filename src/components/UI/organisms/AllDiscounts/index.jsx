import Mapper from "../../atoms/Mapper";
import DiscountForm from "../DiscountForm";
import UpdateDiscount from "../UpdateDiscount";

const AllDiscounts = (
    {
        discounts,
        courseId
    }
) =>{

    console.log("Discounts:",discounts);
    return (
        <>
               <Mapper
                            data={discounts}
                            isInfinityQuery
                            renderItem={(discount,index) => (
                                <UpdateDiscount key={index} discount={discount} courseId={courseId} />
                            )}/>
        </>
    )
}

export default AllDiscounts;