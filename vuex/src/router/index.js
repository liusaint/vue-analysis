import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import child from '@/components/child'
import parent from '@/components/parent'
// import Vuex from 'vuex';

// Vue.use(Vuex);

Vue.use(Router)

// const vuex_store = new Vuex.store({
// 	state : {
// 		parent:'';
// 	}
// })

export default new Router({
	routes: [
	{
		path: '/',
		name: 'Hello',
		component: Hello
	},
	{
		path: '/child',
		name: 'child',
		component: child
	},
	{
		path: '/parent',
		name: 'parent',
		component: parent,
	}
	]
})
