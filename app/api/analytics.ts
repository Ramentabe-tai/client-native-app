export function getSavingBalance() {
  const response = { saving_balance: 50000 };
  return response.saving_balance;
}

export function getCheckingBalance() {
  const response = { checking_balance: 120000 };
  return response.checking_balance;
}

export function getSpendings() {
  const response = { spending: 40000 };
  return response.spending;
}

export async function getTransactions() {
  try {
    const response = await fetch("https://reactnative.dev/movies.json");
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
}

export function getChartsData() {
  const data = [
    { month: 1, spendings: 13000 },
    { month: 2, spendings: 16500 },
    { month: 3, spendings: 14250 },
    { month: 4, spendings: 19000 },
    { month: 5, spendings: 21000 },
    { month: 6, spendings: 12120 },
  ];

  return data;
}
