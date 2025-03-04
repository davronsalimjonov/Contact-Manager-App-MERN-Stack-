import { useParams } from 'react-router-dom'
import CallMentorDashboard from '../CallMentorDashboard';

const CallMentorStatistic = () => {
    const { mentorId } = useParams();

    return (
        <CallMentorDashboard userId={mentorId} withUserInfo />
    )
}

export default CallMentorStatistic; 