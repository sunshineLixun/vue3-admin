<template>
	<a-config-provider>
		<router-view></router-view>
	</a-config-provider>
</template>

<script setup lang="ts">
// import zhCN from "ant-design-vue/es/locale/zh_CN";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");
</script>

<style>
@import "@/assets/base.css";
</style>
