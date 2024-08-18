export const user = {
  name: "John Doe",
  username: "johndoe123",
  password: "1",
  email: "1",
  mobile: "123-456-7890",
  timeframe: "Weekly",
  expenses: 1500,
  balance: 500,
  expenseData: [
    {
      category: "grocery",
      percent: 25,
    },
    {
      category: "rent",
      percent: 40,
    },
    {
      category: "utilities",
      percent: 15,
    },
    {
      category: "transportation",
      percent: 10,
    },
    {
      category: "entertainment",
      percent: 10,
    },
  ],
  isDone: true,
};

export const userExpenses = [
  [
    {
      category_type: "Needs",
      category: "Food",
      thisPercentage: 20,
      allocated_amount: 200,
      date: "Day 1",
    },
    {
      category_type: "Needs",
      category: "Transportation",
      thisPercentage: 20,
      allocated_amount: 200,
      date: "Day 1",
    },
    {
      category_type: "Wants",
      category: "Entertainment",
      thisPercentage: 10,
      allocated_amount: 100,
      date: "Day 1",
    },
    {
      category_type: "Needs",
      category: "Utilities",
      thisPercentage: 10,
      allocated_amount: 100,
      date: "Day 1",
    },
    {
      category_type: "",
      category: "Savings",
      thisPercentage: 40,
      allocated_amount: 400,
      date: "Day 1",
    },
  ],
  [
    {
      category_type: "Needs",
      category: "Food",
      thisPercentage: 30,
      allocated_amount: 600,
      date: "Day 2",
    },
    {
      category_type: "Needs",
      category: "Transportation",
      thisPercentage: 10,
      allocated_amount: 200,
      date: "Day 2",
    },
    {
      category_type: "Wants",
      category: "Entertainment",
      thisPercentage: 5,
      allocated_amount: 100,
      date: "Day 2",
    },
    {
      category_type: "Needs",
      category: "Utilities",
      thisPercentage: 5,
      allocated_amount: 100,
      date: "Day 2",
    },
    {
      category_type: "",
      category: "Savings",
      thisPercentage: 50,
      allocated_amount: 1000,
      date: "Day 2",
    },
  ],
];

export const expenseSummary = {
  "Day 1": {
    totalIncome: 1000,
    savings: 400,
    maxPercentageExpense: {
      category: "Food",
      percentage: 20,
      amount: 200,
    },
  },
  "Day 2": {
    totalIncome: 2000,
    savings: 400,
    maxPercentageExpense: {
      category: "Food",
      percentage: 30,
      amount: 600,
    },
  },
};

export const arimaExpenses = [
  {
    date: "Day 1",
    totalAmount: 400,
    totalPercentage: 40,
  },
  {
    date: "Day 2",
    totalAmount: 1000,
    totalPercentage: 50,
  },
  {
    date: "Day 3",
    totalAmount: 200,
    totalPercentage: 10,
  },
  {
    date: "Predicted Day 1",
    totalAmount: 322,
    totalPercentage: 100,
  },
  {
    date: "Predicted Day 2",
    totalAmount: 400,
    totalPercentage: 100,
  },
];
