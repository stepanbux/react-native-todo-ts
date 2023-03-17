import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "white",
    margin: 15,
    marginBottom: 0,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 56,
    paddingLeft: 25,
    paddingRight: 18,
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontFamily: "Montserrat_400Regular",
    fontWeight: "bold",
  },
  child: {
    marginTop: 10,
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
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
    height: 56,
    paddingLeft: 25,
    paddingRight: 17,
  },
});
