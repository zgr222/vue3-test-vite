import { ref, computed } from 'vue'

export default function useEditTodo(todosRef) {
  const editingTodoRef = ref(null);  //当前修改的任务
  let originTitle = null;
  const editTodo = (todo) => {
    originTitle = todo.title;
    editingTodoRef.value = todo;
  }

  const editDone = (todo) => {
    editingTodoRef.value = null;
    const title = todo.title.trim();
    if (title) {
      todo.title = title;
    } else {
      const index = todosRef.value.indexOf(todo);
      index >= 0 && todosRef.value.splice(index, 1);
    }
  }

  const cancleEdit = (todo) => {
    todo.title = originTitle;
    editingTodoRef.value = null;
  }

  // 全选框，一种做法：
  // const allDone = (completed) => {
  //   todosRef.value.forEach(todo => {
  //     todo.completed = completed;
  //   });
  // }
  // const checkedRef = computed(() => {
  //   return todosRef.value.filter(it => !it.completed).length > 0;
  // });

  // 另一种做法：
  const allDoneRef = (computed({
    get() {
      return todosRef.value.filter((it) => !it.completed).length === 0;
    },
    set(checked) {
      todosRef.value.forEach(todo => {
        todo.completed = checked;
      });
    }
  }))

  return {
    editingTodoRef,
    editTodo,
    editDone,
    cancleEdit,
    // allDone,
    // checkedRef
    allDoneRef
  }
}