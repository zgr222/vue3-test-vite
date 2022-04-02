import { defineAsyncComponent, h } from "vue";
import Loading from "../components/Loading.vue";
import Error from "../components/Error.vue";
import 'nprogress/nprogress.css';
import NProgress from "nprogress";

// 第三方进度条 https://github.com/rstacruz/nprogress
NProgress.configure({
  trickleSpeed: 50,
  showSpinner: false
})


function randomTime(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function delay(duration) {
  if (!duration) {
    duration = randomTime(1000, 4000)
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, duration);
  })
}

// 得到一个异步组件
export function getAsyncComponent(path) {
  // 将Block3， Block5变成异步组件
  // defineAsyncComponent 参数为一个函数或者是一个对象，函数要求返回一个promise
  // 动态的import 就是一个promise
  // 为对象时，和vue2差不多，component改成了loader

  // const Block3 = defineAsyncComponent(() => import("../components/Block3.vue"));
  return defineAsyncComponent({
    // loader: () => import("../components/Block3.vue"), //开发中就这样做
    // 测试异步组件，加个delay方法
    loader: async () => {
      await delay();
      if (Math.random() < 0.5) {
        // 模拟组件加载错误
        throw new TypeError();
      }
      const comp = import(path);
      return comp;
    },
    loadingComponent: Loading, //当promise在pending状态，将显示这里的组件
    errorComponent: {
      // 当promise在reject状态 (组件加载失败)，将显示这里的组件
      render() {
        return h(Error, "出错了！！！");
      },
    },
  });
}

// 同理，得到一个异步页面 (在导航中使用)
export function getAsyncPage(path) {
  return defineAsyncComponent({
    loader: async () => {
      NProgress.start();
      await delay();
      const comp = import(path);
      NProgress.done();
      return comp;
    },
    loadingComponent: Loading, //当promise在pending状态，将显示这里的组件
  });
}