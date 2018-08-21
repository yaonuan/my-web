<template>
  <el-dialog
    :title="isEdit ? '采集日志修改' : '采集日志详情'"
		:top="'15vh'"
		:class="'item-dialog'"
    :close-on-click-modal="false"
    :visible.sync="visible"
		append-to-body>
    <el-form :model="dataForm" :rules="isEdit && dataRule" ref="dataForm" @keyup.enter.native="isEdit && dataFormSubmit()" label-width="140px" style="padding-right: 40px;">
      <el-form-item label="任务Id" prop="jobId">
        <el-input v-model="dataForm.jobId" :readonly="!isEdit" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="bean名称" prop="beanName">
        <el-input v-model="dataForm.beanName" :readonly="!isEdit" placeholder="请输入spring bean名称"></el-input>
      </el-form-item>
      <el-form-item label="方法名" prop="methodName">
        <el-input v-model="dataForm.methodName" :readonly="!isEdit" placeholder="请输入方法名"></el-input>
      </el-form-item>
      <el-form-item label="参数" prop="params">
        <el-input v-model="dataForm.params" :readonly="!isEdit" placeholder="请输入参数"></el-input>
      </el-form-item>
      <el-form-item label="耗时(单位：毫秒)" prop="times">
        <el-input v-model="dataForm.times" :readonly="!isEdit" placeholder="请输入耗时(单位：毫秒)"></el-input>
      </el-form-item>
      <el-form-item label="创建时间" prop="createTime">
        <el-input v-model="dataForm.createTime" :readonly="!isEdit" placeholder="请输入创建时间"></el-input>
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
				jobId: '',
				beanName: '',
				methodName: '',
				params: '',
				times: '',
				createTime: ''
			},
			dataRule: {
				title: [{ required: true, message: '标题不能为空', trigger: 'blur' }],
				roleName: [
					{ required: true, message: '操作用户不能为空', trigger: 'blur' }
				],
				createTime: [
					{ required: true, message: '操作时间不能为空', trigger: 'blur' }
				],
				ip: [{ required: true, message: '操作IP不能为空', trigger: 'blur' }],
				url: [{ required: true, message: '操作URL不能为空', trigger: 'blur' }],
				operatData: [
					{ required: true, message: '操作数据不能为空', trigger: 'blur' }
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
					API.log.scheduleInfo(this.dataForm.id).then(({ data }) => {
						console.log('data', data);
						if (data && data.code === 0) {
							this.dataForm.jobId = data.log.jobId;
							this.dataForm.beanName = data.log.beanName;
							this.dataForm.methodName = data.log.methodName;
							this.dataForm.params = data.log.params;
							this.dataForm.times = data.log.times;
							this.dataForm.createTime = data.log.createTime;
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
