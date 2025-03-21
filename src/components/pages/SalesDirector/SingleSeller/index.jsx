import { useParams } from "react-router-dom"
import Loader from "@/components/UI/atoms/Loader"
import { EMPLOYEE_ROLES } from "@/constants/enum"
import { useGetEmployeeById } from "@/hooks/useEmployee"
import SellerInformationForm from "@/components/UI/organisms/SellerInformationForm"

const SingleSeller = () => {
    const { sellerId } = useParams()
    const { data: seller, isLoading } = useGetEmployeeById(sellerId, { role: EMPLOYEE_ROLES.SELLER })

    const defaultValues = {
        avatar: seller?.url,
        firstName: seller?.firstName,
        lastName: seller?.lastName,
        phone: seller?.phone,
        birthday: seller?.birthday,
        gender: String(seller?.gender),
        passport: seller?.passport,
        status: seller?.status,
        sip: seller?.sip,
        amocrmId: seller?.amocrmId,
        address: seller?.address
    }

    return !isLoading ? (
        <SellerInformationForm sellerId={sellerId} defaultValues={defaultValues} />
    ) : (
        <Loader />
    )
}

export default SingleSeller