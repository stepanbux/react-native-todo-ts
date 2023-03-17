import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  form: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  inputArea: {
    marginTop: "15%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    height: 80,
  },
  input: {
    paddingLeft: 10,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    width: "80%",
    height: 30,
    fontSize: 20,
    fontFamily: "Montserrat_400Regular",
    letterSpacing: 0.25,
    color: "black",
  },
  button: {
    marginTop: 20,
    width: "30%",
    height: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  text: {
    fontSize: 20,
    fontFamily: "Montserrat_400Regular",
    letterSpacing: 0.25,
    color: "#ffff",
  },
  signUp: {
    marginTop: 20,
    width: "70%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
});
