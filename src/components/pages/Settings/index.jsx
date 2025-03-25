import useGetUser from "@/hooks/useGetUser"
import UpdatePasswordForm from "@/components/UI/organisms/UpdatePasswordForm"
import UpdateSettingsForm from "@/components/UI/organisms/UpdateSettingsForm"
import cls from "./Settings.module.scss"

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