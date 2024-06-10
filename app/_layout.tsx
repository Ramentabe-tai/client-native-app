import React, { useRef, useCallback, useState } from "react";
import { Stack } from "expo-router";
import { Image, View, StyleSheet, Text } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FloatButton from "@/components/fab/FloatButton";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import { Portal, Provider } from 'react-native-paper';
import Saving from "@/components/bottomSheets/Saving";
import Expanse from "@/components/bottomSheets/Expanse";

const queryClient = new QueryClient();

export default function RootLayout() {
  const [isOpened, setIsOpened] = useState(false);

  const savingSheetRef = useRef<BottomSheetMethods>(null);
  const expanseSheetRef = useRef<BottomSheetMethods>(null);

  const handleOpenSavingSheet = useCallback(() => {
    savingSheetRef.current?.expand();
  }, []);

  const handleOpenExpanseSheet = useCallback(() => {
    expanseSheetRef.current?.expand();
  }, []);

  const renderBackdrop = useCallback(
    (props: React.JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={1}
        opacity={0.5}
        onPress={() => {
          savingSheetRef.current?.close();
          expanseSheetRef.current?.close();
        }}
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
          <FloatButton
            onOpenSavingAction={handleOpenSavingSheet}
            onOpenExpanseAction={handleOpenExpanseSheet}
            setIsOpened={setIsOpened}
            isOpened={isOpened}
          />
          <Portal>
            <BottomSheet
              ref={savingSheetRef}
              snapPoints={['50%']}
              index={-1}
              backdropComponent={renderBackdrop}
              enablePanDownToClose
              style={styles.bottomSheet}
            >
              <View style={styles.bottomSheetContent}>
                <Saving />
              </View>
            </BottomSheet>
            <BottomSheet
              ref={expanseSheetRef}
              snapPoints={['50%']}
              index={-1}
              backdropComponent={renderBackdrop}
              enablePanDownToClose
              style={styles.bottomSheet}
            >
              <View style={styles.bottomSheetContent}>
                <Expanse />
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
