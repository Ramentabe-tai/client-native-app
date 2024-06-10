import React from "react";
import { View, Text, FlatList } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getMoviesFromApiAsync } from "@/app/api/example";
import btcData from "@/app/api/btc.json";

export default function Transactions() {
    const { isPending, error, data } = useQuery({
        queryKey: ["movies"],
        queryFn: getMoviesFromApiAsync,
    });

    // Handle loading state
    if (isPending) {
        return <Text>Loading analytics...</Text>;
    }

    // Handle errors gracefully
    if (error) {
        return <Text>Error fetching analytics: {error.message}</Text>;
    }

    // Extract movies from the data
    const movies = data?.movies || [];

    return (
        <View style={{ height: 300 }}>
            <Text>Transactions:</Text>
            <FlatList
                data={movies}
                keyExtractor={(item) => item.id} // Unique key for each movie
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={{ padding: 10, backgroundColor: "#fff", marginHorizontal: 10, marginBottom: 5, borderRadius: 10, }}>
                        <Text>Title: {item.title}</Text>
                        <Text>Release Year: {item.releaseYear}</Text>
                    </View>
                )}
            />

            {/* <Text>Bitcoin Price History:</Text>
            <FlatList
                data={btcData}
                keyExtractor={(item) => item.timestamp} // Unique key for each entry
                renderItem={({ item }) => (
                    <View style={{ padding: 10, backgroundColor: "#fff", margin: 3 }}>
                        <Text>Timestamp: {item.timestamp}</Text>
                        <Text>Price: ${item.price.toFixed(2)}</Text>
                        <Text>Volume (24h): {item.volume_24h.toLocaleString()}</Text>
                        <Text>Market Cap: ${item.market_cap.toLocaleString()}</Text>
                    </View>
                )}
            /> */}
        </View>
    );
}