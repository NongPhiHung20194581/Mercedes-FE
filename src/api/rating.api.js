import axios from "axios"

export const handleRatingApi = (staffId, formData) => {
    return axios.post(`https://api.hustutor.dobuiquanganh.com/v1/ratings/staff/${staffId}`, formData)
}