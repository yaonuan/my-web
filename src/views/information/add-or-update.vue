<template>
  <el-dialog
    :title="isEdit ? '信息资源修改' : '信息资源详情'"
		:top="'5vh'"
    :width="'70%'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="isEdit && dataRule" ref="dataForm" @keyup.enter.native="isEdit && dataFormSubmit()" label-width="120px">
      <el-form-item label="信息资源提供方" prop="system">
        <el-input v-model="dataForm.system" :readonly="!isEdit" placeholder="请输入信息资源提供方" style="width: 50%;"></el-input>
      </el-form-item>
      <el-table :data="itemData" v-loading="dataListLoading" stripe border style="width: 100%;">
        <el-table-column type="index" header-align="center" align="center"></el-table-column>
        <el-table-column prop="nameCn" label="信息项中文名称"></el-table-column>
        <el-table-column prop="nameEn" label="信息项英文名称"></el-table-column>
        <el-table-column prop="len" width="120" label="字段长度"></el-table-column>
        <el-table-column prop="source" label="来源"></el-table-column>
        <el-table-column width="100" label="操作">
          <template slot-scope="scope">
            <el-button size="small" icon="el-icon-info" @click="addOrUpdateHandle(scope.row, undefined, true)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">{{isEdit ? '取消' : '关闭'}}</el-button>
      <el-button type="primary" v-if="isEdit" @click="dataFormSubmit()">保存</el-button>
    </span>
		<!-- 弹窗 - 信息项 -->
    <item-dialog v-if="innerVisible" ref="itemDialog"></item-dialog>
  </el-dialog>
</template>

<script>
import API from '@/api';
import ItemDialog from './item-dialog';
import { isURL } from '@/utils/validate';
export default {
	data() {
		return {
			visible: false,
			innerVisible: false,
			isEdit: false,
			dataListLoading: false,
			itemData: [],
			dataForm: {
				id: 0,
				system: ''
			},
			dataRule: {
				system: [
					{ required: true, message: '信息资源提供方不能为空', trigger: 'blur' }
				]
			}
		};
	},
	components: {
		ItemDialog
	},
	methods: {
		// 初始化表单数据
		init(id, system, isEdit) {
			this.dataForm.id = id || 0;
			this.isEdit = isEdit;
			this.visible = true;
			this.$nextTick(() => {
				this.$refs['dataForm'].resetFields();
				this.dataForm.system = system;

				if (this.dataForm.id) {
					API.information.info(this.dataForm.id).then(({ data }) => {
						// console.log('data', data);
						if (data && data.code === 0) {
							const dataList = [];
							// 筛选结果，并对结果数组进行合并
							data.results.map(item => item.elementInfo).forEach(arr => {
								dataList = dataList.concat(arr);
							});
							console.log('dataList', dataList);

							this.itemData = dataList;
						}
					});
				}
			});
		},
		// 详情
		addOrUpdateHandle(row, isEdit, isRow) {
			this.innerVisible = true;
			this.$nextTick(() => {
				this.$refs.itemDialog.init(row, isEdit, isRow);
			});
		},
		// 表单提交
		dataFormSubmit() {
			this.$refs['dataForm'].validate(valid => {
				if (valid) {
					var params = {
						id: this.dataForm.id || undefined,
						system: this.dataForm.system
					};
					var tick = !this.dataForm.id
						? API.information.add(params)
						: API.information.update(params);
					tick.then(({ data }) => {
						if (data && data.code === 0) {
							this.$message({
								message: '操作成功',
								type: 'success',
								duration: 1500,
								onClose: () => {
									this.visible = false;
									this.$emit('refreshDataList');
								}
							});
						} else {
							this.$message.error(data.msg);
						}
					});
				}
			});
		}
	}
};
</script>
