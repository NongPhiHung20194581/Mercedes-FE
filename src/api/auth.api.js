import axios from "axios"

export const loginUser = (userId) => {
    return axios.get(`https://babybuddies-be-dev.onrender.com/api/v1/accounts/${userId}`)
}