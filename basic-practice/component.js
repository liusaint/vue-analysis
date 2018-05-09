
Vue.component('hello',
{
	template:'<div><p><slot name="slot3"></slot><slot name="slot1"></slot></p>{{msg}}<slot name="slot2"></slot></div>',
	data:function(){
		var data = {
			msg:'hello,world!'
		}
		return data;
	}
})

//局部组件
var partCom = {
	template:'<div>{{msg}}</div>',
	data:function(){
		var data = {
			msg:'这是一个局部组件',			
		}
		return data;
	}
}

var p1 = new Vue({
	el:'#p1',
	data:{
		currentView:'hello'	
	},
	components:{
		partcom:partCom
	}
})











//组件与实例的区别？
//要在初始化之前注册
//全局注册与局部注册。局部注册这种封装也适合其他可以注册的东西比如指令。
//dom模板的限制。
//如果是原生的html中需要符合规则。但是字符串中的或script标签中的是可以解析的。　　<tr is="my-row"></tr>
//data必须是函数。为什么这么设计？
//父子组件的解耦。
//HTML 特性不区分大小写。当使用非字符串模版时，prop的名字形式会从 camelCase 转为 kebab-case（短横线隔开）
//<comp some-prop="1"></comp>与<comp v-bind:some-prop="1"></comp>
//prop验证
//非父子组件之间的通信var bus = new Vue()。用一个全局的实例来关注事件。
//编译作用域。自已的归自已管。
//作用域插槽
// 动态组件　keep-alive