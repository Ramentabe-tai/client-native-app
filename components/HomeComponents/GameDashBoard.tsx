import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import MissionComponents from "./MissionComponents";
import { getMissions, getExprience } from "@/app/api/index"

const GameDashBoard = () => {
  const [experience, setExperience] = useState(getExprience());
  const [maxExperience, setMaxExperience] = useState(getExprience());
  const [experienceWidth, setExperienceWidth] = useState(0);

  const missions = getMissions()

  useEffect(() => {
    const experienceWidthPercentage = (experience / maxExperience) * 100;
    setExperienceWidth(experienceWidthPercentage);
  }, [experience]);

  return (
    <View style={styles.GameDashBoardSection}>
      <View style={styles.XPSection}>
        <Text style={styles.level}>level</Text>
        <View
          style={[
            styles.experienceBarContainer,

          ]}
        >
          <View
            style={[styles.experienceBarFill, { width: `${experienceWidth}%` }]}
          ></View>
        </View>
      </View>
      <View style={styles.experienceBarFillText}>
        <Text>
          {experienceWidth} / {maxExperience}
        </Text>
      </View>
      <View style={styles.MissionSection}>
        <View style={styles.missionTextSection}>
          <Text style={styles.missionText}>Mission</Text>
        </View>
        <ScrollView style={styles.missionList}>
          {missions.map((mission) => (
            <MissionComponents mission={mission} key={mission.id} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default GameDashBoard;

const styles = StyleSheet.create({
  GameDashBoardSection: {
    width: "100%",
  },
  XPSection: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10
  },
  level: {
    fontSize: 15,
    
  },
  experienceBarContainer: {
    marginLeft: 10,
    height: 15,
    borderRadius: 50,
    backgroundColor: "white",
    borderColor: "white",
    borderWidth: 2,
    width: "80%"
  },
  experienceBarFill: {
    height: "100%",
    backgroundColor: "red",
    borderRadius: 50,
    
  },
  experienceBarFillText: {
    alignItems: "center",
    fontWeight: 500,

  },
  MissionSection: {
    width: "100%",
    height: "80%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  missionTextSection: {
    height: "10%",
    width: "100%",
    alignItems: "center",

  },
  missionText: {
    fontSize: 25,
  },
  missionList: {
    width: "100%",
    height: "auto",
  },
});

