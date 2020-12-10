# simple-create-vues
方便快捷的建立vue简单文件结构 生成router文件 提高效率和代码的可读性 方便维护
生成的文件目录结构如下
#### type 
 #####1. page

    ├── test
     └── index.vue
     └── router.ts
     └── script.ts
     └── style.scss
     
 #####2. component
 
     ├── test
      └── index.vue
      └── script.ts
      └── style.scss
      
##安装
npm i -g simple-create-vues
##运行
1. create-vue3 直接创建 根据提示选择或者输入
2. create-vue3 -f 文件名称 -t 类型(page/component) -p 文件夹路径 
3. create-vue3 -t 类型(page/component) -p 文件夹路径 
    指定文件夹路径 跟类型后 再输入文件名称 提高效率
4.提供 routers 去根据创建的 router.ts 生成名为 Routers.ts 总路由文件
可以如下写法,提高效率
```
import { createRouter, createWebHistory } from 'vue-router';
import routes from "../Routers"

console.log(routes)
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
```
