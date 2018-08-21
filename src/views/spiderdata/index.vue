<template>
	<div class="mod-spiderdata">
		<!-- 显示采集用户信息 -->
		<crawl></crawl>
		<choice @showChoiceVisible = "updataVisible"></choice>
	</div>
</template>


<script>
  import API from '@/api'
  import Crawl from './crawl'
  import Choice from './choice'
	export default{
	  name: 'spider',
	  data(){
		return{
		  dataForm:{
		  	url: '',
		  	username: '',
		  	password: '',
		  	title: ''
		  },
		  showChoiceVisible: ''
		}
	},
	components:{
		Crawl,
		Choice
	},
	methods:{
		updataVisible(data){
			this.showChoiceVisible = data.showChoiceVisible;
			console.log('this: 1'+this.showChoiceVisible)
		}
	}
}
</script>