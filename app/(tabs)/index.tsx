import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AvatarSection from "@/components/HomeComponents/AvatarSection";

import GameDashBoard from "@/components/HomeComponents/GameDashBoard";


type Movie = {
  id: string;
  title: string;
  releaseYear: string;
};



export default function index() {
  return (
    <View style={styles.HomeSection}>
      <View style={styles.AvatarSection}>
        <AvatarSection />
      </View>
      <View style={styles.GameDashBoard}></View>
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
});
