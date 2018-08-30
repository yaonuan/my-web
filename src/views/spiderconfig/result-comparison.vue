<template>
  <section class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.system" placeholder="请输入采集系统名称" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search" @click="getDataList()">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="dataList" v-loading="dataListLoading" stripe border style="width: 100%;">
      <el-table-column type="index" header-align="center" align="center" width="60" label="编号"></el-table-column>
      <el-table-column prop="system" align="center" label="系统名称"></el-table-column>
      <el-table-column prop="module" align="center" label="模块名称"></el-table-column>
      <el-table-column prop="createTime" align="center" label="采集时间"></el-table-column>
      <el-table-column fixed="right" align="center" width="150" label="操作">
        <template slot-scope="scope">
          <el-button size="small" @click="linkHandle(scope.row.id, 'item')">查看</el-button>
          <el-button size="small" type="primary" @click="chooseTemplateHandle(scope.row.id)">比对</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <!-- 弹窗, 选择模板 -->
    <choose-template v-if="chooseTemplateVisible" ref="chooseTemplate" @comparison="comparisonHandle"></choose-template>
    <!-- 弹窗, 比对 -->
    <detail v-if="detailVisible" ref="detail"></detail>
  </section>
</template>

<script>
import API from '@/api';
import chooseTemplate from './choose-template';
import Detail from './detail';
import { mapMutations } from 'vuex';
export default {
	data() {
		return {
			dataForm: {
				key: ''
			},
			dataList: [],
			pageIndex: 1,
			pageSize: 10,
			totalPage: 0,
			dataListLoading: false,
			detailVisible: false,
			chooseTemplateVisible: false
		};
	},
	components: {
		chooseTemplate,
		Detail
	},
	activated() {
		this.getDataList();
	},
	methods: {
		// 获取数据列表
		getDataList() {
			this.dataListLoading = true;
			var params = {
				page: this.pageIndex,
				limit: this.pageSize,
				system: this.dataForm.system
			};
			API.spiderconfig.getResult(params).then(({ data }) => {
				// console.log('data', data);
				if (data && data.code === 0) {
					this.dataList = data.list;
					this.totalPage = data.page.totalCount;
				} else {
					this.dataList = [];
					this.totalPage = 0;
				}
				this.dataListLoading = false;
			});
		},
		// 每页数
		sizeChangeHandle(val) {
			this.pageSize = val;
			this.pageIndex = 1;
			this.getDataList();
		},
		// 当前页
		currentChangeHandle(val) {
			this.pageIndex = val;
			this.getDataList();
		},
		// 选择模板
		chooseTemplateHandle(id) {
			this.chooseTemplateVisible = true;
			this.$nextTick(() => {
				this.$refs.chooseTemplate.init(id);
			});
		},
		// 确认比对
		comparisonHandle(chosenId, currentId) {
			// console.log('chosenId', chosenId);
			// console.log('currentId', currentId);
			this.detailVisible = true;
			this.$nextTick(() => {
				this.$refs.detail.init(chosenId, currentId);
			});
		},
		// 查看
		linkHandle(id, routerName) {
			this.UPDATE_ITEM_ID({ id: id });
			this.$router.push({ name: routerName });
		},
		...mapMutations(['UPDATE_ITEM_ID'])
	}
};
</script>
