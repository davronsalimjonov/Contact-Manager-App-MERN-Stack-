import toast from "react-hot-toast";
import ToasterModal from "@/components/UI/atoms/ToasterModal";

const baseToastStyles = {
    padding: 0,
    paddingLeft: '16px',
    borderRadius: '4px',
    boxShadow: 'none',
    border: '1px solid',
}

const successToastStyle = {
    ...baseToastStyles,
    background: '#E8FBF3',
    color: '#73E6BA',
    borderColor: '#73E6BA'
}

const errorToastStyle = {
    ...baseToastStyles,
    background: '#FFFAFA',
    color: '#FF0000',
    borderColor: '#FFCCCC'
}


export const customToast = {
    success: (msg, config) => {
        return toast.success(
            (t) => <ToasterModal toastId={t.id} message={msg} />,
            { style: successToastStyle, ...config }
        )
    },
    error: (msg, config) => {
        return toast.error(
            t => <ToasterModal toastId={t.id} message={msg} />,
            { style: errorToastStyle, ...config }
        )
    }
}