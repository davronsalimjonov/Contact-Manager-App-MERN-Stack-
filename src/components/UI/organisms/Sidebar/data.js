import { HouseIcon, ListIcon, MenuBookIcon, PersonsIcon, TranslateIcon } from "../../atoms/icons";

export const links = [
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
        link: '/class-shedule',
        label: 'Dars jadvali',
        icon: ListIcon()
    },
    {
        id: 4,
        link: '/workspace',
        label: 'Workspace',
        icon: MenuBookIcon()
    },
    {
        id: 5,
        link: '/settings',
        lable: 'Settings',
    }
]