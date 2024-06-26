import axios from "axios";

const baseURL = "http://3.107.20.181";

const login = async (email: String, password: String) => {
  const body = {
    email,
    password,
  };

  try {
    const response = await axios.post(`${baseURL}/mb/signin/user`, body);
    return response;
  } catch (error) {
    console.error(error);
  }
};

const register = async (
  name: String,
  mobile: String,
  email: String,
  username: String,
  password: String
) => {
  const body = { name, mobile, email, username, password };

  try {
    const response = await axios.post(`${baseURL}/mb/signup/user`, body);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export default {
  login,
  register,
};
