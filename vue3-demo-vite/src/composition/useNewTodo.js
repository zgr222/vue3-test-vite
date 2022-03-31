import { ref } from 'vue';
import { generateId } from '../util/todoStorage';

export default function useNewTodo(todosRef) {
  const newTodoRef = ref('')  //新任务的标题

  // 新增任务
  const addTodo = () => {
    const value = newTodoRef.value && newTodoRef.value.trim();
    if (!value) {
      return;
    }
    // console.log(newTodoRef.value);
    // 任务为一个对象, 加入到任务列表
    todosRef.value.push({
      id: generateId(),
      title: value,
      completed: false
    });
    newTodoRef.value = '';
  }

  return {
    newTodoRef,
    addTodo
  }
}