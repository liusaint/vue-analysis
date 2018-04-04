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
			if (Dep.target) {
				dep.depend();
				// if (childOb) {
				// 	childOb.dep.depend();
				// }
				// if (Array.isArray(value)) {
				// 	dependArray(value);
				// }
			}


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

/*  */

var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 * 一个观察者分析一个表达式，收集依赖，当表达式的值改变时触发回调。
 * 这个用于$watch()API和指令。	 * 
 */
var Watcher = function Watcher(
	vm,
	expOrFn,
	cb,
	options
) {
	this.vm = vm;
	vm._watchers.push(this);

	this.cb = cb;
	this.id = ++uid$2; // uid for batching 批次id???
	this.active = true;

	this.deps = [];
	this.newDeps = [];
	this.depIds = new Set();
	this.newDepIds = new Set();

	// parse expression for getter
	// 为getter分析表达式
	if (typeof expOrFn === 'function') {
		this.getter = expOrFn;
	} else {
		this.getter = parsePath(expOrFn);
		if (!this.getter) {
			this.getter = function() {};
			"development" !== 'production' && warn(
				"Failed watching path: \"" + expOrFn + "\" " +
				'Watcher only accepts simple dot-delimited paths. ' +
				'For full control, use a function instead.',
				vm
			);
		}
	}
	// this.value = this.lazy ? undefined : this.get();

	this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 * 求getter的值，重新集合依赖
 */
Watcher.prototype.get = function get() {
	pushTarget(this);
	var value = this.getter.call(this.vm, this.vm.data);
	// "touch" every property so they are all tracked as
	// dependencies for deep watching
	// “触摸”每一个属性，所以它们都被追踪为依赖为深度的watch.
	if (this.deep) {
		traverse(value);
	}
	popTarget();
	this.cleanupDeps();
	return value
};

/**
 * Add a dependency to this directive.
 * 给这个指令添加一个依赖
 */
Watcher.prototype.addDep = function addDep(dep) {
	var id = dep.id;
	if (!this.newDepIds.has(id)) {
		this.newDepIds.add(id);
		this.newDeps.push(dep);
		if (!this.depIds.has(id)) {
			dep.addSub(this);
		}
	}
};

/**
 * Clean up for dependency collection.
 * 清理依赖集合
 */
Watcher.prototype.cleanupDeps = function cleanupDeps() {
	var this$1 = this;

	var i = this.deps.length;
	while (i--) {
		var dep = this$1.deps[i];
		if (!this$1.newDepIds.has(dep.id)) {
			dep.removeSub(this$1);
		}
	}
	var tmp = this.depIds;
	this.depIds = this.newDepIds;
	this.newDepIds = tmp;
	this.newDepIds.clear();
	tmp = this.deps;
	this.deps = this.newDeps;
	this.newDeps = tmp;
	this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 * 订阅者接口。
 * 会被调用当一个依赖改变。
 */
Watcher.prototype.update = function update() {
	/* istanbul ignore else */
	// if (this.lazy) {
	// 	this.dirty = true;
	// } else if (this.sync) {
	// 	this.run();
	// } else {
	// 	queueWatcher(this);
	// }

	this.run();
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 * 调度器工作接口
 * 会被调度器调用。
 */
Watcher.prototype.run = function run() {
	if (this.active) {
		var value = this.get();
		if (
			value !== this.value ||
			// Deep watchers and watchers on Object/Arrays should fire even
			// when the value is the same, because the value may
			// have mutated.
			// 深度watcher以及ObJect/Arrays应该触发即使值是一样的，因为值可能突变。
			isObject(value) ||
			this.deep
		) {
			// set new value
			var oldValue = this.value;
			this.value = value;
			if (this.user) {
				try {
					this.cb.call(this.vm, value, oldValue);
				} catch (e) {
					/* istanbul ignore else */
					if (config.errorHandler) {
						config.errorHandler.call(null, e, this.vm);
					} else {
						"development" !== 'production' && warn(
							("Error in watcher \"" + (this.expression) + "\""),
							this.vm
						);
						throw e
					}
				}
			} else {
				this.cb.call(this.vm, value, oldValue);
			}
		}
	}
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 * 求值watcher.
 * 只为懒watcher调用。
 */
Watcher.prototype.evaluate = function evaluate() {
	this.value = this.get();
	this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 * 依赖于这个watcher收集的所有的deps
 */
Watcher.prototype.depend = function depend() {
	var this$1 = this;

	var i = this.deps.length;
	while (i--) {
		this$1.deps[i].depend();
	}
};

/**
 * Remove self from all dependencies' subscriber list.
 * 从所有依赖订阅者列表中移除自己。
 */
Watcher.prototype.teardown = function teardown() {
	var this$1 = this;

	if (this.active) {
		// remove self from vm's watcher list
		// this is a somewhat expensive operation so we skip it
		// if the vm is being destroyed.
		// 从vm的watcher列表中移除自身。
		// 这是一个有点昂贵的操作，所以如果vm在销毁中我们跳过这个步骤。
		if (!this.vm._isBeingDestroyed) {
			remove$1(this.vm._watchers, this);
		}
		var i = this.deps.length;
		while (i--) {
			this$1.deps[i].removeSub(this$1);
		}
		this.active = false;
	}
};

/*watcher*/
//一个vue方法。
function Vue(options) {
	this.el = options.el;
	this.data = options.data;
	//初始化数据
	this._watchers = [];
	observe(this.data);


	this.mount();

}
//一个简单的模板渲染函数。
Vue.prototype.mount = function() {
	var template = document.querySelector(this.el).outerHTML;
	//将换行符替换掉。
	template = template.replace(/\n/g,'');
	// var template = '<div>{{message}}{{message}}</div>'
	//一个简单的转换函数。将<div>{{message}}</div>转换成 '<div>'+message+'</div>'这种形式。并使用with。
	var replatedTem = template.replace(/({{([\s\S]+?)}})/g, function(match, $1, $2) {

		// console.log(arguments);
		return '\'+' + $2 + '+\'';
	})
	// replatedTem = '"'+replatedTem+'"';
	replatedTem = 'with(obj){ return \'' + replatedTem + '\'}';

	var renderFn = new Function('obj', replatedTem);

	// var res = renderFn({
	// 	message: 1
	// })

	// this.el.outerHTML = res;
	// console.log(res);
	var that = this;
	this._watcher = new Watcher(this,function(){
		var res = renderFn.apply(this,arguments);
		document.querySelector(this.el).outerHTML = res;
	})



}

var app = new Vue({
	el: '#app',
	data: {
		message: 123
	}
});

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
//
//
//其他：组件与vm的关系。
//一个对象被两个实例用的情况　