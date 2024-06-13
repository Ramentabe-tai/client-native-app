import { StyleSheet, Text, View, Image } from "react-native";
import React, { useState } from "react";

const AvatarSection = () => {
  const [balance, setBalance] = useState<number>(10000000);
  const [depositedAmount, setDepositedAmount] = useState(5000)
  const formatBalance = (balance: number) => {
    return new Intl.NumberFormat("en-US").format(balance);
  };

  return (
    <View style={styles.AvatarBalanceSection}>
      <View style={styles.AvatarSection}>
        <View style={styles.Avatar}></View>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.DepositedAmountSection}>
          <Text style={styles.DepositedAmountText}>貯金額</Text>
          <View style={styles.DepositedAmountInner}>
            <Text style={styles.DepositedAmount}>
              ¥{formatBalance(depositedAmount)}
            </Text>
          </View>
        </View>

        <View style={styles.balanceSection}>
          <Text style={styles.balanceText}>口座残高</Text>
          <View style={styles.balanceInner}>
            <Text style={styles.balance}>¥{formatBalance(balance)}</Text>
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
    width: 200,
    height: 200,
    backgroundColor: "black",
    borderRadius: 100,
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
