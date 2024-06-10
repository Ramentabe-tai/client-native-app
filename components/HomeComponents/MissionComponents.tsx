import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { CheckBox } from "react-native-elements";
const MissionComponents = ({ mission }) => {
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
      <View>
        <Text style={styles.missionIncrementValue}>
          経験値+{mission.incrementValue}
        </Text>
      </View>
    </View>
  );
}

export default MissionComponents

const styles = StyleSheet.create({
  missionContents: {
    width: "100%",
    height: "30%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    padding: 10,
  },
  checkboxWrapper: {
    // borderColor: "black",
    // borderWidth: 1,
  },
  missionContentTitle: {
    display: "flex",
    flexDirection: "row",
  },
  checkboxContainer: {
    margin: 0,
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
  },
  textStyle: {
    fontSize: 15,
  },
  missionName: {
    fontSize: 20,
    color: "black",
    paddingLeft: 0,
  },
  missionContent: {
    fontSize: 15,
    color: "black",
  },
  missionIncrementValue: {
    fontSize: 15,
    color: "black",
  },
});