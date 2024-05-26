import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
  MaterialTopTabNavigationEventMap,
} from "@react-navigation/material-top-tabs";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { withLayoutContext } from "expo-router";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

const TabLayout = () => {
  return (
    <MaterialTopTabs
      screenOptions={{
        tabBarActiveTintColor: "#131620",
        tabBarPressColor: "transparent",
      }}
    ></MaterialTopTabs>
  );
};

export default TabLayout;
