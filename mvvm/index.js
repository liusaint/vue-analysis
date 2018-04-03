/*dep区　begin*/
var uid$1 = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep() {
	this.id = uid$1++;
	this.subs = [];
};

Dep.prototype.addSub = function addSub(sub) {
	this.subs.push(sub);
};

/**
 * Remove an item from an array
 * 删除数组中的第一个等于item的。
 */
function remove$1(arr, item) {
	if (arr.length) {
		var index = arr.indexOf(item);
		if (index > -1) {
			return arr.splice(index, 1)
		}
	}
}

Dep.prototype.removeSub = function removeSub(sub) {
	remove$1(this.subs, sub);
};

Dep.prototype.depend = function depend() {
	if (Dep.target) {
		Dep.target.addDep(this);
	}
};

Dep.prototype.notify = function notify() {
	// stablize the subscriber list first
	var subs = this.subs.slice();
	for (var i = 0, l = subs.length; i < l; i++) {
		subs[i].update();
	}
};

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
// watcher在跟进的目标。
// 全局在任务时候只有一个wather在跟进。
Dep.target = null;
var targetStack = [];

function pushTarget(_target) {
	if (Dep.target) {
		targetStack.push(Dep.target);
	}
	Dep.target = _target;
}

function popTarget() {
	Dep.target = targetStack.pop();
}
/*dep区　end*/



function observe(data, isRoot) {
	if (!isObject(data)) {
		return;
	}
	var ob = new Observe(data);
}

function Observe(data) {
	this.value = data;
	this.dep = new Dep();
	this.vmCount = 0;
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

	var dep = new Dep();

	var val = obj[key];
	var childOb = observe(val);
	Object.defineProperty(obj, key, {

		get: function() {
			console.log('haha')
			return val;
		},
		set: function(newVal) {
	
			val = newVal;
			
			childOb = new Observe(newVal)
			dep.notify();

		}
	})
}


/*watcher*/

function Watcher(){

}
Watcher.prototype.update = function(){
	
}

/*watcher*/
//一个vue方法。
function Vue(options) {
	var el = document.querySelector(options.el);
	var data = options.data;
}



//测试区。
(function() {
	
	var data = {
		a: 1,
		b: 2,
		c: {
			aa: 1,
			bb: 2
		}
	}

	new Observe(data);
	return;
	data.a = 2
	console.log(data.c.aa)
	data.c = {
		e: 1,
		f: 2
	}
	console.log(data.c.e)
})();



//
//1.实现递归的变量设置监听。
//2.Dep
//3.watcher
//4.html fn