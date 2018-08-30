<template>
  <div class="mod-schedule">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <!-- <el-form-item>
        <el-input v-model="dataForm.beanName" placeholder="任务名称" clearable></el-input>
      </el-form-item> -->
      <el-form-item>
        <!-- <el-button icon="el-icon-search" @click="getDataList()">搜索</el-button> -->
        <el-button v-if="isAuth('sys:schedule:save')" type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <el-button v-if="isAuth('sys:schedule:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
        <el-button v-if="isAuth('sys:schedule:pause')" type="danger" @click="pauseHandle()" :disabled="dataListSelections.length <= 0">批量暂停</el-button>
        <!-- <el-button v-if="isAuth('sys:schedule:resume')" type="danger" @click="resumeHandle()" :disabled="dataListSelections.length <= 0">批量恢复</el-button> -->
        <el-button v-if="isAuth('sys:schedule:run')" type="danger" @click="runHandle()" :disabled="dataListSelections.length <= 0">批量开始</el-button>
        <el-button v-if="isAuth('sys:schedule:log')" type="success" @click="linkHandle('log')">日志列表</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      stripe
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
      <el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
      <el-table-column prop="jobId" header-align="center" align="center" width="50" label="ID"></el-table-column>
      <el-table-column width="80" prop="beanName" label="任务名称"></el-table-column>
      <el-table-column width="250" prop="paramsName" align="center" label="任务具体名称"></el-table-column>
      <!-- <el-table-column prop="methodName" label="方法名称"></el-table-column> -->
      <el-table-column prop="createTime" label="任务时间"></el-table-column>
      <el-table-column width="110" prop="cronExpression" label="cron表达式"></el-table-column>
      <el-table-column width="130" prop="remark" label="任务描述"></el-table-column>
      <el-table-column prop="status" label="状态" width="70px">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == 0" size="medium" type="success">正常</el-tag>
          <el-tag v-else size="medium" type="danger">暂停</el-tag>
        </template>
      </el-table-column>
     <!--  <el-table-column width="280" label="操作">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status == 0" type="danger" size="small" @click="pauseHandle(scope.row.jobId)">暂停任务</el-button>
          <el-button v-else type="primary" size="small" @click="runHandle(scope.row.jobId)">开始任务</el-button>
          <el-button size="small" icon="el-icon-edit" @click="addOrUpdateHandle(scope.row.jobId)">编辑</el-button>
          <el-button size="small" icon="el-icon-delete" @click="deleteHandle(scope.row.jobId)">删除</el-button>
        </template>
      </el-table-column> -->
        <el-table-column
        
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button v-if="isAuth('sys:schedule:update')" type="text" size="small" @click="addOrUpdateHandle(scope.row.jobId)">修改</el-button>
          <el-button v-if="isAuth('sys:schedule:delete')" type="text" size="small" @click="deleteHandle(scope.row.jobId)">删除</el-button>
          <el-button v-if="isAuth('sys:schedule:pause')" type="text" size="small" @click="pauseHandle(scope.row.jobId)">暂停</el-button>
          <el-button v-if="isAuth('sys:schedule:resume')" type="text" size="small" @click="resumeHandle(scope.row.jobId)">恢复</el-button>
          <el-button v-if="isAuth('sys:schedule:run')" type="text" size="small" @click="runHandle(scope.row.jobId)">立即执行</el-button>
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
    <!-- 弹窗, 日志列表 -->
    <log v-if="logVisible" ref="log"></log>
  </div>
</template>

<script>
import API from '@/api';
import AddOrUpdate from './add-or-update';
import Log from './log';
export default {
	data() {
		return {
			dataForm: {
				beanName: ''
			},
			dataList: [],
			pageIndex: 1,
			pageSize: 10,
			totalPage: 0,
			dataListLoading: false,
			dataListSelections: [],
			addOrUpdateVisible: false,
			logVisible: false
		};
	},
	components: {
		AddOrUpdate,
		Log
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
				beanName: this.dataForm.beanName
			};
			API.schedule.list(params).then(({ data }) => {
				if (data && data.code === 0) {
					console.log('data',data);
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
		addOrUpdateHandle(id) {
			this.addOrUpdateVisible = true;
			this.$nextTick(() => {
				this.$refs.addOrUpdate.init(id);
			});
		},
		// 删除
		deleteHandle(id) {
			var ids = id
				? [id]
				: this.dataListSelections.map(item => {
						return item.jobId;
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
				API.schedule.del(ids).then(({ data }) => {
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
		},
		// 暂停
		pauseHandle(id) {
			var ids = id
				? [id]
				: this.dataListSelections.map(item => {
						return item.jobId;
				  });
			this.$confirm(
				`确定对[id=${ids.join(',')}]进行[${id ? '暂停' : '批量暂停'}]操作?`,
				'提示',
				{
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}
			).then(() => {
				API.schedule.pause(ids).then(({ data }) => {
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
		},
		// 恢复
		resumeHandle(id) {
			var ids = id
				? [id]
				: this.dataListSelections.map(item => {
						return item.jobId;
				  });
			this.$confirm(
				`确定对[id=${ids.join(',')}]进行[${id ? '恢复' : '批量恢复'}]操作?`,
				'提示',
				{
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}
			).then(() => {
				API.schedule.resume(ids).then(({ data }) => {
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
		},
		// 立即执行
		runHandle(id) {
			var ids = id
				? [id]
				: this.dataListSelections.map(item => {
						return item.jobId;
				  });
			this.$confirm(
				`确定对[id=${ids.join(',')}]进行[${
					id ? '立即执行' : '批量立即执行'
				}]操作?`,
				'提示',
				{
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}
			).then(() => {
				API.schedule.run(ids).then(({ data }) => {
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
		},
		// 日志列表
		logHandle() {
			this.logVisible = true;
			this.$nextTick(() => {
				this.$refs.log.init();
			});
		},
		// 查看/转换
		linkHandle(routerName) {
			this.$router.push({ name: routerName });
		}
	}
};
</script>
