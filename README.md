# vue-analysis
vue学习。vue源码分析。


* Mustache 语法不能作用在 HTML 特性上，遇到这种情况应该使用 v-bind 指令：<p v-bind:id="dynamicId"></p>
* 指令。Directives。v-seen。　v-show。
* 修饰符。v-on:submit.prevent="onSubmit"
* 缩写：v-bind:a="b"  =>  :a="b"   v-on:click=""  =>  @click=""
* 计算属性与函数方法。计算属性是基于它们的依赖进行缓存的。
* methods中的属性与data中的属性不要重名。
* 当data中的数据修改。所有的模板中的表达式调用的method都会运行，每当触发重新渲染时，调用方法将总会再次执行函数。
* 计算属性。set get。在get方法中通过return 的值给计算属性新值。
* 侦听属性　watch。把计算结果赋予实例的某个属性。
* 计算属性与侦听属性的应用。根据两者赋值方式的不同。侦听属性可用于异步，延迟等不会马上有结果的操作。
*  class="a b " :class="{a:!message,c:'c'}" 这种情况前后相互独立。可能渲染出　'a b a c'。
*  当在一个自定义组件上使用 class 属性时，这些类将被添加到该组件的根元素上面。这个元素上已经存在的类不会被覆盖。
*  { display: ['-webkit-box', '-ms-flexbox', 'flex'] }
*  在 <template> 元素上使用 v-if 条件渲染分组
*  用 key 管理可复用的元素。
*  有 v-show 的元素始终会被渲染并保留在 DOM 中。v-show 只是简单地切换元素的 CSS 属性 display。
*  v-if 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。v-if 也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。
*  v-for与v-if。v-for的优先级比较高。可以在循环的时候进行一些过滤，很方便。
*  渲染列表。<div v-for="item in items" :key="item.id">。也尽可能要给一个key。
*  对于已经创建的实例，Vue 不能动态添加根级别的响应式属性。
*  数组的变异方法。数组替换。数组长度修改。
*  v-for可以用在自定义组件上。
* 注意这个is。todo-item是组件名字。因为ul下面li才比较合法。这样可以避免一些html解析上的错误。
```
<ul>
    <li
      is="todo-item"
      v-for="(todo, index) in todos"
      v-bind:key="todo.id"
      v-bind:title="todo.title"
      v-on:remove="todos.splice(index, 1)"
    ></li>
  </ul>
```
* 事件修饰符.stop .prevent .capture .self .once。使用修饰符时，顺序很重要；相应的代码会以同样的顺序产生。
* 按键修饰符。.enter .tab .delete (捕获“删除”和“退格”键) .esc .space .up .down .left .right<input v-on:keyup.13="submit"><!-- 缩写语法 --> <input @keyup.enter="submit">
* Vue.config.keyCodes.f1 = 112。全局配置。
* v-model 会忽略所有表单元素的 value、checked、selected 特性的初始值。因为它会选择 Vue 实例数据来作为具体的值。你应该通过 JavaScript 在组件的 data 选项中声明初始值。
* input输入的修饰符<input v-model.lazy="msg" >。.lazy（input转为change）.number　NaN的话原值。.trim

#### 组件
* 所有的 Vue 组件同时也都是 Vue 的实例，所以可接受相同的选项对象 (除了一些根级特有的选项) 并提供相同的生命周期钩子。
* 确保在初始化根实例之前注册组件。.Vue.component('my-component', {
  // 选项
})
* 局部注册 components: {// <my-component> 将只在父组件模板中可用 'my-component': Child }
* 因为 Vue 只有在浏览器解析、规范化模板之后才能获取其内容。比如table,selet里面的内容都有限制。需要用　is="my-component"。（<script type="text/x-template">；JavaScript 内联模板字符串；.vue 组件没有这些限制
* data为何需要是一个函数？
* 父子组件的关系可以总结为 prop 向下传递，事件向上传递。父组件通过 prop 给子组件下发数据，子组件通过事件给父组件发送消息。
* 组件实例的作用域是孤立的。
* HTML 特性是不区分大小写的。所以，当使用的不是字符串模板时，camelCase (驼峰式命名) 的 prop 需要转换为相对应的 kebab-case (短横线分隔式命名)。
* 传递数值。<!-- 传递真正的数值 --> <comp v-bind:some-prop="1"></comp>）
* 组件内部使用props：使用props中的值得初始化data。computed变量。
* 非 Prop 特性。会直接添加到子组件的根节点上。
* 替换/合并现有的特性。正常的会覆盖。class和style会合并。
* 自定义事件。https://cn.vuejs.org/v2/guide/components.html#自定义事件
    * .sync <comp :foo="bar" @update:foo="val => bar = val"></comp>
    * <input v-bind:value="something" v-on:input="something = $event.target.value">
    * 自定义表单组件。
    * 非父子组件的通信。var bus = new Vue() // 触发组件 A 中的事件 bus.$emit('id-selected', 1) // 在组件 B 创建的钩子中监听事件 bus.$on('id-selected', function (id) {// ... })
* 使用插槽分发内容
* 为了让组件可以组合，我们需要一种方式来混合父组件的内容与子组件自己的模板。这个过程被称为内容分发。
    * <slot> 只有在没有要分发的内容时才会显示。 </slot>
    * 具名插槽。<p slot="header"></p>     <slot name="header"></slot>
    * 作用域插槽。在子组件中，只需将数据传递到插槽，就像你将 prop 传递给组件一样。
    * <div class="child"> <slot text="hello from child"></slot> </div>
* 动态组件 <component v-bind:is="currentView"> <!-- 组件在 vm.currentview 变化时改变！ --> </component>
    * <keep-alive></keep-alive>
* Vue 组件的 API 来自三部分——prop、事件和插槽：
    * Prop 允许外部环境传递数据给组件；
    * 事件允许从组件内触发外部环境的副作用；
    * 插槽允许外部环境将额外的内容组合在组件中。
* 子组件引用。parent.$refs.profile　<user-profile ref="profile"></user-profile>
* 异步组件。与webpack配合。https://cn.vuejs.org/v2/guide/components.html#异步组件。const b1 = () => import ('@/components/b1')
* 组件命名约定
* 递归组件。组件在它的模板内可以递归地调用自己。
* 组件间的循环引用。与webpack配合时的模块机制处理。
* X-Template
* 对低开销的静态组件使用 v-once
* vue-loader css scope的作用范围。限制到本组件内。对于子组件不起作用。以及一些引用的外部组件也没有效果。因为它的编译不会深入组件内部。一定要修改子组件。可以考虑写两个<style>标签。一个带scope一个不带。
* vuex与v-model的配合。https://vuex.vuejs.org/zh-cn/forms.html


#### 其他内容
* mixin 比如created这种钩子函数会被合并成数组，在组件中的created之前调用。
* methods, components 和directives，将被混合为同一个对象。两个对象键名冲突时，取组件对象的键值对。
* 全局mixin。Vue.mixin();

* render函数
* this.$root.$data
* vmA.$data == vmB.$data;


#### 一些针对性的问题的考虑。

1.与传统后续如何结合。
2.vuex多页应用中使用。
3.与vue的比较。通信方面。




#### 源码
* 执行setter时再次调用渲染函数会再次读取数据，执行get,会再次收集依赖吗?   会，但是重复的dep不会添加到watcher中。
* 对于多个vue实例依赖同一个对象的情况。 一个observer。dep中会放多个watcher。
* 嵌套时的情况。 一个dep,多个watcher?
* 生命周期
* dep watcher observer三者的关系。
* 数组的处理。
* vmcount。






### 问题
* 1.计算属性 vs 侦听属性，方法？使用和实现上有什么不同。计算属性的setter。
适用计算属性的情况：1.多个属性的变化，引起同一个属性的变化。
适用watch的情况：1。异步操作。耗时操作。
适用方法：计算属性是基于它们的依赖进行缓存的，最好是纯函数。非纯函数可以用方法。
* 2.v-if与v-seen。 生命周期上会有什么不同。
* 3.v-for i in n范围。v-for on a <template>，渲染多个元素，如li。
* 4.事件处理。v-on:click @click @click.stop  .stop .prevent .capture .self .once 顺序。config.keyCodes。@keyup.enter　　@keyup.alt.67　@click.ctrl　@click.ctrl.exact
* 5.表单。
    * 1.v-model.会忽略selected,checked,value等以及textarea中间的值。
    * 2复选框的true-value false-value。　
    * 3.v-model的本质是什么，与自定义组件的关系。
    * 4.v-model　与:value="a"这种配合使用的情况。
    * 5.修饰符。v-model.lazy .number .trim
* 6.组件。
    * 1.局部组件。
    * 2.dom的限制。table,ul等<script type="text/x-template">JavaScript 内联模板字符串　.vue 组件。
    * 3.data必须为函数？是组件的？为什么要是函数？返回同一个data　ok不ok?
    * 4.camelCase vs. kebab-case。
    * 5.v-bind='obj'这种不带参数的prop。相当于把对象解构后分发下去的。
    * 6.prop的单向。内部要使用修改呢？计算属性。初始一个内部data。
    * 7.非 Prop 特性。data-3d-date-picker。一定要加data?出现在根元素。
    * 8.不能用 $on 侦听子组件释放的事件，而必须在模板里直接用 v-on 绑定，参见下面的例子。
    * 9.原生事件。v-on:click.native。
    * 10.<comp :foo.sync="bar"></comp>
    * 10.自定义表单。<input
  v-bind:value="something"
  v-on:input="something = $event.target.value">
    * 11.自定义表单的配置。  model: {
    prop: 'checked',
    event: 'change'
  }
    * 12.作用域插槽。
    * 12.可复用组件，props,event,插槽。Prop 允许外部环境传递数据给组件； 事件允许从组件内触发外部环境的副作用； 插槽允许外部环境将额外的内容组合在组件中。 * * 13.parent.$refs.profile　　
    * 14.异步组件。vue的异步组件是如何配合webpack的，原理是什么？
    * 15.组件命名属性。html中请使用-。 PascalCase 是最通用的声明约定而 kebab-case 是最通用的使用约定。
    * 16.递归组件。有终止条件。
    * 17.循环引用与webpack。要告知编译工具，beforeCreate中引用。。。

* 7.vue-router的实现原理。
* 8.h()。
* 9.keep-alive。的生命周期。
* 10.指令，以及指令的参数和钩子函数。
* 11.过滤器。
* 12.插件。作用？写法？添加全局功能有哪些方式。　插件包含了install方法。把全局功能放在这个方法里。使用vue.use的时候就会运行这些。让这些全局功能能作用。use可以传入option。
* 13.vue中同一个属性的修改有没有去重的操作。就是说先修改成a,再修改成b会render多少次呢。







VUEX方法
* 1.关于异步。
* 2.大型项目中的store如何管理。文件如何组织。
* 3.store中的值如果给input怎么处理。
* 4.vuex与redux的不同在哪。
* 5.vue如何合并对一个状态的修改的？
* 6.单一状态树与模块化。如何将状态和状态变更事件分布到各个子模块中。
* 7.store中的值放到组件中，使用compute属性。为了简单，有了mapstate。
* 8.getters。已有的state派生出一些状态。属性访问。方法访问。以及mapGetters。　　对比直接在组件中使用计算属性好在哪里？有多个组件需要用到此属性时不用到处复制同样的代码。
* 9.Mutation。　（state,playload）。正常提交方式与对象风格的提交方式。　使用常量做事件类型名。　常量放在单独的文件中可以让你的代码合作者对整个 app 包含的 mutation 一目了然。this.$store.commit('xxx') 提交 mutation，或者使用 mapMutations 辅助函数将组件中的 methods 映射为 store.commit 调用。　必须是同步函数，因为不会立即修改状态，导致难以追踪。
* 10.actions。　context。　actions中分发mutation。　组件中调用action：　store.dispatch()
mapActions 
* 11.module。　这个挺重要。　命名空间。　局部状态与根状态的切换。　命名空间的简单化使用。