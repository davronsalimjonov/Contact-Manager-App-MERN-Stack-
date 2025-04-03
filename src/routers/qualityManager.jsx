import { createBrowserRouter } from "react-router-dom";
import Settings from "@/components/pages/Settings";
import MainLayout from "@/components/templates/MainLayout";
import PageNotFound from "@/components/pages/PageNotFound";
import { TripIcon } from "@/components/UI/atoms/Icons/trip";
import CommentIcon from "@/components/UI/atoms/Icons/comment";
import { SchoolIcon, MetricCashIcon, HouseIcon } from "@/components/UI/atoms/icons";
import Employees from "@/components/pages/QualityManager/Employees";

const links = [
    { id: 1, link: '/', label: 'Dashboard', icon: HouseIcon() },
    { id: 2, link: '/academic', label: 'Akademik', icon: SchoolIcon() },
    { id: 3, link: '/sales', label: 'Sotuv', icon: MetricCashIcon() },
    { id: 4, link: '/feedbacks', label: 'O’quvchi feedbacks', icon: CommentIcon() },
    { id: 5, link: '/employees', label: 'Xodimlar', icon: TripIcon() }
]

const QualityManagerRoutes = () => createBrowserRouter([
    {
        path: '/',
        element: <MainLayout sidebarLinks={links} />,
        children: [
            { path: '/employees', element: <Employees /> },
            { path: '/settings', element: <Settings /> },
            { path: '*', element: <PageNotFound /> }
        ]
    }
])

export default QualityManagerRoutes