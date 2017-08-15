<template>

	<div class="child">{{parent}}

<input type="text" v-model="parent" @input="changeParent">
	</div>

</template>

<script>
	export default{
		props : ['parent'] ,
		// name : 'child',
		data () {
			return {
				msg:123
			}
		},
		methods:{
			changeParent (){
				this.$emit('changeParent',this.parent);
			}
		}
	}
</script>

<style scoped>
	.child{
		border: 1px solid #ccc;
		padding: 10px;
	}
</style>