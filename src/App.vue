<template>
	<ConfigProvider :locale="getAntdLocale">
		<router-view #="{ Component }">
			<component :is="Component" />
		</router-view>
	</ConfigProvider>
</template>

<script setup lang="ts">
import { ConfigProvider } from "ant-design-vue";
import { useLocale } from "@/locales/useLocale";
const { getAntdLocale } = useLocale();
// import dayjs from "dayjs";
// import "dayjs/locale/zh-cn";
// dayjs.locale("zh-cn");
</script>

<style>
@import "@/assets/base.css";
</style>
