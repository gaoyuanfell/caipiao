## 环境安装
    npm install
## 项目启动
    npm run dev （开发）
    npm run build （打包）








data
props //props 可以是数组或对象，用于接收来自父组件的数据。props 可以是简单的数组，或者使用对象作为替代，对象允许配置高级选项，如类型检测、自定义校验和设置默认值。
propsData //创建实例时传递 props。主要作用是方便测试。
computed //计算属性将被混入到 Vue 实例中。所有 getter 和 setter 的 this 上下文自动地绑定为 Vue 实例。
methods //methods 将被混入到 Vue 实例中。可以直接通过 VM 实例访问这些方法，或者在指令表达式中使用。方法中的 this 自动绑定为 Vue 实例。
watch //一个对象，键是需要观察的表达式，值是对应回调函数。值也可以是方法名，或者包含选项的对象。Vue 实例将会在实例化时调用 $watch()，遍历 watch 对象的每一个属性。

beforeCreate  //在实例初始化之后，数据观测(data observer) 和 event/watcher 事件配置之前被调用。
created //实例已经创建完成之后被调用。在这一步，实例已完成以下的配置：数据观测(data observer)，属性和方法的运算， watch/event 事件回调。然而，挂载阶段还没开始，$el 属性目前不可见。
beforeMount //在挂载开始之前被调用：相关的 render 函数首次被调用。
mounted //el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$el 也在文档内。
beforeUpdate //数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。  你可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程。
updated //由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。
activated //keep-alive 组件激活时调用。
deactivated //keep-alive 组件停用时调用。
beforeDestroy  //实例销毁之前调用。在这一步，实例仍然完全可用。
destroyed //Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。





测试服务器   180.97.75.144:21314   root   YcMed@Dmpsper#$!2016






