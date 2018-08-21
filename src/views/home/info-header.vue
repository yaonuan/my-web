<template>
	<el-row :gutter="20" v-if="infoList.length > 0">
		<el-col :span="6" v-for="item in infoList" :key="item.id">
		<div class="banner" :class="'banner-' + item.id" @click="linkHandle(item.id)">
			<p>{{item.title}}</p>
			<h2>{{item.count}}</h2>
			<span v-if="item.id == 1"><i class="el-icon-news"></i></span>
			<span v-else-if="item.id == 2"><i class="el-icon-date"></i></span>
			<span v-else-if="item.id == 3"><i class="el-icon-sort"></i></span>
			<span v-else-if="item.id == 4"><i class="el-icon-tickets"></i></span>
		</div>
		</el-col>
	</el-row>
</template>

<script>
import API from '@/api';
export default {
	data() {
		return {
			infoList: ''
		};
	},
	activated() {
		this.getDataList();
	},
	methods: {
		async getDataList() {
			const res = await API.home.getInfoCount();
			const data = res.data;

			console.log('data', data);

			if (data && data.code === 0) {
				this.infoList = data.list;
			}
		},
		linkHandle() {
			// this.$router.push({ name: 'information' });
		}
	}
};
</script>

<style lang="scss">
.banner {
	position: relative;
	color: #fff;
	padding: 20px;
	border-radius: 6px;

	p {
		margin-top: 0;
	}

	h2 {
		font-size: 2rem;
		font-weight: normal;
		line-height: normal;
		margin: 0;
	}

	span {
		position: absolute;
		right: 20px;
		top: 50%;
		font-size: 2.3rem;
		margin-top: -26px;
	}
}
</style>

