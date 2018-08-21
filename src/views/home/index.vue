<template>
  <section class="mod-home">
    <info-header />
    <trend-bar />
    <!-- <project-info /> -->
  </section>
</template>

<script>
import InfoHeader from './info-header';
import TrendBar from './trend-bar';
import ProjectInfo from './project-info';

export default {
	data() {
		return {};
	},
	components: {
		InfoHeader,
		TrendBar,
		ProjectInfo
	}
};
</script>

<style>
.mod-home {
	line-height: 1.5;
}
</style>

