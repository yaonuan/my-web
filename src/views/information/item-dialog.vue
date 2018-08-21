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
        <el-input v-model="dataForm.informationName" :readonly="!isEdit" placeholder="请输入资源项目名称"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-input v-model="dataForm.type" :readonly="!isEdit" placeholder="请输入类型"></el-input>
      </el-form-item>
      <el-form-item label="项目长度" prop="len">
        <el-input v-model="dataForm.len" :readonly="!isEdit" placeholder="请输入项目长度"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="remark">
        <el-input v-model="dataForm.remark" :readonly="!isEdit" placeholder="请输入描述"></el-input>
      </el-form-item>
      <el-form-item label="默认值" prop="routine">
        <el-input v-model="dataForm.routine" :readonly="!isEdit" placeholder="请输入默认值"></el-input>
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
				informationName: '',
				type: '',
				len: '',
				remark: '',
				routine: ''
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
				remarkx: [{ required: true, message: '描述不能为空', trigger: 'blur' }],
				routine: [
					{ required: true, message: '默认值不能为空', trigger: 'blur' }
				]
			}
		};
	},
	methods: {
		// 初始化表单数据
		// 如果isRow为true，那么id对一个对象，是信息资源传递过来的对象
		init(id, isEdit, isRow) {
			if (isRow) {
				const row = id;
				this.dataForm.id = row.elementId;
				this.isEdit = isEdit;
				this.visible = true;
				this.$nextTick(() => {
					this.$refs['dataForm'].resetFields();

					this.dataForm.nameCn = row.nameCn;
					this.dataForm.nameEn = row.nameEn;
					this.dataForm.source = row.source;
					this.dataForm.informationName = row.informationName;
					this.dataForm.type = row.type;
					this.dataForm.len = row.len;
					this.dataForm.remark = row.remark;
					this.dataForm.routine = row.routine;
				});
			} else {
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
								this.dataForm.informationName = data.list.informationName;
								this.dataForm.type = data.list.type;
								this.dataForm.len = data.list.len;
								this.dataForm.remark = data.list.remark;
								this.dataForm.routine = data.list.routine;
							}
						});
					}
				});
			}
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
