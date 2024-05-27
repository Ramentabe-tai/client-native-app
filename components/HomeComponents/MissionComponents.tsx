import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const MissionComponents = ({ mission }) => {
  return (
    <View>
          <View>
              <Text style={styles.missionName}>
                  { mission.name}
              </Text>
              <Text style={styles.missionContent}>
                  {mission.content}
              </Text>
              <Text style={styles.missionIncrementValue}>{ mission.incrementValue}</Text>
          </View>
    </View>
  )
}

export default MissionComponents

const styles = StyleSheet.create({
  missionName: {
    fontSize: 20,
    color: "black",
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