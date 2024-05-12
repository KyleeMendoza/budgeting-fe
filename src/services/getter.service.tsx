import axios from "axios";

const baseURL = "http://3.107.20.181";

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
