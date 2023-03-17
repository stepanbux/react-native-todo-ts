import React, { FC, useCallback } from "react";
import { View, Text } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts, Montserrat_400Regular } from "@expo-google-fonts/montserrat";
import { useAppSelector } from "../../../store/redux-hooks";
import { styles } from "./Styles";

SplashScreen.preventAutoHideAsync();

interface Props {
  title: string;
}

const Navbar: FC<Props> = ({ title }) => {
  const color = useAppSelector((state) => state.mainReducer.color);

  const navbarColor = { ...styles.navbar, backgroundColor: color };

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={navbarColor} onLayout={onLayoutRootView}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

export default Navbar;
