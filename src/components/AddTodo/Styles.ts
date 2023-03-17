import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  addTodo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  input: {
    width: "70%",
    padding: 10,
    borderStyle: "solid",
    fontFamily: "Montserrat_400Regular",
    borderBottomWidth: 2,
  },
  button: {
    height: 30,
    borderRadius: 15,
    width: "25%",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontFamily: "Montserrat_400Regular",
    letterSpacing: 0.25,
    color: "#ffff",
  },
});
