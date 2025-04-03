import { createBrowserRouter } from "react-router-dom"
import Settings from "@/components/pages/Settings"
import MainLayout from "@/components/templates/MainLayout"
import CommentIcon from "@/components/UI/atoms/Icons/comment"
import PageNotFound from "@/components/pages/PageNotFound"
import { HouseIcon, MetricCashIcon, SchoolIcon } from "@/components/UI/atoms/icons"

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
            { path: '/settings', element: <Settings /> },
            { path: '*', element: <PageNotFound /> }
        ]
    }
])

export default QualityControllerRoutes;