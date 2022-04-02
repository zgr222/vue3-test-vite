import { getAsyncPage } from '../util'

// import Home from '../views/Home.vue'
// import About from '../views/About.vue'

const Home = getAsyncPage('../views/Home.vue');
const About = getAsyncPage('../views/About.vue');

export default [
  { path: '/', component: Home },
  { path: '/about', component: About },
]