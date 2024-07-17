// Function to fetch missions data
export async function fetchMissions() {
  const url = `http://localhost:3000/api/members/1/missions`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch missions");
    }
    const missions = await response.json();
    return missions;
  } catch (error) {
    console.error("Error fetching missions:", error);
    return [];
  }
}

// Function to fetch experience data
export async function fetchExperience() {
  const url = `http://localhost:3000/api/member/1/exp`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch experience");
    }
    const experience = await response.json();
    return experience.exp;
  } catch (error) {
    console.error("Error fetching experience:", error);
    return 0;
  }
}

const fetchSavingBalance = async () => {
  try {
    const response = await fetch(
      "http://10.0.2.2:3000/api/accounts/1/saving-balance"
    );
    if (response.ok) {
      const data = await response.json();
      // Handle the saving balance data here
      console.log("Saving balance:", data);
    } else {
      console.error("Failed to fetch saving balance");
    }
  } catch (error) {
    console.error("Error fetching saving balance:", error);
  }
};

const fetchAccountBalance = async () => {
  try {
    const response = await fetch("http://10.0.2.2:3000/api/accounts/1/balance");
    if (response.ok) {
      const data = await response.json();
      // Handle the account balance data here
      console.log("Account balance:", data);
    } else {
      console.error("Failed to fetch account balance");
    }
  } catch (error) {
    console.error("Error fetching account balance:", error);
  }
};
