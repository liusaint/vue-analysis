//一些功能试验。测试。 为vue源码分析做准备

//get set 
//https://github.com/youngwind/blog/issues/84
var gsObj = {}

Object.defineProperties(gsObj,{
	_a:{value:'a'},
	b:{value:'b'},
	c:{
		get:function(){
			return this._a;
		},
		set:function(newValue){
			console.log(newValue);
		}
	}

})

// console.log(gsObj);
gsObj.c = 33;
console.log(gsObj.c);
// console.log(gsObj);
