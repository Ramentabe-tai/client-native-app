import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { Image } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShadowVisible: false }}>
        <Stack.Screen
          name='(tabs)'
          options={{
            headerLeft: () => (
              <Image
                source={{
                  uri: "https://images.pexels.com/photos/23483902/pexels-photo-23483902/free-photo-of-a-woman-in-a-white-shirt-and-brown-boots-standing-in-a-field.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                }}
                style={{ width: 30, height: 30, borderRadius: 20 }}
              />
            ),
            headerRight: () => <Ionicons name='settings-outline' size={24} color='black' />,

            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen name='error' options={{ headerTitle: "Error", headerTitleAlign: "center" }} />
      </Stack>
    </QueryClientProvider>
  );
}
