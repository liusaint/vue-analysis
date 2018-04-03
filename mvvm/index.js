function observe(data, isRoot) {
	if (!isObject(data)) {
		return;
	}
	var ob = new Observe(data);
}

function Observe(data) {
	this.walk(data);
}
Observe.prototype.walk = function(obj) {
	for (var i in obj) {
		if (obj.hasOwnProperty(i)) {
			this.defineData(obj, i)
		}
	}
}
//判断是否简单对象
function isObject(obj) {
	return Object.prototype.toString.call(obj) === '[object Object]'
}

Observe.prototype.defineData = function(obj, key) {

	if (!isObject(obj)) {
		return;
	}
	var val = obj[key];
	var childOb = observe(val);
	Object.defineProperty(obj, key, {

		get: function() {
			console.log('haha')
			return val;
		},
		set: function(newVal) {
			console.log('heihei')
			val = newVal;
			if (isObject(newVal)) {
				childOb = new Observe(newVal)
			}

		}
	})
}







//测试区。
var data = {a:1,b:2,c:{aa:1,bb:2}}

new Observe(data);

data.a = 2
console.log(data.c.aa)
data.c = {e:1,f:2}
console.log(data.c.e)
