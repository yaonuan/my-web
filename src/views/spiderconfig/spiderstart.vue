<template>
	<section>
		<el-row :gutter="24">
			<el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="8">
				<el-input v-model="url" readonly><template slot="prepend">采集网址</template></el-input>
			</el-col>
			<el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="8">
				<el-button type="primary" @click="confirmHandle()" v-if="content">开始采集</el-button>
			</el-col>
			<el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="8">
			  <el-select v-model="waite" clearable placeholder="请选择等待时间" v-if="content">
			    <el-option
			      v-for="item in options"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			  </el-select>
			</el-col>
			<el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
				<el-button type="primary" @click="nextStop()" v-if="content">下一步</el-button>
			</el-col>
			<el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
				<el-button type="primary" @click="loginPageSubmit()"  v-if="content">确定</el-button>
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
			waite: '',
			texts: [],
			spiderConfirmVisible: false,
			dialogLoading: false,
			options: [{
		          value: '2000',
		          label: '2秒'
		        }, {
		          value: '4000',
		          label: '4秒'
		        }, {
		          value: '6000',
		          label: '6秒'
		        }, {
		          value: '8000',
		          label: '8秒'
		        }, {
		          value: '10000',
		          label: '10秒'
		        }]
		};
	},
	components: {
		SpiderConfirm
	},
	watch: {
		waite (val) {
			// this.setSize();
			// this.renderContent();
			// this.startSpider();
			if (val) {
				this.getSpiderResult();
			}
		}
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
					API.spiderconfig.spider({ linkId: this.id,waite: this.waite }).then(({ data }) => {
						// console.log('data', data);
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
		nextStop(){
			this.listenElement();
		},
		// 登录页面提交填写的登录参数
		loginPageSubmit() {
			const params = this.getParams();
			console.log('params', params);

			if (!params) {
				this.$confirm(
					`为了获取到最真实的数据，请按顺序填写登录帐号和密码，并点击“登录”按钮进行模拟登录，完成所有步骤后点击“确定”按钮提交。`,
					'提示',
					{
						confirmButtonText: '',
						showConfirmButton: false,
						cancelButtonText: '明白了',
						type: 'warning'
					}
				)
					.then(() => {})
					.catch(() => {});
				return;
			}

			// this.isLoading = true;
			this.dialogLoading = true;

			/*API.spiderconfig.getLoginParams(params).then(({ data }) => {
				if (data && data.code === 0) {
					this.$message({
						message: '模拟登录成功',
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

				this.isLoading = false;
				this.dialogLoading = false;
			});*/
		},
		// 获取表单子元素的xpath，并返回一个params属性集
		getParams() {
			const parent = this.publicParent || this.getFormElement();
			console.log('parent', parent);

			if (parent) {
				const tags = parent.getElementsByTagName('*');
				const inputs = [];
				const params = {
					linkId: this.id
				};

				for (let i = 0; i < tags.length; i++) {
					const element = tags[i];
					const tagName = element.tagName;

					// 筛选text或tel格式的
					// 符合条件的input元素，并保存到一个数组中，
					// 一般情况下用户名是在第一位,验证码是第二位
					if (
						tagName == 'INPUT' &&
						(element.type == 'text' || element.type == 'tel') &&
						element.clientWidth > 0 &&
						element.clientHeight > 0
					) {
						inputs.push(element);
					}

					// 密码框
					if (
						tagName == 'INPUT' &&
						element.type == 'password' &&
						element.clientWidth > 0 &&
						element.clientHeight > 0
					) {
						params.password = element.value;
						params.passwordXpath = getXPathForElement(element).replace(
							'html[1]',
							'html'
						);
					}

					// 验证码图片
					if (tagName == 'IMG') {
						params.verifycodeUrl = element.src;
					}
				}

				console.log('inputs', inputs);
				params.username = inputs[0].value;
				params.usernameXpath = getXPathForElement(inputs[0]).replace(
					'html[1]',
					'html'
				);
				params.verifycodeXpath = getXPathForElement(inputs[1]).replace(
					'html[1]',
					'html'
				);

				if (!params.username || !params.password) {
					console.log('请填写帐号或密码。');
					return;
				}

				// 登录按钮
				console.log('button', this.button);
				params.loginButtonXpath = getXPathForElement(this.button).replace(
					'html[1]',
					'html'
				);

				return params;
			}
		},
		// 监听input键盘事件和button点击事件，
		// 当输入文本信息的时候获取input元素的所有祖先元素，或按钮点击的时候获取该元素的所有祖先元素
		// 然后根据这两组祖先元素作比较，获取最近的公共祖先元素
		listenElement() {
			const self = this;
			const iframe = this.$refs.iframe;
			// console.log('iframe', iframe);

			if (iframe) {
				const doc = iframe.contentWindow.document;
				const inputs = doc.getElementsByTagName('input');
				const tags = doc.getElementsByTagName('*');
				const paths = [];
				const Buttonpaths = [];

				console.log('inputs', inputs);
				console.log('inputs.length', inputs.length);
				for (let i = 0; i < inputs.length; i++) {
					const element = inputs[i];
					const tagName = element.tagName;
					console.log('inputselement', element);
					// 筛选出输入框类型
					if (
						tagName == 'INPUT' &&
						(element.type == 'text' ||
							element.type == 'tel' ||
							element.type == 'password') &&
						element.clientWidth > 0 &&
						element.clientHeight > 0
					) {
						// 监听键盘按下事件
						element.onkeydown = function(event) {
							var e =
								event || window.event || arguments.callee.caller.arguments[0];
							console.log('e', e);
							// 把所有的祖先元素保存到paths临时数组中，然后只比较第一个
							if (e) {
								paths.push(e.path);
								self.getPublicParent(
									paths[paths.length - 1],
									Buttonpaths[Buttonpaths.length - 1]
								);
							}
						};
					}
				}

				for (let i = 0; i < tags.length; i++) {
					const element = tags[i];
					const tagName = element.tagName;

					// 根据约定的规则，最后一次点击是按钮
					element.onclick = function(event) {
						// 阻止默认提交事件
						event.preventDefault();

						var e =
							event || window.event || arguments.callee.caller.arguments[0];

						// 把所有的祖先元素保存到paths临时数组中，然后只比较最后一个
						if (e) {
							const button = e.target || e.srcElement;
							Buttonpaths.push(e.path);
							self.getPublicParent(
								paths[paths.length - 1],
								Buttonpaths[Buttonpaths.length - 1],
								button
							);
						}
					};
				}
			}
		},
		// 遍历input和button元素的祖先元素，获取最近的公共祖先元素
		getPublicParent(paths, Buttonpaths, button) {
			console.log('429paths', paths);
			// console.log('430Buttonpaths', Buttonpaths);
			if (paths && paths.length > 0 && Buttonpaths && Buttonpaths.length > 0) {
				for (let i = 0; i < paths.length; i++) {
					const path = paths[i];
					for (let j = 0; j < Buttonpaths.length; j++) {
						const bpath = Buttonpaths[j];
						if (path == bpath) {
							this.publicParent = path;
							this.button = button;
							return false;
						}
					}
				}
			}
		},
		// 筛选表单元素，只获取显示并且有子元素的表单，并返回一个form元素
		getFormElement() {
			const iframe = this.$refs.iframe;

			if (iframe) {
				const doc = iframe.contentWindow.document;
				const forms = doc.getElementsByTagName('form');
				// 遍历form元素，只获取显示的并且有子元素的form
				for (const i in forms) {
					if (forms.hasOwnProperty(i)) {
						const form = forms[i];

						if (
							form.clientHeight > 0 &&
							form.clientWidth > 0 &&
							form.children.length > 0
						) {
							return form;
						}
					}
				}
			}
		},
		getParamsBackup() {
			// 如果登录按钮是图片
			if (
				tagName == 'IMG' &&
				element.hasAttribute('onclick') &&
				(element.alt == '普通登录' || element.alt == '登录')
			) {
				params.loginButtonXpath = getXPathForElement(element).replace(
					'html[1]',
					'html'
				);
			}

			// 登录按钮
			// 这里以下几种情况：
			// 1）元素是button
			// 2）元素是input，并且类型是submit或button
			// 3）元素是input，但没有类型，这种情况就去判断类名是否有btn了
			// 4）元素是a，类名有btn
			if (
				tagName == 'BUTTON' ||
				(tagName == 'INPUT' &&
					(element.type == 'submit' || element.type == 'button')) ||
				(tagName == 'INPUT' && this.hasClass(element, 'btn')) ||
				(tagName == 'A' && this.hasClass(element, 'btn'))
			) {
				params.loginButtonXpath = getXPathForElement(element).replace(
					'html[1]',
					'html'
				);
			}
		},
		listenElementBackup() {
			// 如果登录按钮是图片形式
			if (
				tagName == 'IMG' &&
				element.hasAttribute('onclick') &&
				(element.alt == '普通登录' || element.alt == '登录')
			) {
				// 按钮点击事件
				element.onclick = function(event) {
					// 阻止默认提交事件
					event.preventDefault();

					var e = event || window.event || arguments.callee.caller.arguments[0];

					// 把所有的祖先元素保存到paths临时数组中，然后只比较最后一个
					if (e) {
						Buttonpaths.push(e.path);
						self.getPublicParent(
							paths[paths.length - 1],
							Buttonpaths[Buttonpaths.length - 1]
						);
					}
				};
			}

			// 登录按钮
			// 这里以下几种情况：
			// 1）元素是button
			// 2）元素是input，并且类型是submit或button
			// 3）元素是input，但没有类型，这种情况就去判断类名是否有btn了
			// 4）元素是a，类名有btn
			if (
				tagName == 'BUTTON' ||
				(tagName == 'INPUT' &&
					(element.type == 'submit' || element.type == 'button')) ||
				(tagName == 'INPUT' && this.hasClass(element, 'btn')) ||
				(tagName == 'A' && this.hasClass(element, 'btn'))
			) {
				// 按钮点击事件
				element.onclick = function(event) {
					// 阻止默认提交事件
					event.preventDefault();

					var e = event || window.event || arguments.callee.caller.arguments[0];

					// 把所有的祖先元素保存到paths临时数组中，然后只比较最后一个
					if (e) {
						Buttonpaths.push(e.path);
						self.getPublicParent(
							paths[paths.length - 1],
							Buttonpaths[Buttonpaths.length - 1]
						);
					}
				};
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