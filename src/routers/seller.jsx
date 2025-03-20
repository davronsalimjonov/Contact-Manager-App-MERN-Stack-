import { createBrowserRouter } from "react-router-dom";
import { MessageTypes } from "@/constants/enum";
import MainLayout from "@/components/templates/MainLayout";
import { HouseIcon, LeaderboardIcon, MenuBookIcon, PersonsIcon } from "@/components/UI/atoms/icons";
import SellersDashboard from "@/components/pages/SellersDashboard";
import SellerStatistics from "@/components/pages/SellerStatistics";
import SellerStudents from "@/components/pages/SellerStudents";
import SingleStudent from "@/components/pages/SingleStudent";
import Chat from "@/components/pages/Chat";
import SellerWorkspace from "@/components/pages/SellerWorkspace";
import Settings from "@/components/pages/Settings";
import PageNotFound from "@/components/pages/PageNotFound";
import SinglePageLayout from "@/components/templates/SinglePageLayout";
import SalesForm from "@/components/pages/SalesForm";
import SellerChecks from "@/components/pages/SellerChecks";
import SingleSeller from "@/components/pages/SingleSeller";

const sellerAllowedMessagesTypes = [MessageTypes.COMMENT]

const links =[
    {
        id: 0,
        link: '/',
        label: 'Home',
        icon: HouseIcon()
    },
    {
        id: 1,
        link: '/dashboard',
        label: 'Dashboard',
        icon: LeaderboardIcon()
    },
    {
        id: 2,
        link: '/students',
        label: 'O’quvchilarim',
        icon: PersonsIcon()
    },
    {
        id: 3,
        link: '/workspace',
        label: 'Workspace',
        icon: MenuBookIcon()
    }
]

const SellerRoutes = () => createBrowserRouter([
    {
        path: '/',
        element: <MainLayout sidebarLinks={links} />,
        children: [
            {
                path: '/',
                element: <SellersDashboard />
            },
            {
                path: '/dashboard',
                element: <SellerStatistics />
            },  
            {
                path: '/students',
                element: <SellerStudents />
            },
            {
                path: '/students/:courseId',
                element: <SingleStudent />
            },
            {
                path: '/students/chat/:userCourseId',
                element: <Chat allowedMessagesTypes={sellerAllowedMessagesTypes} />
            },
            {
                path: '/workspace',
                element: <SellerWorkspace />
            },
            {
                path: '/settings',
                element: <Settings />
            },
            {
                path: '/sellerSingle/:sellerId',
                element: <SingleSeller />
            },
            {
                path: '*',
                element: <PageNotFound />
            }
        ]
    },
    {
        path: '',
        element: <SinglePageLayout />,
        children: [
            {
                path: '/sales-form',
                element: <SalesForm />
            },
            {
                path: '/checks',
                element: <SellerChecks />
            }
        ]
    },
])

export default SellerRoutes;