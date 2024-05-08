import axios from "axios";

const baseURL = "http://52.62.236.103:3001";

const getExpenses = async () => {
  try {
    const response = await axios.get(`${baseURL}/mb/user/expenses`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export default {
  getExpenses,
};
