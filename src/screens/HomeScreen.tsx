import { arrayRemove, doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useCallback } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { useAppDispatch, useAppSelector } from "../../store/redux-hooks";
import { setTodos } from "../../store/slice";
import AddTodo from "../components/AddTodo/AddTodo";
import Todo from "../components/Todo/Todo";
import { setNewTodos } from "../hooks/setNewTodos";
import { TodoType } from "../types/data";
import db from "../utils/firebase";

const styles = StyleSheet.create({
  container: {
    height: "95%",
  },
  content: {
    padding: 10,
  },
});

const HomeScreen: React.FC = () => {
  const userId = useAppSelector((state) => state.mainReducer.id);
  const todos: Array<TodoType> = useAppSelector(
    (state) => state.mainReducer.todos
  );
  const dispatch = useAppDispatch();

  const deleteTodo = useCallback(
    (id: number) => todos.filter((todo) => todo.id === id),
    [todos]
  );

  const removeTodo = useCallback(
    async (id: number) => {
      const docRef = doc(db, "users", userId);
      const remoteTodo: string = deleteTodo(id)[0].title;

      await updateDoc(docRef, {
        todos: arrayRemove(remoteTodo),
      });
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const array = docSnap.data().todos;
        dispatch(setTodos(setNewTodos(array)));
      }
    },
    [deleteTodo, dispatch, userId]
  );

  return (
    <View style={styles.content}>
      <AddTodo />
      <FlatList
        style={styles.container}
        data={todos}
        renderItem={({ item }) => (
          <Todo title={item.title} id={item.id} removeTodo={removeTodo} />
        )}
      />
    </View>
  );
};

export default HomeScreen;
