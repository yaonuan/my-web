<template>
  <el-dialog
    :title="'模拟登录'"
		:class="'sim-dialog'"
    :close-on-click-modal="false"
		:fullscreen="isFullScreen"
    :visible.sync="visible">
    <div slot="title">
      <span class="el-dialog__title">模拟登录</span>
      <p>请输入完整信息后，点击“确定”按钮进行模拟登录。</p>
    </div>
    <div v-loading="dialogLoading">
			<div id="simLoginContent" class="simLoginContent" v-if="content">
				<iframe ref="iframe" id="iframe" frameborder="0" scrolling="auto" @load="loaded"></iframe>
			</div>
			<div v-else>没有采集到内容</div>
		</div>
    <span slot="footer" class="dialog-footer">
      <el-button type="success" v-if="isFullScreen" @click="isFullScreen = false" style="float:left;">退出全屏</el-button>
      <el-button type="success" v-else @click="isFullScreen = true" style="float:left;">全屏展示</el-button>
      <el-button @click="visible = false;">取消</el-button>
      <el-button type="primary" :disabled="isDisabled" :loading="isLoading" @click="loginPageSubmit()">{{isLoading ? "登录中" : "确定"}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import API from '@/api';
import { getXPathForElement, getElementByXPath } from '@/utils';
export default {
	data() {
		return {
			id: '',
			content: '',
			button: '',
			publicParent: '',
			isFullScreen: false,
			visible: false,
			dialogLoading: false,
			isDisabled: true,
			isLoading: false
		};
	},
	mounted() {},
	methods: {
		// 初始化
		init(id) {
			this.id = id;
			this.button = '';
			this.publicParent = '';
			this.visible = true;
			this.dialogLoading = true;
			this.isDisabled = true;

			this.$nextTick(() => {
				API.spiderconfig.getLoginPage({ id: id }).then(({ data }) => {
					console.log('data', data);
					if (data && data.code === 0) {
						this.content = data.contents.replace(
							/<script.*?>.*?<\/script>/gi,
							''
						);
						this.renderContent();
						this.isDisabled = false;
					}
					this.dialogLoading = false;
				});
			});
		},
		loaded() {
			this.setSize();
			this.renderContent();
			this.listenElement();
		},
		// 设置尺寸
		setSize() {
			const content = document.getElementById('simLoginContent');
			const iframe = document.getElementById('iframe');
			const deviceWidth = document.documentElement.clientWidth;
			const deviceHeight = document.documentElement.clientHeight;
			content.style.width = deviceWidth + 'px';
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

			this.isLoading = true;
			this.dialogLoading = true;

			API.spiderconfig.getLoginParams(params).then(({ data }) => {
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
			});
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
			console.log('paths', paths);
			console.log('Buttonpaths', Buttonpaths);
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
		// 判断是否有这个类名
		hasClass(element, cls) {
			return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
		}
	}
};
</script>

<style lang="scss">
.sim-dialog {
	.el-dialog {
		display: flex;
		flex-direction: column;
		max-height: calc(100% - 100px);
		max-width: calc(100% - 100px);
		position: absolute;
		top: 50%;
		left: 50%;
		margin: 0 !important;
		transform: translate(-50%, -50%);
	}

	.el-dialog__body {
		overflow: auto;
		padding: 5px 20px 20px;
	}
}
.simLoginContent {
	padding: 12px;
	box-shadow: 0 0px 5px rgba(0, 0, 0, 0.15);
}
#iframe {
	width: 100%;
	height: 400px;
}
</style>

