import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";
import { getChartsData, getSavingBalance, getSpendings } from "@/app/api/analytics";

const chartsData = getChartsData()
const savingBalance = getSavingBalance()
const spendings = getSpendings()

const formatBalance = (balance: number) => {
  return new Intl.NumberFormat("en-US").format(balance);
};

export default function LineChart() {
  return (
    <>
      <View style={styles.Wrapper}>
        <View style={styles.innerWrapper}>
          <Text style={styles.Headline}>貯金額</Text>
          <Text style={styles.Value}>¥{formatBalance(savingBalance)}</Text>
        </View>
        <View style={styles.innerWrapper}>
          <Text style={styles.Headline}>使用金額(月)</Text>
          <Text style={styles.Value}>¥{formatBalance(spendings)}</Text>
        </View>
      </View>
      <View style={styles.container}>
        <VictoryChart
          width={400}
          theme={VictoryTheme.material}
          domainPadding={{ x: 32 }}
        >
          <VictoryBar
            data={chartsData}
            x="month"
            y="spendings"
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
