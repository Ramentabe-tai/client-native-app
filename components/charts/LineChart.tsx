import React, { useCallback } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { VictoryBar, VictoryChart, VictoryTheme, VictoryAxis } from "victory-native";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getChartsData, getSavingBalance, getAccountBalance } from "@/app/api/analytics";

const formatBalance = (balance: number) => {
  return new Intl.NumberFormat("en-US").format(balance);
};

export default function LineChart() {
  const queryClient = useQueryClient();

  const { data: chartsData = [] } = useQuery({
    queryKey: ["chartsData"],
    queryFn: getChartsData,
  });

  const { data: savingBalance = 0 } = useQuery({
    queryKey: ["savingBalance"],
    queryFn: getSavingBalance,
  });

  const { data: accountBalance = 0 } = useQuery({
    queryKey: ["checkingBalance"],
    queryFn: getAccountBalance,
  });


  // Process chartsData to format month_year and parse spendings
  const processedChartData = chartsData.map(item => ({
    month_year: item.month_year,
    spendings: parseInt(item.spendings, 10)
  }));

  return (
    <>
      <View style={styles.Wrapper}>
        <View style={styles.innerWrapper}>
          <Text style={styles.Headline}>貯金額</Text>
          <Text style={styles.Value}>¥{formatBalance(savingBalance)}</Text>
        </View>
        <View style={styles.innerWrapper}>
          <Text style={styles.Headline}>口座残高</Text>
          <Text style={styles.Value}>¥{formatBalance(accountBalance)}</Text>
        </View>
      </View>
      <View style={styles.container}>
        <VictoryChart
          width={400}
          theme={VictoryTheme.material}
          domainPadding={{ x: 32 }}
        >
          <VictoryAxis
            tickFormat={(tick) => (tick)}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={(tick) => `¥${tick}`}
          />
          <VictoryBar
            data={processedChartData}
            x="month_year"
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
    display: 'flex',
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 16,
  },
  innerWrapper: {
    backgroundColor: '#FFFF',
    paddingHorizontal: 40,
    paddingVertical: 5,
    borderRadius: 10
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
    height: 300,
    marginVertical: 16,
    marginHorizontal: 16,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});