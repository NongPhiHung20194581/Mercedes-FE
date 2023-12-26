import axios from "axios"

export const handleRatingApi = (staffId, formData) => {
    return axios.post(`https://babybuddies-be-dev.onrender.com/api/v1/ratings/staff/${staffId}`, formData)
}