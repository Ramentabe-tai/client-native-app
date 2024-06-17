import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
  MaterialTopTabNavigationEventMap,
} from "@react-navigation/material-top-tabs";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { withLayoutContext } from "expo-router";
import React, { useRef, useCallback, useState } from "react";
import FloatButton from "@/components/fab/FloatButton";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import { Portal, Provider, Modal, Text, Button } from 'react-native-paper';
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

  const [isBottomSheetOpened, setIsbottomSheetOpened] = useState(false);
  const [isSavingModalVisible, setIsSavingModalVisible] = useState(false); // State for Saving modal visibility
  const [isExpanseModalVisible, setIsExpanseModalVisible] = useState(false); // State for Expanse modal visibility


  const savingSheetRef = useRef<BottomSheetMethods>(null);
  const expanseSheetRef = useRef<BottomSheetMethods>(null);

  const handleOpenSavingSheet = useCallback(() => {
    savingSheetRef.current?.expand();
  }, []);

  const handleOpenExpanseSheet = useCallback(() => {
    expanseSheetRef.current?.expand();
  }, []);

  const handleSaveAction = useCallback(() => {
    savingSheetRef.current?.close();
    setIsSavingModalVisible(true);
  }, []);

  const handleExpanseSaveAction = useCallback(() => {
    expanseSheetRef.current?.close();
    setIsExpanseModalVisible(true);
  }, []);

  const closeSavingModal = useCallback(() => {
    setIsSavingModalVisible(false);
  }, []);

  const closeExpanseModal = useCallback(() => {
    setIsExpanseModalVisible(false);
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
        setIsOpened={setIsbottomSheetOpened}
        isOpened={isBottomSheetOpened}
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
            <Saving onSavingSubmitted={handleSaveAction} />
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
            <Expanse onExpanseSubmitted={handleExpanseSaveAction} />
          </View>
        </BottomSheet>
        <Modal visible={isSavingModalVisible} onDismiss={closeSavingModal} contentContainerStyle={styles.modal}>
          <Text>Saving Data...</Text>
          <Button onPress={closeSavingModal}>Close</Button>
        </Modal>
        <Modal visible={isExpanseModalVisible} onDismiss={closeExpanseModal} contentContainerStyle={styles.modal}>
          <Text>Expanse Data...</Text>
          <Button onPress={closeExpanseModal}>Close</Button>
        </Modal>
      </Portal>
    </Provider>
  );
};

const styles = StyleSheet.create({
  bottomSheet: {
    zIndex: 10,
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
});

export default TabLayout;
