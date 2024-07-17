export function getSavingBalance() {
  const response = { saving_balance: 50000 };
  return response.saving_balance;
}

export function getAccountBalance() {
  const response = { checking_balance: 120000 };
  return response.checking_balance;
}

export function getSpendings() {
  const response = { spending: 40000 };
  return response.spending;
}

export async function getTransactions() {
  try {
    const response = await fetch(
      "http://10.0.2.2:3000/api/accounts/1/transactions"
    );
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
}

export async function getChartsData() {
  try {
    const response = await fetch("http://10.0.2.2:3000/api/accounts/1/expense");
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
}
