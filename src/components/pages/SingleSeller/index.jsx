import SellerInformationForm from "@/components/UI/organisms/SellerInformationForm"
import cls from "./SingleSeller.module.scss"

const SingleSeller = () => {
    return (
        <div className={cls.page}>
            <SellerInformationForm />
        </div>
    )
}

export default SingleSeller