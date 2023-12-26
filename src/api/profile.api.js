import axios from "axios"

export const updateProfileUserApi = (userId, formData) => {
    return axios.post(`https://babybuddies-be-dev.onrender.com/api/v1/accounts/${userId}/update`, formData)
}

export const getProfileForUser = (userId) => {
    return axios.get(`https://babybuddies-be-dev.onrender.com/api/v1/accounts/${userId}`)
}