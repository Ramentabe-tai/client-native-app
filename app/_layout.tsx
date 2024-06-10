import React, { useRef, useCallback } from "react";
import { Stack } from "expo-router";
import { Image, View, StyleSheet, Text } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FloatButton from "@/components/fab/FloatButton";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import { Portal, Provider } from 'react-native-paper';

const queryClient = new QueryClient();

export default function RootLayout() {
  const bottomSheetRef = useRef<BottomSheetMethods>(null);

  const handleOpenBottomSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const renderBackdrop = useCallback(
    (props: React.JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={1}
        opacity={0.5}
        onPress={() => bottomSheetRef.current?.close()}
      />
    ),
    []
  );

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Provider>
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
                headerTitle: () => null,
                headerTitleAlign: "center",
              }}
            />
            <Stack.Screen name='error' options={{ headerTitle: "Error", headerTitleAlign: "center" }} />
          </Stack>
          <FloatButton onOpenBottomSheet={handleOpenBottomSheet} onOpenSecondAction={() => {
            console.log("Second action triggered");
          }} />
          <Portal>
            <BottomSheet
              ref={bottomSheetRef}
              snapPoints={['50%']}
              index={-1} // Initial state should be closed
              backdropComponent={renderBackdrop}
              enablePanDownToClose
              style={styles.bottomSheet}
            >
              <View style={styles.bottomSheetContent}>
                <Text>Input content goes here</Text>
              </View>
            </BottomSheet>
          </Portal>
        </Provider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  bottomSheet: {
    zIndex: 10, // Ensure the modal is above the floating button
  },
  bottomSheetContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
