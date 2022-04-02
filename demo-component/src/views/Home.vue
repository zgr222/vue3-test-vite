<template>
  <div class="container">
    <div class="block">
      <h2>区域1</h2>
      <p>
        <button @click="modalVisible = true">打开朦层</button>
      </p>
      <Teleport to="body">
        <Modal v-if="modalVisible">
          <button @click="modalVisible = false">关闭朦层</button>
        </Modal>
      </Teleport>
    </div>
    <div class="block mid">
      <h2>区域2</h2>
    </div>
    <div class="block big"><Block3 /></div>
    <div class="block big"><h2>区域4</h2></div>
    <div class="block mid"><Block5 /></div>
    <div class="block"><h2>区域6</h2></div>
  </div>
</template>

<script>
// import { defineAsyncComponent, h } from "vue";
// import { delay } from "../util";
// import Loading from "../components/Loading.vue";
// import Error from "../components/Error.vue";

// // 将Block3， Block5变成异步组件
// // defineAsyncComponent 参数为一个函数或者是一个对象，函数要求返回一个promise
// // 动态的import 就是一个promise
// // 为对象时，和vue2差不多，component改成了loader

// // const Block3 = defineAsyncComponent(() => import("../components/Block3.vue"));
// const Block3 = defineAsyncComponent({
//   // loader: () => import("../components/Block3.vue"), //开发中就这样做
//   // 测试异步组件，加个delay方法
//   loader: async () => {
//     await delay();
//     if (Math.random() < 0.5) {
//       // 模拟组件加载错误
//       throw new TypeError();
//     }
//     const comp = import("../components/Block3.vue");
//     return comp;
//   },
//   loadingComponent: Loading, //当promise在pending状态，将显示这里的组件
//   errorComponent: {
//     // 当promise在reject状态 (组件加载失败)，将显示这里的组件
//     render() {
//       return h(Error, "出错了！！！");
//     },
//   },
// });

// 最后，将其抽离为一个方法

import { getAsyncComponent } from "../util";
import Modal from "../components/Modal.vue";
import { ref } from "vue";
const Block3 = getAsyncComponent("../components/Block3.vue");
const Block5 = getAsyncComponent("../components/Block5.vue");
export default {
  components: {
    Block3,
    Block5,
    Modal,
  },
  setup() {
    const modalVisibleRef = ref(false);
    return {
      modalVisible: modalVisibleRef,
    };
  },
};
</script>

<style scoped>
.container {
  display: flex;
  width: 1000px;
  margin: 0 auto;
  flex-wrap: wrap;
  padding: 0 50px;
  justify-content: space-between;
}
.block {
  width: 200px;
  margin: 15px;
  height: 250px;
  border: 1px solid;
  border-radius: 3px;
  box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
    0 2px 4px 0 rgba(232, 237, 250, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.mid {
  width: 300px;
}
.big {
  width: 400px;
}
</style>