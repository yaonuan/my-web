<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.module" placeholder="请输入信息资源模块" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search" @click="getDataList()">搜索</el-button>
        <!-- <el-button type="primary" @click="exportHandle()">导出数据</el-button> -->
        <!-- <el-button type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button> -->
      </el-form-item>
    </el-form>
    <el-table :data="dataList" v-loading="dataListLoading" @selection-change="selectionChangeHandle" stripe border style="width: 100%;">
      <el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
      <el-table-column prop="system" label="信息资源提供方"></el-table-column>
			<el-table-column prop="module" label="信息资源模块"></el-table-column>
      <el-table-column width="270" label="操作">
        <template slot-scope="scope">
          <el-button size="small" icon="el-icon-info" @click="addOrUpdateHandle(scope.row.linkId, scope.row.system)">详情</el-button>
          <!-- <el-button size="small" icon="el-icon-edit" @click="addOrUpdateHandle(scope.row.linkId, scope.row.system, true)">编辑</el-button>
          <el-button size="small" icon="el-icon-delete" @click="deleteHandle(scope.row.linkId)">删除</el-button> -->
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
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
import API from '@/api';
import AddOrUpdate from './add-or-update';
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
			dataListSelections: [],
			addOrUpdateVisible: false
		};
	},
	components: {
		AddOrUpdate
	},
	activated() {
		this.getDataList();
	},
	methods: {
		// 获取数据列表
		getDataList() {
			this.dataListLoading = true;
			var params = {
				id: this.$route.params.id,
				page: this.pageIndex,
				limit: this.pageSize,
				system: this.$route.params.system,
				module: this.dataForm.module
			};
			console.log('params', params);
			API.information.list(params).then(({ data }) => {
				console.log('data', data);
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
		// 多选
		selectionChangeHandle(val) {
			this.dataListSelections = val;
		},
		// 新增 / 修改
		addOrUpdateHandle(id, system, isEdit) {
			this.addOrUpdateVisible = true;
			this.$nextTick(() => {
				this.$refs.addOrUpdate.init(id, system, isEdit);
			});
		},
		// 删除
		deleteHandle(id) {
			var ids = id
				? [id]
				: this.dataListSelections.map(item => {
						return item.linkId;
				  });
			this.$confirm(
				`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`,
				'提示',
				{
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}
			).then(() => {
				API.information.del(ids).then(({ data }) => {
					if (data && data.code === 0) {
						this.$message({
							message: '操作成功',
							type: 'success',
							duration: 1500,
							onClose: () => {
								this.getDataList();
							}
						});
					} else {
						this.$message.error(data.msg);
					}
				});
			});
		}
	}
};
</script>
