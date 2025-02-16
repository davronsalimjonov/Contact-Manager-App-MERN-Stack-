import { useParams } from 'react-router-dom'
import MainMentorDashboard from '../MainMentorDashboard';

const MainMentorStatistic = () => {
    const { mentorId } = useParams();

    return (
        <MainMentorDashboard userId={mentorId} withUserInfo />
    )
}

export default MainMentorStatistic