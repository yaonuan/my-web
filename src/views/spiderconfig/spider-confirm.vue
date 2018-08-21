<template>
  <el-dialog
    :title="'确认采集列表'"
    :close-on-click-modal="false"
    :visible.sync="visible">
		<section v-loading="dataListLoading">
			<el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="save()" label-width="110px">
				<el-table :data="tableData" ref="table" @selection-change="handleSelectionChange" border stripe style="width: 100%;">
					<el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
					<el-table-column prop="nameCn" label="字段中文名称"></el-table-column>
					<el-table-column prop="nameEn" label="字段英文名称"></el-table-column>
				</el-table>
				<el-form-item label="资源目录名称" prop="infoName" style="margin-top: 20px">
					<el-input v-model="dataForm.infoName" placeholder="请输入资源目录的名称"></el-input>
				</el-form-item>
			</el-form>
		</section>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="save()">保存</el-button>
    </span>
  </el-dialog>
</template>

<script>
import API from '@/api';
import { mapMutations } from 'vuex';
export default {
	data() {
		return {
			visible: false,
			dataListLoading: false,
			tableData: [],
			multipleSelection: [],
			dataForm: {
				infoName: ''
			},
			dataRule: {
				infoName: [
					{ required: true, message: '资源目录名称不能为空', trigger: 'blur' }
				]
			}
		};
	},
	mounted() {
		// this.checked();
	},
	methods: {
		// 初始化
		init(texts) {
			this.visible = true;
			this.dataListLoading = true;

			// const array = texts.map((txt, i) => {
			// 	return { id: txt.pageId, nameCn: txt.nameCn, nameEn: txt.nameEn };
			// });

			// 删除数组最后一个元素
			// array.splice(array.length - 1, 1);
			this.tableData = texts;
			this.dataForm.infoName = '';
			this.dataListLoading = false;
			this.checked();
		},
		// 默认全选
		checked() {
			this.$nextTick(() => {
				for (let i = 0; i < this.tableData.length; i++) {
					this.$refs.table.toggleRowSelection(this.tableData[i], true);
				}
			});
		},
		// 获取选中项
		handleSelectionChange(selection) {
			this.multipleSelection = selection;
		},
		// 保存采集项目
		save() {
			if (this.multipleSelection.length == 0) {
				this.$message.error('请至少选择一个采集项目');
				return;
			}
			this.$refs['dataForm'].validate(valid => {
				if (valid) {
					const params = {
						pageInfos: this.multipleSelection,
						informationName: this.dataForm.infoName
					};
					console.log('params', params);
					this.dataListLoading = true;

					API.spiderconfig.saveInfo(params).then(({ data }) => {
						if (data && data.code === 0) {
							this.$message({
								message: '保存成功',
								type: 'success',
								duration: 1500,
								onClose: () => {
									this.visible = false;
									this.$router.push({ name: 'resultconversion' });
									this.removeTabs('spiderstart');
								}
							});
						} else {
							this.$message.error(data.msg);
						}
						this.dataListLoading = false;
					});
				}
			});
		},
		removeTabs(tabName) {
			const newTabs = this.$store.state.contentTabs.filter(
				item => item.name != tabName
			);

			this.UPDATE_CONTENT_TABS(newTabs);
		},
		...mapMutations(['UPDATE_CONTENT_TABS'])
	}
};
</script>
