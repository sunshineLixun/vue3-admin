<template>
	<ConfigProvider :locale="getAntdLocale">
		<router-view #="{ Component }">
			<component :is="Component" />
		</router-view>
	</ConfigProvider>
</template>

<script setup lang="ts">
import { ConfigProvider } from "ant-design-vue";
import { useI18nv } from "@/hooks/useI18n";
const { getAntdLocale } = useI18nv();
</script>

<style>
@import "@/assets/base.css";
@import "@/styles/index.scss";
</style>
