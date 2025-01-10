import { AutoStoriesIcon, CircleNotificationIcon, HouseIcon, LanIcon, ListIcon, ManageAccountsIcon, MenuBookIcon, MicrophoneIcon, Person, PersonsIcon, SchoolIcon, TranslateIcon } from "@/components/UI/atoms/icons";

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
    }
]

export const managerSidebarLinks = [
    {
        id: 0,
        link: '/',
        label: 'Dashboard',
        icon: HouseIcon()
    },
    {
        id: 1,
        link: '',
        label: 'Mentor',
        icon: SchoolIcon(),
        children: [
            {
                id: '1.1',
                label: 'Asosiy mentor',
                link: 'main-teachers'
            },
            {
                id: '1.2',
                label: 'Nazoratchi mentor',
                link: 'call-teachers'
            },
        ]
    },
    {
        id: 2,
        link: '',
        label: 'Foydalanuvchilar',
        icon: PersonsIcon(),
        children: [
            {
                id: '2.1',
                label: 'Foydalanuvchi',
                link: '/users'
            },
            {
                id: '2.2',
                label: 'Sotuv',
                link: '/sales-users'
            },
            {
                id: '2.3',
                label: 'Student',
                link: '/students'
            },
            {
                id: '2.4',
                label: 'Mentor',
                link: '/mentors'
            }
        ]
    },
    {
        id: 3,
        label: 'Mentor statistikasi',
        link: '/mentor-statistics',
        icon: ManageAccountsIcon()
    },
    {
        id: 4,
        label: 'Servis statistikasi',
        link: '/service-statistics',
        icon: LanIcon(),
    },
    {
        id: 5,
        label: 'Dictionary',
        link: '/dictionary',
        icon: TranslateIcon()
    },
    {
        id: 6,
        label: 'Kurslar',
        link: '/courses',
        icon: AutoStoriesIcon()
    },
    {
        id: 7,
        label: 'Eslatmalar/Xabarnoma',
        link: '/notifications',
        icon: CircleNotificationIcon()
    },
    {
        id: 8,
        label: 'Recording',
        link: '/recordings',
        icon: MicrophoneIcon()
    }
]