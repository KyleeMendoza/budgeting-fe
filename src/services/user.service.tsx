import axios from "axios";

const baseURL = "http://3.107.20.181";

const checkTimeFrame = async () => {
  try {
    const response = await axios.get(`${baseURL}/mb/checktf/user`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

const postIncomeTimeframe = async (income: String, Timeframe: String) => {
  const body = {
    income,
    Timeframe,
  };

  try {
    const response = await axios.post(`${baseURL}/mb/select/timeframe`, body);
    return response;
  } catch (error) {
    console.error(error);
  }
};

const postInitialExpences = async (budgetCategories: any, date: string) => {
  const body = {
    budgetCategories,
  };

  try {
    const response = await axios.post(`${baseURL}/mb/insert/expenses`, body, {
      params: { date },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

const getUserSavingsAndExpense = async () => {
  try {
    const response = await axios.get(`${baseURL}/mb/user/budget`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

const getExpenses = async () => {
  try {
    const response = await axios.get(`${baseURL}/mb/user/expenses`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

const getTimeframe = async () => {
  try {
    const response = await axios.get(`${baseURL}/mb/user/budget`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export default {
  checkTimeFrame,
  postIncomeTimeframe,
  postInitialExpences,
  getExpenses,
  getUserSavingsAndExpense,
  getTimeframe,
};
