<template>
  <section class="el-container is-vertical" v-loading="dataListLoading">
    <header class="el-header"><h4>信息系统</h4></header>
    <main class="el-main">
      <el-row :gutter="20">
        <el-col :span="8" v-for="item in dataList" :key="item.id">
          <div class="grid-content" @click="getInformationList(item.id, item.system)">
						{{item.system}}({{item.countNum}})
					</div>
        </el-col>
      </el-row>
    </main>
  </section>
</template>

<script>
import API from '@/api';
export default {
	data() {
		return {
			dataListLoading: false,
			dataList: []
		};
	},
	components: {},
	activated() {
		this.getDataList();
	},
	methods: {
		// 获取资源目录列表
		getDataList() {
			this.dataListLoading = true;
			this.$nextTick(() => {
				var params = {};
				API.information.catalog(params).then(({ data }) => {
					if (data && data.code === 0) {
						this.dataList = data.maps;
					} else {
						this.dataList = [];
					}
					this.dataListLoading = false;
				});
			});
		},
		// 跳转到信息资源详情页
		getInformationList(id, system) {
			this.$router.push({
				name: 'information',
				params: { id, system }
			});
		}
	}
};
</script>

<style lang="scss">
.grid-content {
	cursor: pointer;
	margin-bottom: 20px;
}
</style>
