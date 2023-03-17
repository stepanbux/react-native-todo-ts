import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Icon } from "react-native-elements";
import { useAppSelector } from "../../../store/redux-hooks";
import HomeScreen from "../../screens/HomeScreen";
import SettingsScreen from "../../screens/SettingsScreen";
import { RootTabParamList } from "../types";

const TabBottom = () => {
  const color = useAppSelector((state) => state.mainReducer.color);

  const Tab = createBottomTabNavigator<RootTabParamList>();

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Icon
                name="ios-clipboard"
                size={30}
                type="ionicon"
                color={color}
              />
            ) : (
              <Icon
                name="ios-clipboard-outline"
                size={30}
                type="ionicon"
                color={color}
              />
            ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Icon
                name="md-settings-sharp"
                size={30}
                type="ionicon"
                color={color}
              />
            ) : (
              <Icon
                name="md-settings-outline"
                size={30}
                type="ionicon"
                color={color}
              />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabBottom;
