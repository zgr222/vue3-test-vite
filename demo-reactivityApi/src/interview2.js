
/*
function useUser(){
  // 在这里补全函数
  return {
    user, // 这是一个只读的用户对象，响应式数据，默认为一个空对象
    setUserName, // 这是一个函数，传入用户姓名，用于修改用户的名称
    setUserAge, // 这是一个函数，传入用户年龄，用户修改用户的年龄
  }
}
*/

import { readonly, reactive } from 'vue';

function useUser() {
  const userOrigin = reactive({});
  const user = readonly(userOrigin);
  const setUserName = (name) => {
    userOrigin.name = name;
  }
  const setUserAge = (age) => {
    userOrigin.age = age;
  }
  return {
    user,
    setUserName,
    setUserAge
  }
}


const { user, setUserName, setUserAge } = useUser();

console.log(user);
setUserName('alex');
setUserAge(18);
console.log(user);