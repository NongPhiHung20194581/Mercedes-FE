import axios from "axios"

export const getAllNanniesApi = () => {
    return axios.get('https://api.hustutor.dobuiquanganh.com/v1/home?fbclid=IwAR0YWt_3e9gKOT4E6uDFFe5aQl4lZ6GMheji7DLbuXTORu1V2j5x8JUrDQQ');
}

export const matchingNannyApi = (formData) => {
    return axios.post("https://api.hustutor.dobuiquanganh.com/v1/search/matching", formData);
}