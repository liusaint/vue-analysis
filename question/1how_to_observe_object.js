function Observe(data) {
	this.data = data;
	this.walk(data);
}

Observe.prototype.walk = function(data) {
	var key, val;
	for (key in data) {
		if (!data.hasOwnProperty(key)) {
			continue;
		}
		val = data[key];
		if (Object.prototype.toString.call(val) == '[object Object]') {
			new Observe(val);
		} else {
			this.defineData(key, val);
		}
	}
}
Observe.prototype.defineData = function(key, val) {
	Object.defineProperty(this.data, key, {
		enumerable: true,
		configurable: true,
		get: function() {
			console.log('you visited ' + key + ',the value is ' + val);
			return val;
		},
		set: function(newVal) {
			console.log('you set ' + key + ' a new value "' + newVal + '" intead of "' + val + '"');
			if (val === newVal) return;
			val = newVal;
		}
	})


};



var data = {
	a: 1,
	b: {
		c: 2,
		d: 3
	}
};
var ob_data = new Observe(data);

ob_data.data.a;
ob_data.data.b.c = 5;
ob_data.data.b.e = 5;

ob_data.data.d = 1;





/*继承Array()*/
function Arr(){

}
Arr.prototype = new Array();

console.log(a = new Arr());

a.push(1);
a.push(2);
a.push(3);
console.log(a)