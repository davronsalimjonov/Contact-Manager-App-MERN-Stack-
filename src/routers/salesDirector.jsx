import { createBrowserRouter } from "react-router-dom"
import MainLayout from "@/components/templates/MainLayout"
import PageNotFound from "@/components/pages/PageNotFound"
import SalesGroups from "@/components/pages/SalesDirector/SalesGroups"
import SellersDashboard from "@/components/pages/SalesDirector/SalesDirectorDashboard"
import SalesDirectorDashboard from "@/components/pages/SalesDirector/SalesDirectorDashboard"
import { HouseIcon, LeaderboardIcon, PersonsIcon } from "@/components/UI/atoms/icons"

const links = [
    { id: 0, link: '/', label: 'Home', icon: HouseIcon() },
    { id: 1, link: '/dashboard', label: 'Dashboard', icon: LeaderboardIcon() },
    { id: 2, link: '/groups', label: 'Guruhlar', icon: PersonsIcon() }
]

const SalesDirectorRoutes = () => createBrowserRouter([
    {
        path: '/',
        element: <MainLayout sidebarLinks={links} />,
        children: [
            { path: '', element: <SellersDashboard /> },
            { path: '/dashboard', element: <SalesDirectorDashboard /> },
            { path: '/groups', element: <SalesGroups /> },
            { path: '*', element: <PageNotFound /> }
        ]
    }
])

export default SalesDirectorRoutes
