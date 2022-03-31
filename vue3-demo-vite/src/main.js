// import Vue from 'vue'  //vue2 的方式, vue3中只有具名导出
import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

// Vue2
// new Vue({
//   render: h => h(App)
// }).$mount('#app')
// console.log(Vue);  报错

// Vue3
// 不存在构造函数Vue
createApp(App).mount('#app')
