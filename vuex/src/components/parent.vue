<template>

	<div class="parent">

		<input type="text" v-model="parent">
		<div>parent的值为{{parent}}</div>
		<child :parent="parent" @changeParent = "changeParent">这里是child</child>
	</div>


</template>

<script>	
	import child from './child.vue';
	export default {
		name:'parent',
		components:{child},
		data(){
			return {
				parent:123
			}
		},
		methods:{
			changeParent (msg){
				this.parent = msg; 
			}
		}
	}
</script>

<style scoped>
	.parent{
		border: 1px solid #ccc;
		padding: 20px;
	}

</style>