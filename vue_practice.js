Vue.component('com1', {
	props: ['p_user','p_input_name','p_show_alert'],
	template: 
	'<ul class="com1">子组件com1<li  v-for="(item,key) in p_user"  :data-id="item.id" v-on:click="p_show_alert(key)">{{key+1}}.{{item.name}}{{p_input_name}}</li><input type="text" v-model="p_input_name" /></ul>'
})


var a = new Vue({
	el: '#hello',
	data: {
		hello: 'hello,world',
		bindTitle:'bindTitle',
		seen:'false',//这个属性刚开始好像不起作用？
		input_name:'输入框的内容',
		nameCheckedId:1,
		radioVal:1,		
		usersArr:[
		{
			id:1,
			name:'名字1'
		},
		{
			id:2,
			name:'名字2'
		}
		]		
	},
	methods:{
		showAlert:function(nameId){
			//注意这里的this是指的a
			console.log(this.usersArr[nameId||0]);
			console.log(this.$data.usersArr[nameId||0]);
		}
	}
})

a.usersArr.push(
{
	id:3,
	name:'名字3'
})

//在属性中可以直接访问变量，不用打双括号？应该是在vue认识的一些属性里。
//v-bind:a="user.id" 类似这样。
//value="{{a}}"这种就不要用了

//获取当前遍历的索引值。
//
//组件
//组件应该先调用
//v-for不能用于根元素。
//子组件的input绑定到父组件中的值。会出现子组件中对值的修改影响不到父组件。但是父组件中对值的修改影响得到子组件　。会报错。如何实现父子组件中的某个值的共同绑定的影响呢？


