<template>
  <div id="app" data-v-app="">
    <section class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <input
          class="new-todo"
          autofocus=""
          autocomplete="off"
          placeholder="What needs to be done?"
          v-model="newTodoRef"
          @keyup.enter="addTodo"
        />
      </header>
      <section class="main" v-show="todosRef.length > 0">
        <input
          id="toggle-all"
          class="toggle-all"
          type="checkbox"
          v-model="allDoneRef"
        />

        <!-- 上面input框的一种做法
          :checked="!checkedRef"
          @change="allDone($event.target.checked)"
         -->
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
          <li
            class="todo"
            :class="{
              completed: item.completed,
              editing: editingTodoRef === item,
            }"
            v-for="item in filteredTodosRef"
            :key="item.id"
          >
            <div class="view">
              <input class="toggle" type="checkbox" v-model="item.completed" />
              <label @dblclick="editTodo(item)">{{ item.title }}</label>
              <button class="destroy" @click="removeTodo(item)"></button>
            </div>
            <input
              class="edit"
              type="text"
              v-model="item.title"
              @blur="editDone(item)"
              @keyup.enter="editDone(item)"
              @keyup.escape="cancleEdit(item)"
            />
          </li>
        </ul>
      </section>
      <footer class="footer" v-show="todosRef.length > 0">
        <span class="todo-count">
          <strong>{{ remaingTodosRef }}</strong>
          <span>item{{ remaingTodosRef > 1 ? "s" : "" }} left</span>
        </span>
        <ul class="filters">
          <li>
            <a href="#/all" :class="{ selected: visibilityRef === 'all' }"
              >All</a
            >
          </li>
          <li>
            <a href="#/active" :class="{ selected: visibilityRef === 'active' }"
              >Active</a
            >
          </li>
          <li>
            <a
              href="#/completed"
              :class="{ selected: visibilityRef === 'completed' }"
              >Completed</a
            >
          </li>
        </ul>
        <button
          v-show="completedTodosRef > 0"
          class="clear-completed"
          style="display: none"
          @click="removeCompleted"
        >
          Clear completed
        </button>
      </footer>
    </section>
  </div>
</template>

<script>
import useTodoList from "./composition/useTodoList";
import useNewTodo from "./composition/useNewTodo";
import useFilter from "./composition/useFilter";
import useEditTodo from "./composition/useEditTodo";
import useRemoveTodo from "./composition/useRemoveTodo";

export default {
  setup() {
    const { todosRef } = useTodoList(); //调用返回对象解构出来

    return {
      todosRef,
      // ...useTodoList(),
      ...useNewTodo(todosRef),
      ...useFilter(todosRef),
      ...useEditTodo(todosRef),
      ...useRemoveTodo(todosRef),
    };
  },
};
</script>

<style>
</style>