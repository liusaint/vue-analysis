



















//
//Vue 不能检测到对象属性的添加或删除。
//Vue 不允许在已经创建的实例上动态添加新的根级响应式属性(root-level reactive property)。然而它可以使用 Vue.set(object, key, value) 方法将响应属性添加到嵌套的对象上。
//this.$set(this.someObject,'b',2)