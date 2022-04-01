
export default function useRemoveTodo(todosRef) {
  const removeTodo = (todo) => {
    const index = todosRef.value.indexOf(todo);
    index >= 0 && todosRef.value.splice(index, 1);
  }

  const removeCompleted = () => {
    todosRef.value = todosRef.value.filter((todo) => !todo.completed);
  }

  return {
    removeTodo,
    removeCompleted
  }
}