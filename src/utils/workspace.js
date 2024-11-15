import { CallIcon } from "@/components/UI/atoms/icons";

export const getStatusColor = (status) => {
    switch (status) {
        case 'not-connected': return '#1256DB';
        case 'call-back': return '#FEC53D';
        case 'not-answered': return '#FF0000';
        case 'connected': return '#1AC33B';
        default: return '#1256DB';
    }
}

export const getStatusLabel = (status) => {
    switch (status) {
        case 'not-connected': return 'Bog’lanish';
        case 'call-back': return 'Qayta qo’ng’iroq';
        case 'not-answered': return 'Bog’lanib bo’lmadi';
        case 'connected': return 'Bog’lanildi';
        default: return 'Bog’lanish';
    }
}

export const getStatusIcon = (status) => {
    switch (status) {
        case 'not-connected': return CallIcon({ fill: getStatusColor(status) });
        case 'call-back': return CallIcon({ fill: getStatusColor(status) });
        case 'not-answered': return CallIcon({ fill: getStatusColor(status), style: { transform: 'rotate(135deg)' } });
        case 'connected': return CallIcon({ fill: getStatusColor(status) });
        default: return CallIcon();
    }
}

export function groupByStatus(data = []) { 
    if(Array.isArray(data)){
        return data?.reduce((acc, item) => {
            if (!acc[item.status]) {
                acc[item.status] = [];
            }
            acc[item.status].push(item);
            return acc;
        }, {});
    } else {
        return {}
    }
}   