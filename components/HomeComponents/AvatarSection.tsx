import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Scene from "@/components/3d/Scene";
import { useQuery } from "@tanstack/react-query";

const AvatarSection = () => {
  const formatBalance = (balance: number) => {
    return new Intl.NumberFormat("en-US").format(balance);
  };

  const { isLoading: checkingLoading, error: checkingError, data: checkingBalance } = useQuery({
    queryKey: ["balance"],
    queryFn: async () => {
      const response = await fetch("http://10.0.2.2:3000/api/accounts/1/balance");
      if (!response.ok) {
        throw new Error("Failed to fetch checking balance");
      }
      const data = await response.json();
      return data.balance;
    },
    staleTime: 0,

  });

  const { isLoading: savingLoading, error: savingError, data: savingBalance } = useQuery({
    queryKey: ["saving"],
    queryFn: async () => {
      const response = await fetch("http://10.0.2.2:3000/api/accounts/1/saving-balance");
      if (!response.ok) {
        throw new Error("Failed to fetch saving balance");
      }
      const data = await response.json();
      return data.saving;
    },
    staleTime: 0,
  });


  if (checkingLoading || savingLoading) {
    return <Text>Loading...</Text>;
  }

  if (checkingError || savingError) {
    console.error("Error fetching balances:", checkingError || savingError);
    return <Text>Error fetching balances</Text>;
  }

  return (
    <View style={styles.AvatarBalanceSection}>
      <View style={styles.AvatarSection}>
        <View style={styles.Avatar}>
          <Scene></Scene>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.DepositedAmountSection}>
          <Text style={styles.DepositedAmountText}>貯金額</Text>
          <View style={styles.DepositedAmountInner}>
            <Text style={styles.DepositedAmount}>
              ¥{formatBalance(savingBalance)}
            </Text>
          </View>
        </View>

        <View style={styles.balanceSection}>
          <Text style={styles.balanceText}>口座残高</Text>
          <View style={styles.balanceInner}>
            <Text style={styles.balance}>¥{formatBalance(checkingBalance)}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AvatarSection;

const styles = StyleSheet.create({
  AvatarBalanceSection: {
    flexDirection: "column",
  },
  AvatarSection: {
    width: "100%",
    height: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  Avatar: {
    marginTop: 20,
    width: 200,
    height: 800,
  },
  infoContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    height: "20%",
  },
  DepositedAmountSection: {
    width: "50%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  DepositedAmountText: {
    fontSize: 15,
  },
  DepositedAmountInner: {
    width: "80%",
    height: "40%",
    backgroundColor: "white",
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  DepositedAmount: {
    fontSize: 18,
  },
  balanceSection: {
    width: "50%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  balanceText: {
    fontSize: 15,
  },
  balanceInner: {
    width: "80%",
    height: "40%",
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "white",
  },
  balance: {
    fontSize: 18,
  },
});
