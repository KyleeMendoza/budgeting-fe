import axios from "axios";

const baseURL = "http://52.62.236.103:3001";

const getCategories = async () => {
  try {
    const response = await axios.get(`${baseURL}/mb/categories`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export default {
  getCategories,
};
