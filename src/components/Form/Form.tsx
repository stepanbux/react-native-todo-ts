import React, { FC, useCallback, useMemo, useState } from "react";
import {
  Pressable,
  TextInput,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts, Montserrat_400Regular } from "@expo-google-fonts/montserrat";
import { useAppSelector } from "../../../store/redux-hooks";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";
import { styles } from "./Styles";

interface Props {
  buttonType: string;
  signText: string;
  handleClick: (email: string, password: string) => void;
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    keyof RootStackParamList
  >;
  hideErrorMessage: () => void;
}

const Form: FC<Props> = ({
  handleClick,
  buttonType,
  signText,
  navigation,
  hideErrorMessage,
}) => {
  const color = useAppSelector((state) => state.mainReducer.color);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isButtonType = buttonType === "Sign In";

  const styleForLogoText = useMemo(() => {
    return {
      ...styles.text,
      marginTop: "15%",
      color: "black",
      fontSize: 30,
      width: 108,
    };
  }, []);

  const onPressButton = useCallback(() => {
    handleClick(email, password);
    Keyboard.dismiss();
    hideErrorMessage();
  }, [email, handleClick, hideErrorMessage, password]);

  const onPressSign = useCallback(() => {
    setEmail("");
    setPassword("");
    isButtonType
      ? navigation.navigate("SignUp")
      : navigation.navigate("SignIn");
    Keyboard.dismiss();
    hideErrorMessage();
  }, [hideErrorMessage, isButtonType, navigation]);

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
      <View style={styles.form} onLayout={onLayoutRootView}>
        <Text style={styleForLogoText}>dream. plan. do.</Text>
        <View style={styles.inputArea}>
          <TextInput
            keyboardType="email-address"
            textContentType="emailAddress"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            autoCorrect={false}
            style={styles.input}
            placeholder="Email"
          />
          <TextInput
            secureTextEntry
            autoCapitalize="none"
            value={password}
            onChangeText={setPassword}
            autoCorrect={false}
            style={styles.input}
            placeholder="Password"
          />
        </View>
        <Pressable style={{ ...styles.button, backgroundColor: color }}>
          <Text style={styles.text} onPress={onPressButton}>
            {buttonType}
          </Text>
        </Pressable>
        <View style={styles.signUp}>
          <Text
            style={{
              ...styles.text,
              fontSize: 16,
              color: "gray",
            }}
          >
            {signText}
          </Text>
          <Pressable onPress={onPressSign}>
            <Text
              style={{
                ...styles.text,
                fontSize: 16,
                color,
                fontWeight: "bold",
                textDecorationLine: "underline",
              }}
            >
              {isButtonType ? "Sign up" : "Sign in"}
            </Text>
          </Pressable>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Form;
