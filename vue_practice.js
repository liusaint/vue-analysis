var a = new Vue({
	el: '#hello',
	data: {
		hello: 'hello,world',
		bindTitle:'bindTitle',
		seen:'false',
		input_name:'输入框的内容',
		namesArr:[
		{
			id:1,
			name:'名字1'
		},
		{
			id:2,
			name:'名字2'
		}
		],
		nameCheckedId:1
	},
	methods:{
		showAlert:function(nameId){
			//注意这里的this是指的a
			console.log(this.namesArr[nameId||0]);
			console.log(this.$data.namesArr[nameId||0]);
		}
	}
})

a.namesArr.push(
{
	id:3,
	name:'名字3'
})

//在属性中可以直接访问变量，不用打双括号？
//获取当前遍历的索引值。