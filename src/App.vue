<template>
	<ConfigProvider>
		<router-view #="{ Component }">
			<component :is="Component" />
		</router-view>
	</ConfigProvider>
</template>

<script setup lang="ts">
import { ConfigProvider } from "ant-design-vue";
// import zhCN from "ant-design-vue/es/locale/zh_CN";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");
</script>

<style>
@import "@/assets/base.css";
</style>
