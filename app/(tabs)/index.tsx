import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";

export default function index() {
  return (
    <View>
      <Link href={"/error"} style={{ color: "red" }}>
        Open Error
      </Link>
    </View>
  );
}
