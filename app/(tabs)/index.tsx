import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AvatarSection from "@/components/HomeComponents/AvatarSection";
import { Link } from "expo-router";

import GameDashBoard from "@/components/HomeComponents/GameDashBoard";
import { LinearGradient } from "expo-linear-gradient";

type Movie = {
  id: string;
  title: string;
  releaseYear: string;
};



export default function index() {
  return (
    <LinearGradient
      colors={['#FCFF80', '#5AD1B7']} // 시작 색상과 끝 색상
      style={styles.background}
    >
      <View style={styles.HomeSection}>
      <View style={styles.AvatarSection}>
        <AvatarSection />
      </View>
      <View style={styles.GameDashBoard}></View>
      <Link href="/LoginPage">Login</Link>
      <View style={styles.GameDashBoard}>
        <GameDashBoard />
      </View>
    </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
   background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  HomeSection: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
    
  },
  AvatarSection: {
    height: "45%",
  },
  GameDashBoard: {
    height: "55%",
  }
});
