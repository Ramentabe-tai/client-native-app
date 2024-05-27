import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import MissionComponents from './MissionComponents';

const GameDashBoard = () => {

    const [experience, setExperience] = useState(10);
    const [maxExperience, setMaxExperience] = useState(80);
    const [experienceWidth, setExperienceWidth] = useState(0);

    const MissionList = [
        {
          id:1,
        name: "水を入れる",
        content: "水筒に水を入れる。 約200円節約",
        incrementValue: 1,
      },
        {
          id:2,
        name: "冷房の温度を1度上げる",
        content: "約500円節約",
        incrementValue: 2,
      },
        {
          id:3,
        name: "晩ご飯はカレーを作りましょう",
        content: "3回分の食事が節約",
        incrementValue: 3,
      },
    ];

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
            { width: `${maxExperience}%` },
          ]}
        >
          <View
            style={[styles.experienceBarFill, { width: `${experienceWidth}%` }]}
          ></View>
        </View>
      </View>
          <View style={styles.MissionSection}>
              <Text>Mission</Text>
        {MissionList.map((mission) => (
          <MissionComponents  mission={mission} />
        ))}
      </View>
      <View>
        <Text>pulsButton</Text>
      </View>
    </View>
  );
}

export default GameDashBoard

const styles = StyleSheet.create({
  GameDashBoardSection: {
    width: "100%",
  },
  XPSection: {
    flexDirection: "row",
    justifyContent: "center",
  },
  level: {
    fontSize: 15,
  },
  experienceBarContainer: {
    backgroundColor: "white",
    marginLeft: 10,
    height: 20,
    borderRadius: 50,
  },
  experienceBarFill: {
    height: "100%",
    backgroundColor: "black",
    borderRadius: 50,
  },
    MissionSection: {
        width: "100%",
        height: "80%",
        borderColor: "black",
        alignItems: "center",
        justifyContent: "center"
        
  }
});