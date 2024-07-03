import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useQuery } from "@tanstack/react-query";
import MissionComponents from "./MissionComponents"; // Import your MissionComponents component

// API fetch functions
const getExperience = async () => {
  const response = await fetch("http://15.168.108.6:8080/api/member/1/exp");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data.exp;
};

const getMissions = async () => {
  const response = await fetch("http://15.168.108.6:8080/api/member/1/missions");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data.missions;
};

const GameDashBoard = () => {
  const { isLoading: expLoading, error: expError, data: experience } = useQuery({
    queryKey: ["experience"],
    queryFn: getExperience,
  });

  const { isLoading: missionsLoading, error: missionsError, data: missions, refetch: refetchMissions } = useQuery({
    queryKey: ["missions"],
    queryFn: getMissions,
  });

  const maxExperience = 1000;
  const experienceWidth = experience ? (experience / maxExperience) * 100 : 0;

  // Function to handle mission status update
  const handleUpdateMissionStatus = async (missionId: number) => {
    try {
      const response = await fetch(`http://15.168.108.6:8080/api/member/1/mission/${missionId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        throw new Error("Failed to update mission status");
      }

      const data = await response.json();
      console.log(data); // Log the response data

      // Refetch missions after successful update
      refetchMissions();
    } catch (error) {
      console.log("Error updating mission status:", error);
    }
  };

  if (expLoading || missionsLoading) {
    return <Text>Loading...</Text>;
  }

  if (expError || missionsError) {
    return <Text>Error fetching data</Text>;
  }

  return (
    <View style={styles.GameDashBoardSection}>
      <View style={styles.XPSection}>
        <Text style={styles.level}>Level</Text>
        <View style={styles.experienceBarContainer}>
          <View style={[styles.experienceBarFill, { width: `${experienceWidth}%` }]}></View>
        </View>
      </View>
      <View style={styles.experienceBarFillText}>
        <Text>{experience} / {maxExperience}</Text>
      </View>
      <View style={styles.MissionSection}>
        <View style={styles.missionTextSection}>
          <Text style={styles.missionText}>Missions</Text>
        </View>
        <ScrollView style={styles.missionList}>
          {missions && missions.map((mission: any) => (
            <MissionComponents
              key={mission.missionId}
              mission={mission}
              onUpdateMissionStatus={handleUpdateMissionStatus} // Pass the handler function
            />
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
    alignItems: "center",
    marginTop: 16,
  },
  level: {
    fontSize: 16,
  },
  experienceBarContainer: {
    marginLeft: 8,
    height: 16,
    borderRadius: 50,
    backgroundColor: "white",
    borderColor: "white",
    borderWidth: 2,
    width: "80%",
  },
  experienceBarFill: {
    height: "100%",
    backgroundColor: "red",
    borderRadius: 50,
  },
  experienceBarFillText: {
    alignItems: "center",
  },
  MissionSection: {
    width: "100%",
    height: '75%',
    alignItems: "center",
    justifyContent: "center",


  },
  missionTextSection: {

    width: "100%",
    alignItems: "center",
  },
  missionText: {
    fontSize: 24,
  },
  missionList: {
    width: "100%",
    height: "auto",
  },
});