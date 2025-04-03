import { createBrowserRouter } from "react-router-dom"
import MainLayout from "@/components/templates/MainLayout"
import CommentIcon from "@/components/UI/atoms/Icons/comment"
import { HouseIcon, MetricCashIcon, SchoolIcon } from "@/components/UI/atoms/icons"
import PageNotFound from "@/components/pages/PageNotFound"

const links = [
    { id: 1, link: '/', label: 'Dashboard', icon: HouseIcon() },
    { id: 2, link: '/academic', label: 'Akademik', icon: SchoolIcon() },
    { id: 3, link: '/sales', label: 'Sotuv', icon: MetricCashIcon() },
    { id: 4, link: '/feedbacks', label: 'O’quvchi feedbacks', icon: CommentIcon() },
]

const QualityControllerRoutes = () => createBrowserRouter([
    {
        path: '/',
        element: <MainLayout sidebarLinks={links} />,
        children: [
            { path: '*', element: <PageNotFound /> }
        ]
    }
])

export default QualityControllerRoutes;