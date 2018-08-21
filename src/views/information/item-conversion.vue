<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.nameCn" placeholder="请输入信息项中文名称" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search" @click="getDataList()">搜索</el-button>
        <!-- <el-button type="primary" @click="exportHandle()">导出数据</el-button>
        <el-button type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button> -->
      </el-form-item>
    </el-form>
    <el-table :data="dataList" v-loading="dataListLoading" @selection-change="selectionChangeHandle" stripe border style="width: 100%;">
      <el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
      <el-table-column prop="system" label="系统名称"></el-table-column>
      <el-table-column prop="module" label="信息资源名称"></el-table-column>
      <el-table-column prop="nameCn" label="信息项名称"></el-table-column>
      <el-table-column prop="nameEn" label="信息项英文名称"></el-table-column>
      <el-table-column prop="isChange" label="状态" width="100">
				<template slot-scope="scope">
						<el-tag size="medium" :type="'success'" v-if="scope.row.isChange">已完善</el-tag>
						<el-tag size="medium" :type="'danger'" v-else>未完善</el-tag>
				</template>
			</el-table-column>
      <el-table-column width="190" label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="success" v-if="scope.row.isChange">补全完善</el-button>  <!-- @click="setTemplateHandle(scope.row.pageId)" -->
          <el-button size="small" type="danger" v-else @click="addOrUpdateHandle(scope.row.pageId, true)">补全数据</el-button>
          <el-button size="small" icon="el-icon-info" v-if="scope.row.isChange" @click="addOrUpdateHandle(scope.row.pageId)">详情</el-button>
          <el-button size="small" icon="el-icon-delete" v-else @click="deleteHandle(scope.row.pageId)">删除</el-button>
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
		<!-- 弹窗 - 信息项 -->
    <item-dialog-supple v-if="innerVisible" ref="ItemDialogSupple" @refreshDataList="getDataList"></item-dialog-supple>
  </div>
</template>

<script>
import API from '@/api';
import ItemDialogSupple from './item-dialog-supple';
export default {
	data() {
		return {
			system: '',
			dataForm: {
				key: '',
				resultId: ''
			},
			dataList: [],
			pageIndex: 1,
			pageSize: 10,
			totalPage: 0,
			dataListLoading: false,
			dataListSelections: [],
			innerVisible: false
		};
	},
	components: {
		ItemDialogSupple
	},
	activated() {
		this.getDataList();
	},
	methods: {
		// 获取数据列表
		getDataList() {
			this.dataForm.resultId = this.$store.state.resultId;
			this.dataListLoading = true;

			console.log('resultId', this.dataForm.resultId);

			if (this.dataForm.resultId) {
				var params = {
					page: this.pageIndex,
					limit: this.pageSize,
					resultId: this.dataForm.resultId,
					nameCn: this.dataForm.nameCn
				};

				console.log('params', params);

				API.information.itemConversion(params).then(({ data }) => {
					console.log('data', data);
					if (data && data.code === 0) {
						this.dataListLoading = false;
						this.dataList = data.resultInfos[0].pageInfo;

						for (let i = 0; i < this.dataList.length; i++) {
							const element = this.dataList[i];
							element.system = data.resultInfos[0].system;
							element.module = data.resultInfos[0].module;
							this.system = element.system;
						}

						this.totalPage = data.totalCount;
					} else {
						this.dataList = [];
						this.totalPage = 0;
					}
					this.dataListLoading = false;
				});
			}
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
		addOrUpdateHandle(id, isEdit) {
			this.innerVisible = true;
			this.$nextTick(() => {
				this.$refs.ItemDialogSupple.init(id, this.system, isEdit);
			});
		},
		// 设置模板<查看element对应信息>
		setTemplateHandle(id) {
			API.information.setTemplate({ pageId: id }).then(({ data }) => {
				if (data && data.code === 0) {
					this.$message({
						message: '设置成功',
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
		},
		// 删除
		deleteHandle(id) {
			var ids = id
				? [id]
				: this.dataListSelections.map(item => {
						return item.id;
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
				API.information.itemConversionDelete(ids).then(({ data }) => {
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
