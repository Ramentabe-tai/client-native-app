// Function to fetch missions data
export async function fetchMissions() {
  const url = `http://15.168.108.6:8080/api/member/1/missions`;
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
  const url = `http://15.168.108.6:8080/api/member/1/exp`;
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
