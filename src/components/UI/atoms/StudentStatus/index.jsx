import cls from './StudentStatus.module.scss';

const StudentStatus = ({
    status = ''
}) => {
    const getStatusColor = (status) => {
        switch (status) {
            case 'Yangi': return '#00FF85';
            case 'Adaptatsiya': return '#1256DB';
            case "O'qiyapti": return '#27CD02';
            case 'Pauza': return '#FF8960';
            case 'Muammoli': return '#0F172A';
            case 'Vaqti tugadi': return '#475569';
            case 'Bitirdi': return '#00CA14';
            case 'Bekor qilindi': return '#FF0000';
            case 'Mentorsiz': return '#254879';
            case 'Muvaffaqiyatli': return '#00B69B';
            default: return '#0F172A';
        }
    }

    const getStatusBgColor = (status) => {
        switch (status) {
            case 'Yangi': return '#00FF8526';
            case 'Adaptatsiya': return '#D0DDF8';
            case "O'qiyapti": return '#27CD0217';
            case 'Pauza': return '#FF896026';
            case 'Muammoli': return '#74708E26';
            case 'Vaqti tugadi': return '#47556926';
            case 'Bitirdi': return '#00CA1426';
            case 'Bekor qilindi': return '#FF000026';
            case 'Mentorsiz': return '#25487926';
            case 'Muvaffaqiyatli': return '#00B69B26';
            default: return '#74708E26';
        }
    }

    return (
        <span
            className={cls.status}
            style={{
                color: getStatusColor(status),
                backgroundColor: getStatusBgColor(status)
            }}
        >
            {status}
        </span>
    );
}

export default StudentStatus;