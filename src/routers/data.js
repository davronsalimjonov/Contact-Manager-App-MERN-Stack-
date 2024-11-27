import { HouseIcon, ListIcon, MenuBookIcon, PersonsIcon, TranslateIcon } from "@/components/UI/atoms/icons";

export const callMentorSidebarLinks = [
    {
        id: 0,
        link: '/',
        label: 'Dashboard',
        icon: HouseIcon()
    },
    {
        id: 1,
        link: '/students',
        label: 'O’quvchilarim',
        icon: PersonsIcon()
    },
    {
        id: 2,
        link: '/dictionary',
        label: 'Lug’at',
        icon: TranslateIcon()
    },
    {
        id: 4,
        link: '/workspace',
        label: 'Workspace',
        icon: MenuBookIcon()
    },
]

export const mainMentorSidebarLinks = [
    {
        id: 0,
        link: '/',
        label: 'Dashboard',
        icon: HouseIcon()
    },
    {
        id: 1,
        link: '/students',
        label: 'O’quvchilarim',
        icon: PersonsIcon()
    },
    {
        id: 2,
        link: '/dictionary',
        label: 'Lug’at',
        icon: TranslateIcon()
    },
    {
        id: 3,
        link: '/lessons-schedule',
        label: 'Dars jadvali',
        icon: ListIcon()    
    },
    {
        id: 4,
        link: '/workspace',
        label: 'Workspace',
        icon: MenuBookIcon()
    },
]