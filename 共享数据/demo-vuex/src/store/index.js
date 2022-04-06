import loginUser from './loginUser';
import { createStore, createLogger } from 'vuex';

// 没有vue3对应的调试工具，使用createLogger可查看日志变化 
// vue3 之后对应的vuex版本需要具名导出createStore
// https://vuex.vuejs.org/zh/guide/

export default createStore({
  modules: {
    loginUser,
  },
  plugins: [createLogger()]
})