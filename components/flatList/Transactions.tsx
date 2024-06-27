import React from "react";
import { View, Text, FlatList } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "@/app/api/analytics";

export default function Transactions() {
  const { isPending, error, data } = useQuery({
    queryKey: ["movies"],
    queryFn: getTransactions,
  });

  // Handle loading state
  if (isPending) {
    return <Text>Loading analytics...</Text>;
  }

  if (error) {
    return <Text>Error fetching analytics: {error.message}</Text>;
  }

  // Extract movies from the data
  const movies = data?.movies || [];

  return (
    <View style={{ height: '35%' }}>
      <Text
        style={{
          fontSize: 16,
          textAlign: "center",
          fontWeight: "bold",
          marginBottom: 16,
        }}
      >
        支出の詳細
      </Text>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id} // Unique key for each movie
        showsVerticalScrollIndicator={false}

        renderItem={({ item }) => (
          <View
            style={{
              padding: 16,
              backgroundColor: "#fff",
              marginHorizontal: 16,
              marginBottom: 8,
              borderRadius: 10,
            }}
          >
            <Text style={{ color: "#000", fontWeight: "bold" }}>
              Title: {item.title}
            </Text>
            <Text style={{ color: "#000" }}>
              Release Year: {item.releaseYear}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
