import { filter } from '../util/todoStorage';
import { ref, onMounted, onUnmounted, computed } from 'vue';

const validHash = ['all', 'active', 'completed'];
export default function useFilter(todosRef) {
  const visibilityRef = ref('all');

  const handleHashChange = () => {
    const hash = location.hash.replace(/#\/?/, '');
    if (validHash.includes(hash)) {
      visibilityRef.value = hash;
    } else {
      location.hash = '';
      visibilityRef.value = 'all';
    }
    // console.log('hash change', hash);
  }

  // 组件挂载完成的生命周期函数
  onMounted(() => {
    window.addEventListener('hashchange', handleHashChange)
  });

  // 组件销毁后的生命周期函数
  onUnmounted(() => {
    window.removeEventListener('hashchange', handleHashChange);
  });

  // 计算属性：返回的结果是用ref包装过后的
  // 对象若为一个对象，对象有set，get方法
  // 对象若为一个函数，则默认为get方法
  const filteredTodosRef = computed(() => {
    return filter(todosRef.value, visibilityRef.value);
  });

  const remaingTodosRef = computed(() => {
    return filter(todosRef.value, 'active').length;
  });

  const completedTodosRef = computed(() => {
    return filter(todosRef.value, 'completed').length;
  });

  return {
    visibilityRef,
    filteredTodosRef,
    remaingTodosRef,
    completedTodosRef
  }
}