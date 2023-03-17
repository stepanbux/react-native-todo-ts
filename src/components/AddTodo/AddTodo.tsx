import React, { useCallback, useMemo, useState } from "react";
import {
  View,
  TextInput,
  Alert,
  Pressable,
  Text,
  Keyboard,
} from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts, Montserrat_400Regular } from "@expo-google-fonts/montserrat";
import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { setTodos } from "../../../store/slice";
import db from "../../utils/firebase";
import { useAppDispatch, useAppSelector } from "../../../store/redux-hooks";
import { TouchableWithoutFeedback } from "react-native";
import { setNewTodos } from "../../hooks/setNewTodos";
import { styles } from "./Styles";

const AddTodo: React.FC = () => {
  const userId = useAppSelector((state) => state.mainReducer.id);
  const color = useAppSelector((state) => state.mainReducer.color);
  const dispatch = useAppDispatch();
  const [value, setValue] = useState("");

  const styleForAddButton = useMemo(() => {
    return { ...styles.button, backgroundColor: color };
  }, [color]);

  const styleForInput = useMemo(() => {
    return { ...styles.input, borderColor: color };
  }, [color]);

  const pressButton = async () => {
    if (value.trim()) {
      const docRef = doc(db, "users", userId);
      await updateDoc(docRef, {
        todos: arrayUnion(value),
      });
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const array: string[] = docSnap.data().todos;
        dispatch(setTodos(setNewTodos(array)));
      }
      setValue("");
    } else {
      Alert.alert("Name of business must not be empty");
    }
    Keyboard.dismiss();
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.addTodo}>
        <TextInput
          onChangeText={setValue}
          value={value}
          placeholder="Enter the name of business"
          style={styleForInput}
          autoCorrect={false}
        />
        <Pressable
          style={styleForAddButton}
          onPress={pressButton}
          onLayout={onLayoutRootView}
        >
          <Text style={styles.text}>Add</Text>
        </Pressable>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AddTodo;
