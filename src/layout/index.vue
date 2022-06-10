<template>
	<Layout class="layout">
		<Layout.Sider class="layout-sider" v-model:collapsed="collapsed" :width="asiderWidth" collapsible :trigger="null">
			<Menu />
		</Layout.Sider>
		<Layout>
			<Header>header</Header>
			<Layout.Content>
				<router-view v-slot="{ Component, route }">
					<transition appear name="fade-transform" mode="out-in">
						<keep-alive>
							<component :is="Component" :key="route.path"></component>
						</keep-alive>
					</transition>
				</router-view>
			</Layout.Content>
			<Footer>footer</Footer>
		</Layout>
	</Layout>
</template>

<script lang="ts" setup>
import { ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";

import { Layout } from "ant-design-vue";
import Header from "./header";
import Footer from "./footer";
import Menu from "./menu";

const collapsed = ref<boolean>(false);
const asiderWidth = computed(() => (collapsed.value ? 80 : 200));
</script>

<style lang="scss" scoped>
.layout {
	display: flex;
	height: 100vh;
	.layout-sider {
	}
}
</style>
