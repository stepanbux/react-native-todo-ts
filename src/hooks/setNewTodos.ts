export const setNewTodos = (array: string[]) => {
  return array.map((item, index) => {
    return { id: index, title: item };
  });
};
