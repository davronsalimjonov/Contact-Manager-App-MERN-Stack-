import MainLayout from "@/components/templates/MainLayout"
import SellersDashboard from "@/components/pages/SellersDashboard"
import SingleSeller from "@/components/pages/SalesDirector/SingleSeller"
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
            { path: '/sellers/:sellerId', element: <SingleSeller /> }
        ]
    }
])

export default SalesDirectorRoutes
