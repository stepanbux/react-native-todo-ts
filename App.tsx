import React from "react";
import { StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import MainNavigator from "./src/navigation/MainNavigator";
import "./src/utils/firebase";
import Navbar from "./src/components/Navbar/Navbar";
import store from "./store/store";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Navbar title="Todo App" />
        <MainNavigator />
      </View>
    </Provider>
  );
}
