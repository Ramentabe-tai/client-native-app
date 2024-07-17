import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { CheckBox } from "@rneui/themed";

const MissionComponents = ({ mission, onUpdateMissionStatus }: { mission: any, onUpdateMissionStatus: (missionId: number) => void }) => {
  const [isChecked, setIsChecked] = useState(mission.is_completed); // Using mission.is_completed to initialize isChecked state

  const handleMissionCompletion = () => {
    // Toggle isChecked state locally
    setIsChecked(!isChecked);

    // Call parent function to update mission status
    onUpdateMissionStatus(mission.mission_id);
  };

  return (
    <View style={styles.missionContents}>
      <View style={styles.checkboxWrapper}>
        <View style={styles.missionContentTitle}>
          <CheckBox
            checked={isChecked}
            onPress={handleMissionCompletion}
            checkedColor="black"
            uncheckedColor="black"
            containerStyle={styles.checkboxContainer}
            checkedIcon="check-square"
            uncheckedIcon="square-o"
          />
          <Text style={[styles.missionName, isChecked && styles.completedMission]}>
            {mission.mission_title}
          </Text>
        </View>
        <View>
          <Text style={styles.missionContent}>{mission.mission_description}</Text>
        </View>
      </View>
      <View style={styles.missionIncrementValueSection}>
        <Text style={styles.missionIncrementValue}>
          {mission.exp_point} Exps
        </Text>
      </View>
    </View>
  );
};

export default MissionComponents;

const styles = StyleSheet.create({
  missionContents: {
    height: 80,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 2,
    backgroundColor: '#7777',
    marginHorizontal: 5,
    borderRadius: 10,
  },
  checkboxWrapper: {
    marginLeft: 8,
  },
  missionContentTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxContainer: {
    width: 12,
    height: 24,
    margin: 0,
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
  },
  missionName: {
    fontSize: 16,
    color: "black",
  },
  completedMission: {
    textDecorationLine: "line-through",
  },
  missionContent: {
    fontSize: 12,
    color: "black",
    marginLeft: 12,
    width: 250,
  },
  missionIncrementValueSection: {
    marginRight: 8,
  },
  missionIncrementValue: {
    fontSize: 16,
    color: "black",
  },
});
