<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.system" placeholder="请输入系统名称" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search" @click="getDataList()">搜索</el-button>
        <el-button type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <el-button type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="dataList" v-loading="dataListLoading" @selection-change="selectionChangeHandle" stripe border style="width: 100%;">
      <el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
      <el-table-column prop="system" label="系统名称"></el-table-column>
      <el-table-column prop="module" label="模块名称"></el-table-column>
      <el-table-column prop="url" label="采集网址"></el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <el-table-column fixed="right" width="480" label="操作">
        <template slot-scope="scope">
          <el-button size="small" v-if="scope.row.isLogin" type="success" :disabled="!!scope.row.hasTarget" @click="simLoginHandle(scope.row.linkId)">模拟登录</el-button>
          <el-button size="small" type="primary" :disabled="(!scope.row.hasTarget && !!scope.row.isLogin)" @click="spiderHandle(scope.row.linkId, scope.row.url)">单点采集</el-button>
          <el-button size="small" icon="el-icon-edit" @click="addOrUpdateHandle(scope.row.linkId)">编辑</el-button>
          <el-button size="small" v-if="scope.row.isLogin" icon="el-icon-edit" @click="addCookie(scope.row.linkId,scope.row.system,scope.row.url)">cookie</el-button>
          <el-button size="small" icon="el-icon-delete" @click="deleteHandle(scope.row.linkId)">删除</el-button>
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
    <!-- 弹窗, cookie提写 -->
    <add-cookie v-if="addCookieVisible" ref="addCookie" @refreshDataList="getDataList"></add-cookie>
	<!-- 弹窗, 模拟登录 -->
    <sim-login v-if="simLoginVisible" ref="simLogin" @refreshDataList="getDataList"></sim-login>
  </div>
</template>

<script>
import API from '@/api';
import { mapMutations } from 'vuex';
import AddOrUpdate from './add-or-update';
import SimLogin from './sim-login';
import AddCookie from './add-cookie';
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
			addOrUpdateVisible: false,
			addCookieVisible: false,
			simLoginVisible: false
		};
	},
	components: {
		AddOrUpdate,
		SimLogin,
		AddCookie
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
			API.spiderconfig.list(params).then(({ data }) => {
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
		addOrUpdateHandle(id) {
			this.addOrUpdateVisible = true;
			this.$nextTick(() => {
				this.$refs.addOrUpdate.init(id);
			});
		},
		//新增cookie
		addCookie(id,system,url){
			this.addCookieVisible = true;
			this.$nextTick(()=>{
				this.$refs.addCookie.init(id,system,url);
			})

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
				API.spiderconfig.del(ids).then(({ data }) => {
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
		// 模拟登录
		simLoginHandle(id) {
			this.simLoginVisible = true;
			this.$nextTick(() => {
				this.$refs.simLogin.init(id);
			});
		},
		// 单点采集
		spiderHandle(id, url) {
			this.UPDATE_SPIDER_ID({ id: id });
			this.UPDATE_SPIDER_URL({ url: url });
			this.$router.push({ name: 'spiderstart' });
		},
		...mapMutations(['UPDATE_SPIDER_ID', 'UPDATE_SPIDER_URL'])
	}
};
</script>
