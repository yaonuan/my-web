<template>
  <section class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.jobId" placeholder="请输入任务Id" clearable></el-input>
      </el-form-item>
			<!-- <el-form-item>
				<el-select v-model="dataForm.role" placeholder="选择用户" clearable>
					<el-option
						v-for="item in roleList"
						:key="item.roleId"
						:label="item.roleName"
						:value="item.roleId">
					</el-option>
				</el-select>
			</el-form-item> -->
      <el-form-item>
        <el-button icon="el-icon-search" @click="getDataList()">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="dataList" v-loading="dataListLoading" stripe border style="width: 100%;">
      <el-table-column type="index" header-align="center" align="center" width="60" label="编号"></el-table-column>
      <el-table-column width="70" prop="jobId" label="任务Id"></el-table-column>
      <el-table-column prop="beanName" label="bean名称"></el-table-column>
      <el-table-column prop="methodName" label="方法名"></el-table-column>
      <el-table-column prop="params" label="参数"></el-table-column>
      <el-table-column prop="times" label="耗时(单位：毫秒)"></el-table-column>
      <el-table-column width="170" prop="createTime" label="创建时间"></el-table-column>
      <!-- <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="roleName" label="操作用户"></el-table-column>
      <el-table-column prop="createTime" label="操作时间"></el-table-column>
      <el-table-column prop="ip" label="操作IP"></el-table-column>
      <el-table-column prop="url" label="操作URL"></el-table-column> -->
      <el-table-column width="80" label="操作">
        <template slot-scope="scope">
          <el-button size="small" @click="detailHandle(scope.row.logId)">详情</el-button>
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
    <log-detail v-if="detailVisible" ref="logDetail"></log-detail>
  </section>
</template>

<script>
import API from '@/api';
import LogDetail from './log-detail';
import { mapMutations } from 'vuex';
export default {
	data() {
		return {
			dataForm: {
				key: '',
				title: '',
				jobId: '',
				role: ''
			},
			changeStateList: [],
			dataList: [],
			roleList: [],
			pageIndex: 1,
			pageSize: 10,
			totalPage: 0,
			dataListLoading: false,
			dataListSelections: [],
			detailVisible: false
		};
	},
	components: {
		LogDetail
	},
	activated() {
		// this.getRoleList();
		this.getDataList();
	},
	methods: {
		// 获取管理员列表
		/*async getRoleList() {
			const res = await API.role.list();
			const data = res.data;

			console.log('role', data);

			if (data && data.code === 0) {
				this.roleList = data.list;
			}
		},*/
		// 获取数据列表
		getDataList() {
			this.dataListLoading = true;

			var params = {
				page: this.pageIndex,
				limit: this.pageSize,
				// title: this.dataForm.title,
				jobId: this.dataForm.jobId
				// roleId: this.dataForm.role
			};

			console.log('params', params);

			API.log.scheduleList(params).then(({ data }) => {
				console.log('data', data);
				if (data && data.code === 0) {
					this.dataList = data.page.list;
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
		// 查看/转换
		detailHandle(id) {
			console.log('id', id);
			if (id) {
				this.detailVisible = true;
				this.$nextTick(() => {
					this.$refs.logDetail.init(id);
				});
			}
		},
		...mapMutations(['UPDATE_ITEM_ID'])
	}
};
</script>
