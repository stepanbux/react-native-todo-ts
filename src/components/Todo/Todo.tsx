import React, { FC, useCallback, useMemo } from "react";
import { Text, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts, Montserrat_400Regular } from "@expo-google-fonts/montserrat";
import { IconButton } from "react-native-paper";
import { useAppSelector } from "../../../store/redux-hooks";
import { styles } from "./Styles";

interface Props {
  title: string;
  id: number;
  removeTodo: (id: number) => Promise<void>;
}

const Todo: FC<Props> = ({ title, id, removeTodo }) => {
  const color = useAppSelector((state) => state.mainReducer.color);

  const styleForTodoText = useMemo(() => {
    return { width: 300, fontFamily: "Montserrat_400Regular", fontSize: 16 };
  }, []);

  const styleForTodoBody = useMemo(() => {
    return { ...styles.todo, borderColor: color };
  }, [color]);

  const hadlecClickRemove = useCallback(() => {
    removeTodo(id);
  }, [id, removeTodo]);

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
    <View style={styleForTodoBody} onLayout={onLayoutRootView}>
      <Text style={styleForTodoText}>{title}</Text>
      <IconButton
        icon="delete-outline"
        iconColor={color}
        size={30}
        onPress={hadlecClickRemove}
      />
    </View>
  );
};

export default Todo;
