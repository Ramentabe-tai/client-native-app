export async function getMoviesFromApiAsync() {
  try {
    const response = await fetch("https://reactnative.dev/movies.json");
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
}