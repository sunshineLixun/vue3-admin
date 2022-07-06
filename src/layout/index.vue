<template>
	<Layout class="layout">
		<Layout.Sider v-model:collapsed="collapsed" :width="asiderWidth" collapsible :trigger="null">
			<Logo :collapsed="collapsed" />
			<Menu />
		</Layout.Sider>
		<Layout>
			<Header :collapsed="collapsed" @onCollapsed="onCollapsed" />
			<Layout.Content>
				<router-view v-slot="{ Component, route }">
					<transition appear name="fade-transform" mode="out-in">
						<keep-alive>
							<div class="content">
								<component :is="Component" :key="route.fullPath"></component>
							</div>
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
import Logo from "./logo";

const collapsed = ref<boolean>(false);
const asiderWidth = computed(() => (collapsed.value ? 48 : 200));

function onCollapsed(value: boolean) {
	collapsed.value = value;
}
</script>

<style lang="scss" scoped>
.layout {
	display: flex;
	height: 100vh;

	.content {
		max-height: 100%;
		overflow-y: scroll;
	}
}
</style>
