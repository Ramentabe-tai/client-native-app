import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "@/app/api/analytics";

interface Transaction {
  transaction_id: number;
  amount: number;
  account_id: number;
  category_id: number;
  member_id: number;
  transaction_date: string;
  message: string;
  transaction_type: string;
}

export default function Transactions() {
  const { isPending, error, data } = useQuery<Transaction[]>({
    queryKey: ["transactions"],
    queryFn: getTransactions,
  });

  if (isPending) return <Text>Loading transactions...</Text>;
  if (error) return <Text>Error fetching transactions: {error.message}</Text>;

  const sortedTransactions = [...(data || [])].sort((a, b) =>
    new Date(b.transaction_date).getTime() - new Date(a.transaction_date).getTime()
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>支出の詳細</Text>
      <FlatList
        data={sortedTransactions}
        keyExtractor={(item) => item.transaction_id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.transactionItem}>
            <View style={styles.transactionHeader}>
              <Text style={styles.transactionType}>{item.transaction_type}</Text>
              <Text style={[styles.amount, item.transaction_type === 'DEPOSIT' ? styles.depositAmount : styles.withdrawalAmount]}>
                ¥{item.amount.toLocaleString()}
              </Text>
            </View>
            <Text style={styles.message}>{item.message}</Text>
            <Text style={styles.date}>
              {new Date(item.transaction_date).toLocaleDateString('ja-JP', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '35%',
  },
  title: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 16,
  },
  transactionItem: {
    padding: 16,
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 10,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionType: {
    color: "#000",
    fontWeight: "bold",
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  depositAmount: {
    color: "#4CAF50", // Green color for deposits
  },
  withdrawalAmount: {
    color: "#F44336", // Red color for withdrawals
  },
  message: {
    color: "#000",
    marginTop: 2,
  },
  date: {
    color: "#666",
    fontSize: 12,
    marginTop: 4,
  },
});