<template>
  <section class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.system" placeholder="请输入采集系统名称" clearable></el-input>
      </el-form-item>
			<el-form-item>
        <el-input v-model="dataForm.module" placeholder="请输入模块名称" clearable></el-input>
      </el-form-item>
			<el-form-item>
				<el-select v-model="dataForm.changeState" placeholder="是否转化" clearable>
					<el-option
						v-for="item in changeStateList"
						:key="item.value"
						:label="item.label"
						:value="item.value">
					</el-option>
				</el-select>
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
      <el-table-column prop="changeState" align="center" label="状态" width="105">
				<template slot-scope="scope">
						<el-tag size="medium" :type="'info'" v-if="scope.row.changeState == 0">未转化</el-tag>
						<el-tag size="medium" :type="'warning'" v-else-if="scope.row.changeState == 1">转化未完全</el-tag>
						<el-tag size="medium" :type="'success'" v-else>转化完全</el-tag>
				</template>
			</el-table-column>
      <el-table-column width="200" align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="small" @click="linkHandle(scope.row.id, 'item')">查看已转化</el-button>
          <el-button size="small" type="primary" @click="linkHandle(scope.row.id, 'item-conversion')">转换</el-button>
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
    <!-- 弹窗, 比对 -->
    <detail v-if="detailVisible" ref="detail"></detail>
  </section>
</template>

<script>
import API from '@/api';
import Detail from './detail';
import { mapMutations } from 'vuex';
export default {
	data() {
		return {
			dataForm: {
				key: '',
				system: '',
				module: '',
				changeState: ''
			},
			changeStateList: [
				{
					value: 0,
					label: '未转化'
				},
				{
					value: 1,
					label: '转化未完全'
				},
				{
					value: 2,
					label: '转化完全'
				}
			],
			dataList: [],
			pageIndex: 1,
			pageSize: 10,
			totalPage: 0,
			dataListLoading: false,
			dataListSelections: [],
			detailVisible: false
		};
	},
	components: {
		Detail
	},
	activated() {
		this.getDataList();
	},
	methods: {
		// 获取数据列表
		getDataList() {
			this.dataListLoading = true;

			const params = {
				page: this.pageIndex,
				limit: this.pageSize,
				system: this.dataForm.system,
				module: this.dataForm.module,
				changeState: this.dataForm.changeState
			};

			console.log('params', params);

			API.spiderconfig.getConviersion(params).then(({ data }) => {
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
		// 比对
		detailnHandle(id) {
			this.detailVisible = true;
			this.$nextTick(() => {
				this.$refs.detail.init(id);
			});
		},
		// 查看/转换
		linkHandle(id, routerName) {
			if (id) {
				this.UPDATE_ITEM_ID({ id: id });
				this.$router.push({ name: routerName });
			}
		},
		...mapMutations(['UPDATE_ITEM_ID'])
	}
};
</script>
