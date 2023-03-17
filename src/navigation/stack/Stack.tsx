import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabBottom from "../tabs/TabButtom";
import SignInScreen from "../../screens/SignInScreen";
import SignUpScreen from "../../screens/SignUpScreen";
import { RootStackParamList } from "../types";

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Tab" component={TabBottom} />
    </Stack.Navigator>
  );
};

export default Navigator;
