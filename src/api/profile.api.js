import axios from "axios"

export const updateProfileUserApi = (userId, formData) => {
    return axios.post(`https://api.hustutor.dobuiquanganh.com/v1/accounts/${userId}/update`, formData)
}

export const getProfileForUser = (userId) => {
    return axios.get(`https://api.hustutor.dobuiquanganh.com/v1/accounts/${userId}`)
}