Vue.component('com1', {
	props: ['p_user','p_input_name','p_show_alert','input_obj'],
	template: 
	'<ul class="com1">子组件com1<li  v-for="(item,key) in p_user"  :data-id="item.id" v-on:click="p_show_alert(key)">{{key+1}}.{{item.name}}{{p_input_name}}</li><input type="text" v-model="p_input_name" v-on:input="tellParent" placeholder="这里通过事件把消息传递给父组件"/><br /><input type="text" v-model="input_obj.input_name" placeholder="这里通过引用类型中的值的修改" /></ul>',
	methods:{
		tellParent:function(){
			this.$emit('changeinput',this.p_input_name);	
		}
	}
})


var a = new Vue({
	el: '#hello',
	data: {
		hello: 'hello,world',
		bindTitle:'bindTitle',
		seen:'true',//这个属性刚开始好像不起作用？
		input_name:'输入框的内容',
		inputObj:{
			input_name:'引用值的修改:这个是inputObj中的一个值'
		},
		nameCheckedId:1,
		radioVal:1,
		checkboxArr:[],
		rawHtml:'{{input_name}}',
		wordA:'abcde',


		usersArr:[
		{
			id:1,
			name:'名字1'
		},
		{
			id:2,
			name:'名字2'
		}
		],
		testObjChange:{
			a:1,
			b:2
		},
		//测试this在methods中的表现和在data中的表现
		testThisFn:function(){
			console.log(this.radioVal);
		}		
	},
	methods:{
		showAlert:function(nameId){
			//注意这里的this是指的a
			console.log(this.usersArr[nameId||0]);
			console.log(this.$data.usersArr[nameId||0]);
		},
		getChildMsg:function(msg){
			this.input_name = msg;
		}
	},
	filters:{
		big:function(value){
			if(!value) return '';
			return value.toUpperCase() || '';
		}
	},
	computed:{
		computedBig:function(){
			return this.wordA.toUpperCase();
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
//$开头的属性。
//为什么说vue不完全是mvvm
//生命周期。能自已讲出来画出来吗？
//v-once
//v-html
//v-bind:disabled
//指令。指令参数。指令修饰符
//过滤器　filters;{{a:filter1}}
//缩写　v-bind:id  :id  v-on:click @click
//计算属性与缓存。
//计算属性与watched的对比　
//计算属性默认只有 getter ，不过在需要时你也可以提供一个 setter
//watch与异步操作？
//class与bind class共存。　<div class="static" v-bind:class="{ active: isActive, 'text-danger': hasError }"> </div> 
//v-bind:class="classObject"　也可以使用绑定的属性与计算属性

//数组样式　<div v-bind:class="[isActive ? activeClass : '', errorClass]">
//<div v-bind:class="[{ active: isActive }, errorClass]">
//v-bind:class="['a','b']"
//用在组件上的话会传递到下面元素的根元素上
//v-bind:style。自动增加style前缀
//
//
//v-if v-else-if v-else
//<template v-if="ok">
//
//Vue 尝试尽可能高效的渲染元素，通常会复用已有元素而不是从头开始渲染。
//使用key控制是否重新渲染
//
//v-show与v-if
//v-show只是修改display
//v-if的惰性？
//
//template 不会渲染出来。很多时候可以用来html块。
//
// v-for与数字。 <span v-for="n in 10">{{ n }}</span>　重复多次文档。
// 
// event
// 可传入$event访问原生的事件对象。
// 但更好的方式是：methods 只有纯粹的数据逻辑，而不是去处理 DOM 事件细节。　　于是产生了修饰符
// .stop .prevent .capture .self .once 
// <div v-on:click.self="doThat">...</div>
// 事件修饰符。按键修饰符（keycode与别名）。
// 
// vue中的事件都是在当前视图的viewModel上的
// 
// 表单　
//　修饰符　v-model.lazy  .number .trim
//　自定义input类型
//　
//　
//　组件
//　父子通信。子父通信。props与自定义事件。
//　函数名，不带括号。
//　触发自定义事件可以带参数。
//　a.$refs.com1.input_obj.input_name = 1 //ref的运用。
//　
//　


const sourceOfTruth = {a:1}
debugger;
const vmA = new Vue({
  data: sourceOfTruth
})
debugger;
const vmB = new Vue({
  data: sourceOfTruth
})

console.log(vmA.$data == vmB.$data);


//对象的响应测试
a.$set(a.testObjChange,'c',555);
Vue.set(a.testObjChange, 'cd', 2);
a.testObjChange = {aa:1,BB:2};
a.testObjChange = [1,2,3];
a.testObjChange = [1,2,3,]