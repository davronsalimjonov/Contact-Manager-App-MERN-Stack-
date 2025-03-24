import UpdatePasswordForm from "@/components/UI/organisms/UpdatePasswordForm"
import cls from "./Settings.module.scss"
import UpdateSettingsForm from "@/components/UI/organisms/UpdateSettingsForm"
import useGetUser from "@/hooks/useGetUser"

const Settings = () => {
    const { data: employee } = useGetUser()

    return (
        <div className={cls.page}>
            <UpdateSettingsForm employee={employee} />
            <UpdatePasswordForm employee={employee} />
        </div>
    )
}

export default Settings