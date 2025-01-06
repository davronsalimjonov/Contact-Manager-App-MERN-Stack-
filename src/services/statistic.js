import { api, paramsToString } from "./api"

export const getMentorCallCount = async (mentorId, params) => {
    const res = await api.get(`/audio-call/mentor/call-count/${mentorId}?${paramsToString(params)}`)
    return res.data
}

export const getStudentCountByCourse = async (params) => {
    const res = await api.get(`/statistic/user-course/student-count-by-course?${paramsToString(params)}`)
    return res.data
}

export const getStudentCountByLevel = async (params) => {
    const res = await api.get(`/statistic/user-course/student-count-by-level?${paramsToString(params)}`)
    return res.data
}

export const getNewStudentsCount = async (params) => {
    const res = await api.get(`/statistic/user-course/student-count-by-new?${paramsToString(params)}`)
    return res.data
}

export const getRating = async (mentorId, params) => {
    const res = await api.get(`/call-rate/teachers/statistic/${mentorId}?${paramsToString(params)}`)
    return res.data
}

export const getStudentsActivity = async (mentorId, params) => {
    const res = await api.get(`/user-course/teacher-panel/active-students-count/${mentorId}?${paramsToString(params)}`)
    return res.data
};

export const getAllStudentsCount = async (mentorId, params) => {
    const res = await api.get(`/user-course/teacher-panel/students-count/${mentorId}?${paramsToString(params)}`);
    return res.data
}

export const getLessonRate = async (mentorId, params) => {
    const res = await api.get(`/lesson-rate/teachers/statistic/${mentorId}?${paramsToString(params)}`);
    return res.data
}

export const getCallCount = async (mentorId, params) => {
    const res = await api.get(`/audio-call/mentor/call-count/${mentorId}?${paramsToString(params)}`);
    return res.data
}


export const getLessonRateStatistic = async (params) => {
    const res = await api.get(`/lesson-rate/teachers/statistic?${paramsToString(params)}`);
    return res.data;
}

export const getCallRateStatistic = async (params) => {
    const res = await api.get(`/call-rate/teachers/statistic?${paramsToString(params)}`);
    return res.data;
}


export const getStudentsRateForCallMentor = async (params) => {
    const res = await api.get(`/call-rate?${paramsToString(params)}`);
    return res.data;
}

export const getStudentsRateForTeacher = async (teacherId, groupId, params) => {
    const res = await api.get(`/lesson-rate/teacher/${teacherId}/${groupId}?${paramsToString(params)}`);
    return res.data;
}

export const getAcademicMentorSalary = async (mentorId, params) => {
    const res = await api.get(`/statistic/mentors/academy-mentor-salary/${mentorId}?${paramsToString(params)}`);
    return res.data
}


export const getCallAndLessonLeaderboard = async (params) => {
    const res = await api.get(`/statistic/call-and-lesson/leaderboard?${paramsToString(params)}`);
    return res.data
}


