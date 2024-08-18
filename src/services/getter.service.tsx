import axios from "axios";

const baseURL = "http://54.237.120.196:3001";

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
