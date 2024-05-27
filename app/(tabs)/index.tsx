import { Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { fetchData } from "@/utils/apis";

type Movie = {
  id: string;
  title: string;
  releaseYear: string;
};


export default function index() {
  const [data, setData] = React.useState<Movie[] | null>(null);

  const getMovies = async () => {
    const data = await fetchData()
    setData(data.movies)
  }

  React.useEffect(() => {
    getMovies();
  }, []);

  return (
    <View>
      <Link href={"/error"} style={{ color: "red" }}>
        Open Error
      </Link>
      <Text>Movies</Text>
      {
        data?.map((movie) => (
          <Text key={movie.id}>{movie.title} {movie.releaseYear}</Text>
        ))
      }
    </View>
  );
}
