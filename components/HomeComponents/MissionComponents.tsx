import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { CheckBox } from "@rneui/themed";
const MissionComponents = ({ mission }: { mission: any }) => {
  // fix types later
  const [isChecked, setIsChecked] = useState(false);

  return (
    <View style={styles.missionContents}>
      <View style={styles.checkboxWrapper}>
        <View style={styles.missionContentTitle}>
          <CheckBox
            checked={isChecked}
            onPress={() => setIsChecked(!isChecked)}
            checkedColor="black"
            uncheckedColor="black"
            containerStyle={styles.checkboxContainer}
            textStyle={styles.textStyle}
            checkedIcon="check-square"
            uncheckedIcon="square-o"
          />
          <Text style={styles.missionName}>{mission.name}</Text>
        </View>
        <View>
          <Text style={styles.missionContent}>{mission.content}</Text>
        </View>
      </View>
      <View style={styles.missionIncrementValueSection}>
        <Text style={styles.missionIncrementValue}>
          経験値+{mission.incrementValue}
        </Text>
      </View>
    </View>
  );
};

export default MissionComponents;

const styles = StyleSheet.create({
  missionContents: {
    width: "100%",
    height: 80,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  checkboxWrapper: {
    marginLeft: 8,
  },
  missionContentTitle: {
    display: "flex",
    flexDirection: "row",
  },
  checkboxContainer: {
    width: 12,
    height: 24,
    margin: 0,
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
  },
  textStyle: {},
  missionName: {
    fontSize: 16,
    color: "black",
  },
  missionContent: {
    fontSize: 12,
    color: "black",
    marginLeft: 16,
  },
  missionIncrementValueSection: {
    marginRight: 8,
  },
  missionIncrementValue: {
    fontSize: 16,
    color: "black",
  },
});
