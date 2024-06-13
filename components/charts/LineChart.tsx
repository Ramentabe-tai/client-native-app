import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";

const data = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 }
];

export default function LineChart() {
  return (<>
    <Text>LineChart:</Text>
    <View style={styles.container}>
      <VictoryChart width={380} theme={VictoryTheme.material}>
        <VictoryBar data={data} x="quarter" y="earnings" />
      </VictoryChart>
    </View>
  </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: 320,
    marginHorizontal: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  }
});