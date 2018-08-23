<template>
  <el-dialog
    :title="!dataForm.linkId ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="140px" style="padding-right: 40px;">
      <el-form-item label="系统名称" prop="system">
        <el-input v-model="dataForm.system" placeholder="请输入采集系统名称"></el-input>
      </el-form-item>
      <el-form-item label="模块名称" prop="module">
        <el-input v-model="dataForm.module" placeholder="请输入采集模块名称"></el-input>
      </el-form-item>
      <el-form-item label="采集网址" prop="url">
        <el-input v-model="dataForm.url" placeholder="请输入采集网址"></el-input>
      </el-form-item>
      <el-form-item label="是否有登录页" prop="isLogin">
        <el-radio v-model="dataForm.isLogin" :label="1">有</el-radio>
        <el-radio v-model="dataForm.isLogin" @change='clearLoginUrl' :label="0">无</el-radio>
      </el-form-item>
      <el-form-item v-if="dataForm.isLogin" label="登录页url" prop="loginUrl">
        <el-input v-model="dataForm.loginUrl" placeholder="请输入登录页的网址"></el-input>
      </el-form-item>
      <el-form-item label="任务描述" prop="remarks">
        <el-input v-model="dataForm.remarks" placeholder="请输入任务描述" type="textarea"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import API from '@/api';
import { isURL } from '@/utils/validate';
export default {
	data() {
		// 验证规则
		var validateAcquisitionURL = (rule, value, callback) => {
			if (isURL(value)) {
				callback();
			} else {
				callback(new Error('请输入有效的网址'));
			}
		};
		return {
			visible: false,
			dataForm: {
				linkId: 0,
				system: '',
				module: '',
				url: '',
				isLogin: '',
				remarks: '',
				loginUrl: ''
			},
			dataRule: {
				system: [
					{ required: true, message: '系统名称不能为空', trigger: 'blur' }
				],
				module: [
					{ required: true, message: '模块名称不能为空', trigger: 'blur' }
				],
				url: [
					{ required: true, validator: validateAcquisitionURL, trigger: 'blur' }
				],
				isLogin: [
					{ required: true, message: '请选择是否有登录页', trigger: 'blur' }
				],
				loginUrl: [
					{ required: true, validator: validateAcquisitionURL, trigger: 'blur' }
				]
			}
		};
	},
	methods: {
		// 初始化表单数据
		init(id) {
			this.dataForm.linkId = id || 0;
			this.visible = true;
			this.$nextTick(() => {
				this.$refs['dataForm'].resetFields();
				if (this.dataForm.linkId) {
					API.spiderconfig.info(this.dataForm.linkId).then(({ data }) => {
						console.log('data', data);
						if (data && data.code === 0) {
							this.dataForm.linkId = data.list.linkId;
							this.dataForm.system = data.list.system;
							this.dataForm.module = data.list.module;
							this.dataForm.url = data.list.url;
							this.dataForm.loginUrl = data.list.loginUrl;
							this.dataForm.isLogin = data.list.isLogin;
							this.dataForm.remarks = data.list.remarks;
						}
					});
				}
			});
		},
		clearLoginUrl(){
			this.dataForm.loginUrl = '';
		},
		// 表单提交
		dataFormSubmit() {
			this.$refs['dataForm'].validate(valid => {
				if (valid) {
					/*if (!isLogin) {
						this.dataForm.loginUrl = ''
					}else{
						this.dataForm.loginUrl = this.dataForm.loginUrl
					}*/
					
					console.log("this")
					var params = {
						linkId: this.dataForm.linkId || undefined,
						system: this.dataForm.system,
						module: this.dataForm.module,
						url: this.dataForm.url,
						isLogin: this.dataForm.isLogin,
						loginUrl: this.dataForm.loginUrl,
						remarks: this.dataForm.remarks,
						
					};
					console.log('params',params);

					var tick = !this.dataForm.linkId
						? API.spiderconfig.add(params)
						: API.spiderconfig.update(params);

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
