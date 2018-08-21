<template>
  <el-dialog
    :title="'采集比对'"
    :width="'60%'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-row :gutter="40">
			<el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
        <h4 class="table-header">最近一次采集信息项</h4>
				<el-table :data="lastDataList" v-loading="dataListLoading" stripe border style="width: 100%;">
          <el-table-column type="index" header-align="center" align="center" width="50"></el-table-column>
          <el-table-column prop="nameCn" label="信息项中文名称"></el-table-column>
          <el-table-column prop="nameEn" label="信息项英文名称"></el-table-column>
        </el-table>
			</el-col>
			<el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
        <h4 class="table-header">当前信息项</h4>
				<el-table :data="currentDataList" v-loading="dataListLoading" stripe border style="width: 100%;">
          <el-table-column type="index" header-align="center" align="center" width="50"></el-table-column>
          <el-table-column prop="nameCn" label="信息项中文名称"></el-table-column>
          <el-table-column prop="nameEn" label="信息项英文名称"></el-table-column>
        </el-table>
			</el-col>
		</el-row>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="linkHandle('item-conversion')">修改</el-button>
    </span>
  </el-dialog>
</template>

<script>
import API from '@/api';
import { mapMutations } from 'vuex';
export default {
	data() {
		return {
			id: '',
			visible: false,
			dataListLoading: false,
			lastDataList: [],
			currentDataList: []
		};
	},
	methods: {
		// 初始化
		init(chosenId, currentId) {
			this.id = currentId;
			this.visible = true;
			this.getdataList(currentId);
			this.getdataList(chosenId, true);
		},
		// 获取选择模板的数据
		// 根据chosen请求不同的数据
		async getdataList(id, chosen) {
			this.dataListLoading = true;

			try {
				if (chosen) {
					const res = await API.spiderconfig.getChooseDataList(id);
					await this.render(res.data, chosen);
				} else {
					const res = await API.spiderconfig.getCurrentDataList(id);
					await this.render(res.data);
				}
			} catch (err) {
				console.log(err);
			}
		},
		// 渲染采集数据
		async render(data, chosen) {
			if (data && data.code === 0) {
				if (chosen) {
					this.lastDataList = data.list;
				} else {
					this.currentDataList = data.list;
				}

				this.dataListLoading = false;
			} else {
				this.$message.error(data.msg);
			}
		},
		// 跳转页面
		linkHandle(routerName) {
			this.visible = false;
			if (this.id) {
				this.UPDATE_ITEM_ID({ id: this.id });
				this.$router.push({ name: routerName });
			}
		},
		...mapMutations(['UPDATE_ITEM_ID'])
	}
};
</script>

<style lang="scss">
.table-header {
	margin: -20px 0 10px;
	color: #777;
}
.el-table th {
	background-color: #fafafa;
}
</style>

