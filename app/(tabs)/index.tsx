import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AvatarSection from "@/components/HomeComponents/AvatarSection";
import { Link } from "expo-router";

export default function index() {
  return (
    <View style={styles.HomeSection}>
      <View style={styles.AvatarSection}>
        <AvatarSection />
      </View>
      <View style={styles.GameDashBoard}></View>
      <Link href="/LoginPage">Login</Link>
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
