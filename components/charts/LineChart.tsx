import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";

const data = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 },
];

export default function LineChart() {
  return (
    <>
      <View style={styles.Wrapper}>
        <View style={styles.innerWrapper}>
          <Text style={styles.Headline}>貯金額</Text>
          <Text style={styles.Value}>¥1,000,000</Text>
        </View>
        <View style={styles.innerWrapper}>
          <Text style={styles.Headline}>使用金額(月)</Text>
          <Text style={styles.Value}>¥50,000</Text>
        </View>
      </View>
      <View style={styles.container}>
        <VictoryChart
          width={400}
          theme={VictoryTheme.material}
          domainPadding={{ x: 32 }}
        >
          <VictoryBar
            data={data}
            x="quarter"
            y="earnings"
            alignment="middle"
            style={{ data: { fill: "#F48E35" } }}
          />
        </VictoryChart>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  Wrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 16,
  },
  innerWrapper: {
    width: "50%",
  },
  Headline: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  Value: {
    fontSize: 24,
    textAlign: "center",
    marginTop: 8,
  },
  container: {
    backgroundColor: "#fff",
    height: 320,
    marginVertical: 16,
    marginHorizontal: 16,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
