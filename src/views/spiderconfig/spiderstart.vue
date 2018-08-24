<template>
	<section>
		<el-row :gutter="24">
			<el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="8">
				<el-input v-model="url" readonly><template slot="prepend">采集网址</template></el-input>
			</el-col>
			<el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="8">
				<el-button type="primary" @click="confirmHandle()" v-if="content">开始采集</el-button>
			</el-col>
			<el-col :xs="24" style="marginTop: 20px;" v-loading="dialogLoading">
        <el-tooltip class="item" content="请点击表格头部进行采集" placement="top">
          <div id="spiderContent" class="spiderContent">
						<iframe ref="iframe" id="iframe" frameborder="0" scrolling="auto" @load="loaded"></iframe>
					</div>
        </el-tooltip>
      </el-col>
		</el-row>
		<!-- 弹窗, 确认采集的项目 -->
    <spider-confirm v-if="spiderConfirmVisible" ref="spiderConfirm"></spider-confirm>
	</section>
</template>

<script>
import API from '@/api';
import SpiderConfirm from './spider-confirm';
import { mapMutations } from 'vuex';
import { getXPathForElement, getElementByXPath } from '@/utils';
export default {
	data() {
		return {
			id: '',
			url: '',
			content: '',
			texts: [],
			spiderConfirmVisible: false,
			dialogLoading: false
		};
	},
	components: {
		SpiderConfirm
	},
	activated() {
		this.getSpiderResult();
	},
	methods: {
		loaded() {
			this.setSize();
			this.renderContent();
			this.startSpider();
		},
		// 根据id爬取到需要采集的页面
		getSpiderResult() {
			this.id = this.$store.state.spiderId;
			this.url = this.$store.state.spiderUrl;
			this.dialogLoading = true;
			// console.log(this.id, this.url);
			this.$nextTick(() => {
				if (this.id) {
					API.spiderconfig.spider({ linkId: this.id }).then(({ data }) => {
						console.log('data', data);
						if (data && data.code === 0) {
							this.content = data.contents;
							this.renderContent();
						}else {
							this.content = data.msg;
							this.renderContent();
							this.$message.error(data.msg);
						}
						this.dialogLoading = false;

					});
				}
			});
		},
		// 设置尺寸
		setSize() {
			const content = document.getElementById('spiderContent');
			const iframe = document.getElementById('iframe');
			const deviceWidth = document.documentElement.clientWidth;
			const deviceHeight = document.documentElement.clientHeight;
			// content.style.width = deviceWidth + 'px';
			content.style.width = '100%';
			content.style.height = deviceHeight + 'px';
			// iframe.style.width = deviceWidth + 'px';
			iframe.style.width = '100%';
			iframe.style.height = deviceHeight + 'px';
		},
		// 渲染iframe的字符串内容
		renderContent() {
			const iframe = this.$refs.iframe;
			if (iframe && this.content) {
				const doc = this.$refs.iframe.contentWindow.document;
				doc.open();
				doc.write(this.content);
				doc.close();
			}
		},
		// 点击表格开始采集
		startSpider() {
			const that = this;
			const thead = this.getTheadElement();

			if (thead) {
				thead.onclick = function() {
					this.style.backgroundColor = '#17b3a3';
					that.confirmHandle();
				};
			}
		},
		// 弹窗-询问是否开始采集
		confirmHandle() {
			this.$confirm('您已选中所有表头采集，是否进行下一步操作?', '操作提示', {
				confirmButtonText: '开始采集',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					this.spiderHandle();
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消采集'
					});
				});
		},
		// 获取采集项目后弹窗采集项目列表
		async spiderHandle() {
			const texts = await this.getSpiderItems();

			console.log('texts', texts);

			if (texts.length > 0) {
				this.spiderConfirmVisible = true;
				this.$nextTick(() => {
					this.$refs.spiderConfirm.init(texts);
				});
			}
		},
		// 从后台获取采集表头项目
		async getSpiderItems() {
			const thead = this.getTheadElement();

			if (thead) {
				const params = {
					linkId: this.$store.state.spiderId,
					xpath: getXPathForElement(thead).replace('html[1]', 'html')
				};

				thead.style.backgroundColor = '#17b3a3';

				console.log('params', params);

				try {
					const res = await API.spiderconfig.getSpiderItems(params);
					const data = await this.render(res.data);
					return data;
				} catch (err) {
					console.log(err);
				}
			}
		},
		// 渲染采集项目
		async render(data) {
			if (data && data.code === 0) {
				return data.pageInfos;
			} else {
				this.$message.error(data.msg);
			}
		},
		// 获取thead元素
		getTheadElement() {
			const iframe = this.$refs.iframe;

			if (iframe) {
				const doc = iframe.contentWindow.document;
				const tables = doc.getElementsByTagName('table');
				// 遍历table元素，只获取显示的并且有thead子元素的table
				for (const i in tables) {
					if (tables.hasOwnProperty(i)) {
						const table = tables[i];

						if (
							table.clientHeight > 0 &&
							table.clientWidth > 0 &&
							table.children.length > 0
						) {
							for (const l in table.children) {
								if (table.children.hasOwnProperty(l)) {
									const children = table.children[l];
									if (children.tagName == 'THEAD') {
										return children;
									}
								}
							}
						}
					}
				}
			}
		},
		// 从前端获取采集表头项目,
		// Note: 此功能已弃用
		getSpiderItemsFront() {
			const texts = [];
			const content = document.getElementById('spiderContent');
			const tr = content
				.getElementsByTagName('table')[0]
				.getElementsByTagName('thead')[0]
				.getElementsByTagName('tr')[0].children;

			for (let i = 0; i < tr.length; i++) {
				const element = tr[i];
				texts.push(element.innerText);
			}

			this.texts = texts;
		},
		...mapMutations(['ADD_CONTENT_TAB', 'UPDATE_CONTENT_TABS'])
	}
};
</script>

<style lang="scss">
.spiderContent {
	padding: 20px;
	border: 2px solid #17b3a3;
	border-radius: 4px;
	cursor: pointer;
	overflow: auto;
}
</style>
