<template>
	<div v-if="choiceVisible">
		<el-input></el-input>
		<h3>数据回示页面</h3>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				choiceVisible: false
			}
		}
	}
</script>