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
import { View, StyleSheet, Image } from "react-native";

const coinsImg = require('@/assets/images/coins.png')
const expenseImg = require('@/assets/images/expense.png')
const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

const TabLayout = () => {

  const [isBottomSheetOpened, setIsbottomSheetOpened] = useState(false);

  const [isSavingModalVisible, setIsSavingModalVisible] = useState(false);
  const [isExpanseModalVisible, setIsExpanseModalVisible] = useState(false);

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
          tabBarIndicatorStyle: {
            backgroundColor: "#F48E35", // Replace with your desired color
          },
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
          snapPoints={['65%']}
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
          <View style={styles.underline}>
            <Image source={coinsImg} style={styles.image} />
            <Text style={styles.text}>￥10,000円入金されました!</Text>
          </View>
          <Button onPress={closeSavingModal} style={styles.button} mode="contained">確認</Button>
        </Modal>
        <Modal visible={isExpanseModalVisible} onDismiss={closeExpanseModal} contentContainerStyle={styles.modal}>
          <View style={styles.underline}>
            <Image source={expenseImg} style={styles.image} />
            <Text style={styles.text}>￥10,000円出金されました!</Text>
          </View>
          <Button onPress={closeExpanseModal} style={styles.button} mode="contained">確認</Button>
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
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  button: {
    marginTop: 40,
    backgroundColor: '#F48E35',
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  underline: {
    borderBottomWidth: 2,
    borderBottomColor: '#F48E35',
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default TabLayout;
