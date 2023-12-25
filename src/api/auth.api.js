import axios from "axios"

export const loginUser = (userId) => {
    return axios.get(`https://api.hustutor.dobuiquanganh.com/v1/accounts/${userId}`)
}