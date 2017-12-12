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