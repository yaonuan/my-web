<template>
  <el-dialog
    :title="'请选择需要比对的模板'"
		:width="'400px'"
    :close-on-click-modal="false"
    :visible.sync="visible">
		<el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="confirmHandle()">
			<el-form-item prop="chosen">
				<el-select v-model="dataForm.chosen" placeholder="请选择" style="width: 100%;">
					<el-option
						v-for="item in dataList"
						:key="item.id"
						:label="item.system"
						:value="item.id">
						<span style="float: left">{{ item.system }}</span>
      					<span style="float: right; color: #8492a6; font-size: 13px">{{ item.module }}</span>
					</el-option>
				</el-select>
			</el-form-item>
		</el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="confirmHandle()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import API from '@/api';
export default {
	data() {
		return {
			id: '',
			dataList: [],
			visible: false,
			dataListLoading: false,
			dataForm: {
				chosen: ''
			},
			dataRule: {
				chosen: [{ required: true, message: '请先选择模板', trigger: 'blur' }]
			}
		};
	},
	methods: {
		// 初始化表单数据
		init(id) {
			this.id = id;
			this.dataForm.chosen = '';
			this.visible = true;
			this.getAllTemplate();
		},
		// 获取所有模板
		async getAllTemplate() {
			this.dataListLoading = true;

			try {
				const res = await API.spiderconfig.getAllTemplate();
				await this.render(res.data);
			} catch (err) {
				console.log(err);
			}
		},
		// 渲染采集数据
		async render(data) {
			// console.log('data', data);
			if (data && data.code === 0) {
				this.dataList = data.list;
				this.dataListLoading = false;
			} else {
				this.$message.error(data.msg);
			}
		},
		// 确认
		confirmHandle() {
			this.visible = true;
			// console.log('chosen', this.dataForm.chosen);
			this.$refs['dataForm'].validate(valid => {
				if (valid) {
					this.$emit('comparison', this.dataForm.chosen, this.id);
					this.visible = false;
				}
			});
		}
	}
};
</script>

<style lang="scss">
.table-header {
	margin: -20px 0 10px;
	color: #777;
}
.el-table th {
	background-color: #fafafa;
}
</style>
