import React, { useCallback, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { StyleSheet, Text } from "react-native";
import Form from "../components/Form/Form";
import { setColor, setTodos, setUser } from "../../store/slice";
import db, { auth } from "../utils/firebase";
import { useAppDispatch } from "../../store/redux-hooks";
import { SignInScreenProps } from "../navigation/types";
import { setNewTodos } from "../hooks/setNewTodos";

const styles = StyleSheet.create({
  errorText: {
    position: "absolute",
    left: "11%",
    top: "26%",
    color: "red",
  },
});

const SignInScreen = ({ navigation }: SignInScreenProps) => {
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useAppDispatch();

  const hideErrorMessage = useCallback(() => {
    setErrorMessage("");
  }, []);

  const pressSignIn = useCallback(
    async (email: string, password: string) => {
      await signInWithEmailAndPassword(auth, email, password)
        .then(async ({ user }) => {
          dispatch(setUser(user.uid));

          const docTodo = await getDoc(doc(db, "users", user.uid));
          if (docTodo.exists()) {
            const array: string[] = docTodo.data().todos;
            const newArray = setNewTodos(array);
            dispatch(setTodos(newArray));
            dispatch(setColor(docTodo.data().color));
          } else console.log("don't exist");

          setErrorMessage("");
          navigation.navigate("Tab");
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/wrong-password":
              setErrorMessage("Wrong password");
              break;

            case "auth/invalid-email":
              setErrorMessage("Invalid email");
              break;

            case "auth/user-not-found":
              setErrorMessage("User not found");
              break;

            default:
              setErrorMessage(error.code);
          }
        });
    },
    [dispatch, navigation]
  );

  return (
    <>
      <Text style={styles.errorText}>{errorMessage}</Text>
      <Form
        handleClick={pressSignIn}
        buttonType="Sign In"
        signText="Do not have an account?"
        navigation={navigation}
        hideErrorMessage={hideErrorMessage}
      />
    </>
  );
};

export default SignInScreen;
