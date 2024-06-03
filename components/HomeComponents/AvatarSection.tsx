import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useState } from 'react'

const AvatarSection = () => {
  const [balance, setBalance] = useState(10000000)

  const formatBalance = (balance) => {
    return new Intl.NumberFormat("en-US").format(balance);
  };
  
  return (
    <View style={styles.AvatarBalanceSection}>
      <View style={styles.AvatarSection}>
        <View style={styles.Avatar}></View>
      </View>
      <View style={styles.balanceSection}>
        <Text style={styles.balanceText}>貯金額</Text>
        <Text style={styles.balance}>¥{ formatBalance(balance)}</Text>
      </View>
    </View>
  );
}

export default AvatarSection;

const styles = StyleSheet.create({
  AvatarBalanceSection: {
    flexDirection: "column",
  },
  AvatarSection: {
    backgroundColor: "#f8f7fa",
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
  balanceSection: {
    width: "100%",
    height: "20%",
    alignItems: "center",
    justifyContent: "center",
  },
  balanceText: {
    fontSize: 15,
  },
  balance: {
    fontSize: 25,
    backgroundColor: "white",
    
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20
    
  },
});