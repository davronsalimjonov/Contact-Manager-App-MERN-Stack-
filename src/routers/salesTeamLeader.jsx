import { createBrowserRouter } from "react-router-dom";
import PageNotFound from "@/components/pages/PageNotFound";
import MainLayout from "@/components/templates/MainLayout";
import { HouseIcon, LeaderboardIcon, PersonsGroupIcon, PersonsIcon } from "@/components/UI/atoms/icons";
import SellersDashboard from "@/components/pages/SellersDashboard";

const links = [
    { id: 0, link: '/', label: 'Home', icon: HouseIcon() },
    { id: 1, link: '/dashboard', label: 'Dashboard', icon: LeaderboardIcon() },
    { id: 2, link: '/students', label: 'O’quvchilarim', icon: PersonsIcon() },
    { id: 3, link: '/employees', label: 'Xodimlar', icon: PersonsGroupIcon() }
]

const SalesTeamLeaderRoutes = () => createBrowserRouter([
    {
        path: '/',
        element: <MainLayout sidebarLinks={links} />,
        children: [
            { path: '', element: <SellersDashboard /> },
            { path: '*', element: <PageNotFound /> }
        ]
    }
])

export default SalesTeamLeaderRoutes