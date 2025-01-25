import { api } from "./api"

export const createGroups = async (data) => {
    const res = await api.post(`/group`, data)
    return res.data
}

export const getSelectGroupStudents = async (teacherId, groupId) => {
    const res = await api.get(`/user-course/teacher/student-list-for-group/${teacherId}/${groupId}`)
    return res.data
}

export const addStudentsToGroup = async (data) => {
    const res = await api.post(`/group/add-student`, data)
    return res
}
