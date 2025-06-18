import axios from "axios";

const PREFIX_URL = "http://127.0.0.1:8000/series/api/v1categories/"

export const getAllCategoryService = async () => {
    const response = await axios.get(PREFIX_URL);
    return response
}