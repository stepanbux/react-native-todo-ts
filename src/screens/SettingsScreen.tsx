import { signOut } from "firebase/auth";
import React, { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import { useAppSelector } from "../../store/redux-hooks";
import SettingItem from "../components/SettingItem/SettingItem";
import { TabScreenProps } from "../navigation/types";
import { auth } from "../utils/firebase";

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontFamily: "Montserrat_400Regular",
    fontWeight: "bold",
  },
  logOut: {
    backgroundColor: "white",
    margin: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "",
    height: 56,
    paddingLeft: 25,
    paddingRight: 17,
  },
});

const SettingsScreen = ({ navigation }: TabScreenProps) => {
  const color = useAppSelector((state) => state.mainReducer.color);

  const styleForLogOutBody = useMemo(() => {
    return { ...styles.logOut, borderColor: color };
  }, [color]);

  const onPressLogOut = () => {
    signOut(auth)
      .then(() => {
        console.log("succefull");
        navigation.navigate("SignIn");
      })
      .catch(() => {
        console.error();
      });
  };
  return (
    <View>
      <SettingItem title="Appearance" />
      <TouchableOpacity style={styleForLogOutBody} onPress={onPressLogOut}>
        <Text
          style={{
            ...styles.title,
            textDecorationLine: "underline",
          }}
        >
          Log Out
        </Text>
        <Icon name="logout" size={25} color={color} />
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;
