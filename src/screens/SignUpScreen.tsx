import React from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Form from "../components/Form/Form";
import { setColor, setTodos, setUser } from "../../store/slice";
import db, { auth } from "../utils/firebase";
import { useAppDispatch } from "../../store/redux-hooks";
import { SignUpScreenProps } from "../navigation/types";

const SignUpScreen = ({ navigation }: SignUpScreenProps) => {
  const dispatch = useAppDispatch();
  const pressSignUp = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password).then(
      async ({ user }) => {
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
      }
    );
  };

  return (
    <Form
      handleClick={pressSignUp}
      buttonType="Sign Up"
      signText="Already have an account?"
      navigation={navigation}
    />
  );
};

export default SignUpScreen;
