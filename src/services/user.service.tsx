import axios from "axios";

const baseURL = "http://54.237.120.196:3001";

const checkTimeFrame = async () => {
  try {
    const response = await axios.get(`${baseURL}/mb/checktf/user`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

// timeframe
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

// income
const postIncome = async (income: String) => {
  const body = {
    income,
  };

  try {
    const response = await axios.post(`${baseURL}/mb/input/income`, body);
    return response;
  } catch (error) {
    console.error(error);
  }
};

//expenses
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

const getExpensesSummary = async () => {
  try {
    const response = await axios.get(`${baseURL}/mb/user/expenses-summary`);
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

// GRAPH
const getArimaGraph = async () => {
  try {
    const response = await axios.get(`${baseURL}/mb/arima/expenses`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

//Saving Tips
const getSmartTips = async (threshold: any) => {
  const body = {
    threshold,
  };

  try {
    const response = await axios.post(`${baseURL}/mb/personal/tips`, body);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export default {
  checkTimeFrame,
  postIncomeTimeframe,
  postIncome,
  postInitialExpences,
  getExpenses,
  getExpensesSummary,
  getUserSavingsAndExpense,
  getTimeframe,
  getArimaGraph,
  getSmartTips,
};
