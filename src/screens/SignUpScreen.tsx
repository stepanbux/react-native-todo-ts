import React, { useCallback, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Form from "../components/Form/Form";
import { setColor, setTodos, setUser } from "../../store/slice";
import db, { auth } from "../utils/firebase";
import { useAppDispatch } from "../../store/redux-hooks";
import { SignUpScreenProps } from "../navigation/types";
import { StyleSheet, Text } from "react-native";

const styles = StyleSheet.create({
  errorText: {
    position: "absolute",
    left: "11%",
    top: "26%",
    color: "red",
  },
});

const SignUpScreen = ({ navigation }: SignUpScreenProps) => {
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useAppDispatch();

  const hideErrorMessage = useCallback(() => {
    setErrorMessage("");
  }, []);

  const pressSignUp = useCallback(
    async (email: string, password: string) => {
      await createUserWithEmailAndPassword(auth, email, password)
        .then(async ({ user }) => {
          dispatch(setUser(user.uid));
          await setDoc(doc(db, "users", user.uid), {
            color: "#3949ab",
            todos: [],
          }).then(async () => {
            dispatch(setTodos([]));
            const docTodo = await getDoc(doc(db, "users", user.uid));
            if (docTodo.exists()) {
              dispatch(setColor(docTodo.data().color));
            }
          });
          navigation.navigate("Tab");
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/email-already-in-use":
              setErrorMessage("Email already in use");
              break;

            case "auth/invalid-email":
              setErrorMessage("Invalid email");
              break;

            default:
              break;
          }
        });
    },
    [dispatch, navigation]
  );

  return (
    <>
      <Text style={styles.errorText}>{errorMessage}</Text>
      <Form
        handleClick={pressSignUp}
        buttonType="Sign Up"
        signText="Already have an account?"
        navigation={navigation}
        hideErrorMessage={hideErrorMessage}
      />
    </>
  );
};

export default SignUpScreen;
