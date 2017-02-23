
Vue.component('hello',
{
	template:'<div>{{msg}}</div>',
	data:function(){
		var data = {
			msg:'hello,world!',			
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

	},
	components:{
		partcom:partCom
	}
})











//组件与实例的区别？
//要在初始化之前注册
//全局注册与局部注册。局部注册这种封装也适合其他可以注册的东西比如指令。
//dom模板的限制。
//如果是原生的html中需要符合规则。但是字符串中的或script标签中的是可以解析的。
//data必须是函数。为什么这么设计？