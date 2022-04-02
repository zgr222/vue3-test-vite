import { reactive, ref, watchEffect } from "vue";

const state = reactive({ a: 1, b: 2 });
const count = ref(0);

// watchEffect 
// 一开始就同步执行代码，
// 之后响应式数据变化，放进微队列执行
watchEffect(() => {
  console.log(state.a, count.value);
});

state.a++;
state.a++;
state.a++;
state.a++;
state.a++;
count.value++;
count.value++;
count.value++;
count.value++;

// 输出结果：
// 1, 0
// 6, 4
