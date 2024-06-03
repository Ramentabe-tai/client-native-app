import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { fetchData } from "@/utils/apis";
import AvatarSection from "@/components/HomeComponents/AvatarSection";
import GameDashBoard from "@/components/HomeComponents/GameDashBoard";

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

    <View style={styles.HomeSection}>
      <View style={styles.AvatarSection}>
        <AvatarSection />
      </View>
      <View style={styles.GameDashBoard}>
        <GameDashBoard />
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
    flex: 1,
    backgroundColor: "lightblue",
  },
  GameDashBoard: {
    flex: 1,
    backgroundColor: "lightgray",
  },
});