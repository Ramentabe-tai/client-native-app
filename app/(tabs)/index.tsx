import { StyleSheet,Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { fetchData } from "@/utils/apis";
import AvatarSection from "@/components/HomeComponents/AvatarSection";
import GameDashBoard from "@/components/HomeComponents/GameDashBoard";
import PlusBtn from "@/components/HomeComponents/PlusBtn";

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
    // <Link href={"/error"} style={{ color: "red" }}>
    //   Open Error
    // </Link>
    // <Text>Movies</Text>
    // {
    //   data?.map((movie) => (
    //     <Text key={movie.id}>{movie.title} {movie.releaseYear}</Text>
    //   ))
    // }
    <View style={styles.HomeSection}>
      <View style={styles.AvatarSection}>
        <AvatarSection />
      </View>
      <View style={styles.GameDashBoard}>
        <GameDashBoard />
      </View>
      <View style={styles.PlusBtnSection}>
        <PlusBtn />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  HomeSection: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
  },
  AvatarSection: {
    height: "45%",
    backgroundColor: "lightblue",
  },
  GameDashBoard: {
    height: "55%",
    backgroundColor: "lightgray",
  },

  PlusBtnSection: {
    position: "absolute",
    bottom: 45,
    right: 20
  },
});