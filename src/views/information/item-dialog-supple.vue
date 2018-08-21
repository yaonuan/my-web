<template>
  <el-dialog
    :title="isEdit ? '信息项修改' : '信息项详情'"
		:top="'6vh'"
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
        <el-input v-model="dataForm.source" :readonly="!isEdit" placeholder="请输入来源"></el-input>
      </el-form-item>
      <el-form-item label="资源项目名称" prop="informationName">
        <el-input v-model="dataForm.informationName" :readonly="!isEdit" placeholder="请输入所在信息资源名称"></el-input>
      </el-form-item>
      <!-- <div :disabled ="!isEdit" > -->
      <div :disabled="isEdit">
      <el-form-item   v-if="isEdit" label="类型" prop="type">
				<el-input v-model="dataForm.label" v-if="!isEdit" :readonly="!isEdit" placeholder="请选择类型"></el-input>
				<el-select v-model="dataForm.type" v-else placeholder="请选择类型" style="width: 100%">
					<el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.label">
					</el-option>
				</el-select>
      </el-form-item>
      </div>
      <el-form-item v-if="!isEdit" label="类型" prop="type">
        <el-input v-if="!isEdit" v-model="dataForm.type" :readonly="!!isEdit"></el-input>
      </el-form-item>

      <el-form-item  label="项目长度" prop="len">
        <el-input v-model="dataForm.len" :readonly="!isEdit" placeholder="请输入长度"></el-input>
      </el-form-item>
      <el-form-item  label="描述" prop="remark">
        <el-input v-model="dataForm.remark" :readonly="!isEdit" placeholder="请输入描述"></el-input>
      </el-form-item>
      <el-form-item  label="默认值" prop="routine">
        <el-input v-model="dataForm.routine" :readonly="!isEdit" placeholder="请输入默认值"></el-input>
      </el-form-item>
  	<!-- </div> -->
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
import { getTypeOptions } from '@/utils';
export default {
	data() {
		return {
			visible: false,
			isEdit: false,
			dataListLoading: false,
			system: '',
			options: [],
			dataForm: {
				id: 0,
				nameCn: '',
				nameEn: '',
				source: '',
				informationName: '',
				type: '',
				label: '',
				len: '',
				remark: '',
				routine: '',
				createTime: '',
			},
			dataRule: {
				nameCn: [
					{ required: true, message: '信息项中文名称不能为空', trigger: 'blur' }
				],
				nameEn: [
					{ required: true, message: '信息项英文名称不能为空', trigger: 'blur' }
				],
				source: [{ required: true, message: '来源不能为空', trigger: 'blur' }],
				informationName: [
					{
						required: true,
						message: '资源项目名称不能为空',
						trigger: 'blur'
					}
				],
				type: [{ required: true, message: '类型不能为空', trigger: 'blur' }],
				len: [{ required: true, message: '长度不能为空', trigger: 'blur' }],
				remark: [{ required: true, message: '描述不能为空', trigger: 'blur' }],
				routine: [
					{ required: true, message: '默认值不能为空', trigger: 'blur' }
				]
			}
		};
	},
	methods: {
		// 初始化表单数据
		init(id, system, isEdit) {
			this.dataForm.id = id || 0;
			this.system = system;
			this.isEdit = isEdit;
			this.visible = true;
			this.$nextTick(() => {
				this.$refs['dataForm'].resetFields();
				this.getTypeList();
				this.getDataList();
			});
		},
		async getTypeList() {
			// const res = await API.information.typeList();
			this.options = getTypeOptions();
		},
		async getDataList() {
			if (this.dataForm.id) {
				console.log("isEdit",this.isEdit);
				const res =  this.isEdit ? await API.information.iteminfo(this.dataForm.id) : await API.information.itembyinfo(this.dataForm.id);
				// const res = await API.information.iteminfo(this.dataForm.id);
				const data = res.data;

				console.log('elementdata', data);

				if (data && data.code === 0) {
					this.dataForm.resultId = data.list.resultId;
					this.dataForm.nameCn = data.list.nameCn;
					this.dataForm.nameEn = data.list.nameEn;
					this.dataForm.source = this.system;
					this.dataForm.informationName = data.list.informationName;
					this.dataForm.type = data.list.type;
					this.dataForm.len = data.list.len;
					this.dataForm.remark = data.list.remark;
					this.dataForm.routine = data.list.routine;

					// 根据类型的value来筛选出label的名称，用来在详情时显示label名称，禁止显示下拉框
					/*const option = this.options.filter(
						item => item.value == this.dataForm.type
					);
					this.dataForm.label = option[0].label;*/
				}
			}
		},
		// 表单提交
		dataFormSubmit() {
			this.$refs['dataForm'].validate(valid => {
				if (valid) {
					var params = {
						pageId: this.dataForm.id || undefined,
						resultId: this.dataForm.resultId,
						nameCn: this.dataForm.nameCn,
						nameEn: this.dataForm.nameEn,
						source: this.dataForm.source,
						informationName: this.dataForm.informationName,
						type: this.dataForm.type,
						len: this.dataForm.len,
						remark: this.dataForm.remark,
						routine: this.dataForm.routine
					};
					console.log('params', params);
					var tick = !this.dataForm.id
						? API.information.itemSuppleAdd(params)
						: API.information.itemSuppleUpdate(params);
					tick.then(({ data }) => {
						if (data && data.code === 0) {
							this.$message({
								message: '保存成功',
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