import { STATUS_COLOR } from "@/constants";

const getStyleByStatus = (status) => {

    const currentStatus = STATUS_COLOR.filter(statusItem => statusItem.status === status);

    return ({
        backgroundColor: currentStatus[0]?.backgroundColor,
        color: currentStatus[0]?.color,
    })
}

export default getStyleByStatus;