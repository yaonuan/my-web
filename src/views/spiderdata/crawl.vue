<template>
	<div class="mod-spider" v-if="crawlVisible">
		 <el-form :model="dataForm" label-width="70px" @keyup.enter.native="changeVisible()">
		 	<el-form-item label="地址" prop="url">
		 		<el-input v-model="dataForm.url" width="70px" placeholder="地址"></el-input>
		 	</el-form-item>	
		 	<el-form-item>
		 		<el-switch v-model="value"></el-switch>
		 	</el-form-item>
		 		
		 	<el-form-item label="账号" prop="username">
		 		<el-input v-model="dataForm.username" width="40%" placeholder="请输入登录账号"></el-input>
		 	</el-form-item>
		 	<el-form-item label="密码" prop="password">
		 		<el-input v-model="dataForm.password" type="password" width="100" placeholder="请输入登录密码"></el-input>
		 	</el-form-item>
		 </el-form>
		 <div align="right">
		 	<el-button  @click="dataFormSubmit">爬取</el-button>
		 </div>
	</div>
</template>

<script>
  import API from '@/api'
	export default{
	  name: 'spider-crawl',

	  data(){
		return{
		  dataForm:{
		  	url: '',
		  	username: '',
		  	password: '',
		  },
		  crawlVisible: true,
		  value: true
		}
	},
	activated(){
		this.changeVisible()
	},
	methods:{
		changeVisible(){
			console.log("执行重刷页面");
			this.crawlVisible = true
			this.dataForm.url = ''
		  	this.dataForm.username = ''
		  	this.dataForm.password = ''
		},
		//数据提交
		dataFormSubmit(){
			var params ={
				'url': this.dataForm.url,
				'username': this.dataForm.username,
				'password': this.dataForm.password
			}
			console.log(params);
			API.spiderdata.send(params).then(({data}) =>{
				if(data && data.ret === 0){
					this.$message({
						message: '操作成功',
						type: 'success',
					},1000);
					this.crawlVisible = false
					let data ={
						showChoiceVisible: 'true'
					}
					this.$emit('showChoiceVisible',showChoiceVisible);
				}else{
					this.$message.error(data.msg)
				}
			})
		}
	}
}
</script>