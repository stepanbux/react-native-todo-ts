import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Navigator from "./stack/Stack";

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  );
};

export default MainNavigator;
