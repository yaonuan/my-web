<template>
  <el-dialog
    title="手动填写cookie"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="140px" style="padding-right: 40px;">
      <el-form-item label="系统名称" prop="system">
        <el-input v-model="dataForm.system" placeholder="请输入采集系统名称" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="采集网址" prop="url">
        <el-input v-model="dataForm.url" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="Cookie(可多个)" prop="cookie">
		<el-input-number v-model="dataForm.cookielist" @change="handleChange" :min="0" :max="10" label="描述文字"></el-input-number>
      </el-form-item>

      <el-form-item v-for="(item, index) in dataForm.cookie" label="cookie信息" prop="name">
        <el-input v-model="dataForm.cookie[index].name" prefix-icon="el-icon-edit" prop="cookiename" placeholder="请输入cookie的名称"></el-input>
       <!--  <el-radio v-model="dataForm.cookie[index].name" :label="0">rememberMe</el-radio> -->
        <el-input style="margin-top:16px" v-model="dataForm.cookie[index].value" type="textarea" :autosize="{ minRows: 2, maxRows: 3}" prefix-icon="el-icon-edit-outline" placeholder="请输入cookie的值"></el-input>
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
				linkId: '',
				system: '',
				url: '',
				cookie: [],
				name: '',
				cookielist: 0
			},
			dataRule: {
				xxx: [
					{ required: true, message: 'cookie相关信息不能为空', trigger: 'blur' }
				]
			}
		};
	},
	methods: {
		// 初始化表单数据
		init(id,system,url) {
			this.dataForm.linkId = id;
			this.dataForm.system = system;
			this.dataForm.url = url;
			this.visible = true;
			this.dataForm.cookie = [];
			this.dataForm.cookielist = 0;
			//获取后端cookie数据
			this.$nextTick(() => {
				this.$refs['dataForm'].resetFields();
				if (this.dataForm.linkId) {
					API.spiderconfig.gainCookie(this.dataForm.linkId).then(({ data }) => {
						console.log('data', data);
						if (data && data.code === 0) {
							this.dataForm.cookie = data.cookie;
							this.dataForm.cookielist = data.length;
						}
					});
				}
			});
		},
		//增减cookie的表格数
		handleChange(value){
			let i = 0;
			let len = Math.abs(value - this.dataForm.cookielist)
			if (value > this.dataForm.cookielist) {
				while (i < len) {
					i+=1
					this.dataForm.cookie.push({name: '', value: ''});
				}
			} else {
				while (i < len) {
					i+=1
					this.dataForm.cookie.splice(this.dataForm.cookie.length-1, 1)
				}
				
			}
			this.dataForm.cookielist = this.dataForm.cookie.length;
			
		},
		// 表单提交
		dataFormSubmit() {
			this.$refs['dataForm'].validate(valid => {
				if (valid) {
					var params = {
						linkId: this.dataForm.linkId,
						cookie: this.dataForm.cookie,
					};
					console.log("params",params)

					var tick =  API.spiderconfig.addByCookie(params);

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
