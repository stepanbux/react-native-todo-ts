import React, { FC, useCallback, useMemo, useState } from "react";
import { LayoutAnimation, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import * as SplashScreen from "expo-splash-screen";
import { useFonts, Montserrat_400Regular } from "@expo-google-fonts/montserrat";
import { IconButton } from "react-native-paper";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { setColor } from "../../../store/slice";
import db from "../../utils/firebase";
import { useAppDispatch, useAppSelector } from "../../../store/redux-hooks";
import { styles } from "./Styles";

SplashScreen.preventAutoHideAsync();

interface Props {
  title: string;
}

const SettingItem: FC<Props> = ({ title }) => {
  const color = useAppSelector((state) => state.mainReducer.color);
  const userId = useAppSelector((state) => state.mainReducer.id);
  const dispatch = useAppDispatch();
  const [isExpanded, setIsExpanded] = useState(false);

  const styleForSettingItem = useMemo(() => {
    return { ...styles.wrapper, borderColor: color };
  }, [color]);

  const colorsArray = useMemo(
    () =>
      [
        { color: "#3949ab", condition: false, id: 1 },
        { color: "#2FC72F", condition: false, id: 2 },
        { color: "#239696", condition: false, id: 3 },
        { color: "#F93A3A", condition: false, id: 4 },
        { color: "#A226A2", condition: false, id: 5 },
      ].map((item) => {
        if (item.color === color) {
          item.condition = true;
        }
        return item;
      }),
    [color]
  );

  const changeColor = useCallback(
    (newColor: string) => async () => {
      const docRef = doc(db, "users", userId);
      await updateDoc(docRef, {
        color: newColor,
      });
      const docTodo = await getDoc(docRef);
      if (docTodo.exists()) {
        dispatch(setColor(docTodo.data().color));
      }
    },
    [dispatch, userId]
  );

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded((prev) => !prev);
  };
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
    <View onLayout={onLayoutRootView}>
      <TouchableOpacity style={styleForSettingItem} onPress={toggleExpand}>
        <Text style={styles.title}>{title}</Text>
        <Icon
          name={isExpanded ? "keyboard-arrow-up" : "keyboard-arrow-down"}
          size={30}
          color={color}
        />
      </TouchableOpacity>
      {isExpanded && (
        <View style={styles.child}>
          {colorsArray.map((item) => (
            <IconButton
              key={item.id}
              icon={
                item.condition
                  ? "checkbox-blank-circle-outline"
                  : "checkbox-blank-circle"
              }
              iconColor={item.color}
              size={35}
              onPress={changeColor(item.color)}
            />
          ))}
        </View>
      )}
    </View>
  );
};

export default SettingItem;
