import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
  MaterialTopTabNavigationEventMap,
} from "@react-navigation/material-top-tabs";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { withLayoutContext } from "expo-router";
import React, { useRef, useCallback, useState } from "react";
import FloatButton from "@/components/fab/FloatButton";
import BottomSheet, { BottomSheetBackdrop, } from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import { Portal, Provider } from 'react-native-paper';
import Saving from "@/components/bottomSheets/Saving";
import Expanse from "@/components/bottomSheets/Expanse";
import { View, StyleSheet } from "react-native";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

const TabLayout = () => {

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
    (
      props: React.JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps
    ) => (
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
    <Provider>
      <MaterialTopTabs
        screenOptions={{
          tabBarActiveTintColor: "#131620",
          tabBarPressColor: "transparent",
        }}
      ></MaterialTopTabs>

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
          <View >
            <Saving />
          </View>
        </BottomSheet>
        <BottomSheet
          ref={expanseSheetRef}
          snapPoints={['60%']}
          index={-1}
          backdropComponent={renderBackdrop}
          enablePanDownToClose
          style={styles.bottomSheet}
          keyboardBehavior="extend"
        >
          <View >
            <Expanse />
          </View>
        </BottomSheet>
      </Portal>
    </Provider>
  );
};

const styles = StyleSheet.create({
  bottomSheet: {
    zIndex: 10,
  },
});

export default TabLayout;
