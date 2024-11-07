import { PersonBlue, PersonGreen, PersonOrange, PersonRed, StatFal, StatGrow } from "../../atoms/icons";

export const cardItems = [
    {
        id: 0,
        header: "O'quvchilar Soni",
        count: "40689",
        percentage: "8.5%",
        icon: PersonGreen(),
        iconBg: "rgba(0, 182, 155, 0.1)",
        stat: StatGrow()
    },
    {
        id: 1,
        header: "Faolligi",
        count: "88%",
        percentage: "1.3%",
        icon: PersonOrange(),
        iconBg: "rgba(254, 197, 61, 0.1)",
        stat: StatGrow()
    },
    {
        id: 2,
        header: "Natijalar",
        count: "2300",
        percentage: "4.3%",
        icon: PersonRed(),
        iconBg: "rgba(255, 0, 0, 0.1)",
        stat: StatFal()
    },
    {
        id: 3,
        header: "Adaptatsiya Faolligi",
        count: "05:24 s",
        percentage: "1.8%",
        icon: PersonBlue(),
        iconBg: "rgba(160, 188, 241, 0.5)",
        stat: StatGrow()
    }
]