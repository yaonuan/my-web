<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="140px" style="padding-right: 40px;">
      <el-form-item label="任务名称" prop="beanName">
        <el-input v-model="dataForm.beanName" placeholder="请输入任务名称" readonly :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="方法名称" prop="methodName">
        <el-input v-model="dataForm.methodName" placeholder="请输入方法名称" readonly :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="采集系统模块" prop="params">
				<el-cascader
				 	v-model="dataForm.params"
					placeholder="请选择采集系统模块"
					:options="dataForm.paramsList"
					style="width:100%"
					filterable
					change-on-select
				></el-cascader>
			</el-form-item>
      <el-form-item label="cron表达式" prop="cronExpression">
        <el-input v-model="dataForm.cronExpression" placeholder="如: 0 0 0/12 * * ? 含义：秒 分 时 日 月 星期(?)"></el-input>
      </el-form-item>
      <el-form-item label="任务描述" prop="remark">
        <el-input v-model="dataForm.remark" placeholder="请输入任务描述"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">保存</el-button>
    </span>
  </el-dialog>
</template>

<script>
import API from '@/api';
export default {
	data() {
		return {
			visible: false,
			dataForm: {
				id: 0,
				beanName: 'autoTask',
				methodName: 'autoCrawl',
				params: [],
				paramsList: [],
				cronExpression: '',
				remark: '',
				status: 0
			},
			dataRule: {
				params: [
					{
						required: true,
						message: '采集系统模块不能为空',
						trigger: 'change',
						type: 'array'
					}
				],
				cronExpression: [
					{ required: true, message: 'cron表达式不能为空', trigger: 'blur' }
				]
			}
		};
	},
	methods: {
		init(id) {
			this.dataForm.id = id || 0;
			this.dataForm.params = [];
			this.dataForm.paramsList = [];
			this.visible = true;

			this.$nextTick(() => {
				this.$refs['dataForm'].resetFields();
				if (this.dataForm.id) {
					this.getDataList();
				}
				this.getModuleList();
				
			});
		},
		// 获取系统模块列表
		async getModuleList() {
			const res = await API.schedule.getModule();
			this.dataForm.paramsList = res.data.list;

			console.log('getModuleList', this.dataForm.paramsList);
		},
		// 获取数据
		async getDataList() {
			const res = await API.schedule.info(this.dataForm.id);
			const data = res.data;

			console.log('data', data);

			if (this.dataForm.id) {
				if (data && data.code === 0) {
					this.dataForm.params = data.schedule.param;
					//回显beanName、methodName
					this.dataForm.beanName = data.schedule.beanName;
					this.dataForm.methodName = data.schedule.methodName;
					this.dataForm.cronExpression = data.schedule.cronExpression;
					this.dataForm.remark = data.schedule.remark;
					this.dataForm.status = data.schedule.status;
				}
			}
		},
		// 表单提交
		dataFormSubmit() {
			this.$refs['dataForm'].validate(valid => {
				if (valid) {
					var params = {
						jobId: this.dataForm.id || undefined,
						beanName: 'autoTask',
						methodName: 'autoCrawl',
						params: this.dataForm.params[1],
						cronExpression: this.dataForm.cronExpression,
						remark: this.dataForm.remark,
						status: !this.dataForm.id ? undefined : this.dataForm.status
					};

					console.log('params', params);

					var tick = !this.dataForm.id
						? API.schedule.add(params)
						: API.schedule.update(params);
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