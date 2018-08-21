<template>
	<section class="chart-box">
		<el-form :inline="true" :model="dataForm" @keyup.enter.native="init()" style="marginLeft: 20px">
      <!-- <el-form-item>
				<el-select v-model="dataForm.systemId" placeholder="请选择系统平台" @change="changeHandle">
					<el-option
						v-for="item in systemList"
						:key="item.id"
						:label="item.system"
						:value="item.id">
					</el-option>
				</el-select>
			</el-form-item> -->
      <!-- <el-form-item>
        <el-button icon="el-icon-search" @click="init()">搜索</el-button>
      </el-form-item> -->
    </el-form>
		<div id="chart" :style="{width: '100%', height: '400px'}"></div>
	</section>
</template>

<script>
import API from '@/api';

// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/bar');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/legend');

export default {
	data() {
		return {
			title: '',
			dataForm: {
				systemId: ''
			},
			systemList: [],
			xAxisData: [],
			seriesData: [],
			legendData: []
		};
	},
	mounted() {
		this.init();
	},
	methods: {
		// 初始化，获取系统平台列表，并根据选中的平台获取数据
		async init() {
			try {
				// const sys = await API.home.getSystemList();
				// await this.renderSystem(sys.data);
				await this.getDataList();
			} catch (error) {
				console.error(error);
			}
		},
		// 当选择框数值改变时的回调
		changeHandle(selected) {
			this.dataForm.systemId = selected;
			this.setTitle();
			this.getDataList();
		},
		// 设置标题
		setTitle() {
			let obj = this.systemList.find(
				item => item.id === this.dataForm.systemId
			);
			// this.title = obj.system;
			this.title = '爬取数据信息统计';
		},
		// 获取图表数据
		async getDataList() {
			try {
				console.log('systemId', this.dataForm.systemId);
				const res = await API.home.getTrendData();
				await this.renderTrend(res.data);
				await this.drawLine();
			} catch (error) {
				console.error(error);
			}
		},
		// 渲染系统平台列表
		async renderSystem(data) {
			if (data && data.code === 0) {
				// 首次载入页面后，选中第一个数据
				this.systemList = data.list;
				this.dataForm.systemId = this.dataForm.systemId
					? this.dataForm.systemId
					: this.systemList[0].id;
				this.setTitle();
			} else {
				this.systemList = [];
			}
		},
		// 渲染图表数据
		async renderTrend(data) {
			console.log('data', data);
			if (data && data.code === 0) {
				this.xAxisData = data.list.xAxisData;
				this.seriesData = data.list.seriesData;
				this.legendData = this.seriesData.map(item => item.name);
			} else {
				this.xAxisData = [];
				this.seriesData = [];
				this.legendData = [];
			}
		},
		// 绘制图表及参数配置
		async drawLine() {
			let myChart = echarts.init(document.getElementById('chart'));

			myChart.config = {
				rotate: 90,
				align: 'left',
				verticalAlign: 'middle',
				position: 'insideBottom',
				distance: 15
			};

			// 图表配置
			myChart.setOption({
				// 主标题
				title: {
					// text: this.title,
					text: '爬取数据信息统计',
					x: 'center',
					y: 'top',
					textStyle: {
						color: '#555',
						fontSize: 20
					}
				},
				color: ['#409eff', '#67c23a', '#e6a23c', '#f56c6c'],
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'shadow'
					}
				},
				// 图表的距离
				grid: {
					top: 80,
					left: 80,
					bottom: 40,
					right: 60
				},
				// 数据标题
				legend: {
					y: '38',
					data: this.legendData
				},
				calculable: true,
				xAxis: {
					type: 'category',
					axisTick: { show: false },
					data: this.xAxisData
				},
				yAxis: {
					type: 'value'
				},
				series: this.seriesData
			});
		}
	}
};
</script>

<style lang="scss">
.chart-box {
	border: 1px solid #ddd;
	border-radius: 6px;
	margin-top: 20px;
	padding: 20px 0;
}
</style>
