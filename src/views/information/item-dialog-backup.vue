<template>
  <el-dialog
    :title="isEdit ? '信息项修改' : '信息项详情'"
		:top="'20vh'"
		:class="'item-dialog'"
    :close-on-click-modal="false"
    :visible.sync="visible"
		append-to-body>
    <el-form :model="dataForm" :rules="isEdit && dataRule" ref="dataForm" @keyup.enter.native="isEdit && dataFormSubmit()" label-width="140px" style="padding-right: 40px;">
      <el-form-item label="信息项中文名称" prop="nameCn">
        <el-input v-model="dataForm.nameCn" :readonly="!isEdit" placeholder="请输入信息项中文名称"></el-input>
      </el-form-item>
      <el-form-item label="信息项英文名称" prop="nameEn">
        <el-input v-model="dataForm.nameEn" :readonly="!isEdit" placeholder="请输入信息项英文名称"></el-input>
      </el-form-item>
      <el-form-item label="来源" prop="source">
        <el-input v-model="dataForm.source" :readonly="!isEdit" placeholder="请输入采集来源"></el-input>
      </el-form-item>
      <el-form-item label="采集URL" prop="url">
        <el-input v-model="dataForm.url" :readonly="!isEdit" placeholder="请输入采集URL"></el-input>
      </el-form-item>
      <el-form-item label="采集时间" prop="createTime">
        <el-input v-model="dataForm.createTime" :readonly="!isEdit" placeholder="请输入采集时间"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">{{isEdit ? '取消' : '关闭'}}</el-button>
      <el-button type="primary" v-if="isEdit" @click="dataFormSubmit()">保存</el-button>
    </span>
  </el-dialog>
</template>

<script>
import API from '@/api';
import { isURL } from '@/utils/validate';
export default {
	data() {
		return {
			visible: false,
			isEdit: false,
			dataListLoading: false,
			dataForm: {
				id: 0,
				nameCn: '',
				nameEn: '',
				source: '',
				url: '',
				createTime: ''
			},
			dataRule: {
				nameCn: [
					{ required: true, message: '信息项中文名称不能为空', trigger: 'blur' }
				],
				nameEn: [
					{ required: true, message: '信息项英文名称不能为空', trigger: 'blur' }
				],
				source: [
					{ required: true, message: '采集来源不能为空', trigger: 'blur' }
				],
				url: [{ required: true, message: '采集URL不能为空', trigger: 'blur' }],
				createTime: [
					{ required: true, message: '采集时间不能为空', trigger: 'blur' }
				]
			}
		};
	},
	methods: {
		// 初始化表单数据
		init(id, isEdit) {
			this.dataForm.id = id || 0;
			this.isEdit = isEdit;
			this.visible = true;
			this.$nextTick(() => {
				this.$refs['dataForm'].resetFields();
				if (this.dataForm.id) {
					API.information.item(this.dataForm.id).then(({ data }) => {
						console.log('data', data);
						if (data && data.code === 0) {
							this.dataForm.nameCn = data.list.nameCn;
							this.dataForm.nameEn = data.list.nameEn;
							this.dataForm.source = data.list.source;
							this.dataForm.url = data.list.url;
							this.dataForm.createTime = data.list.createTime;
						}
					});
				}
			});
		},
		// 表单提交
		dataFormSubmit() {
			this.$refs['dataForm'].validate(valid => {
				if (valid) {
					var params = {
						id: this.dataForm.id || undefined,
						nameCn: this.dataForm.nameCn
					};
					var tick = !this.dataForm.id
						? API.information.itemAdd(params)
						: API.information.itemUpdate(params);
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
