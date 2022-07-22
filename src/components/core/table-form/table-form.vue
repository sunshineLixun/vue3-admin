<template>
	<Form class="search-form" ref="formRef" name="formRef" :model="props.formData" @finish="props.onFinish">
		<Row :gutter="[8, 0]">
			<slot name="formItem" />
			<Col :span="6" :offset="collapsed ? 18 : 0">
				<Action :collapsed="collapsed" @onCollapsed="onCollapsed" />
			</Col>
		</Row>
	</Form>
</template>

<script setup lang="ts">
import { ref, defineProps } from "vue";
import type { PropType } from "vue";
import { Form, Row, Col } from "ant-design-vue";
import type { FormInstance } from "ant-design-vue";
import Action from "./action.vue";

const props = defineProps({
	formData: {
		type: Object,
		default: () => {}
	},
	onFinish: {
		type: Function as PropType<(values: any) => void>
	},
	onReset: {
		type: Function as PropType<(values: any) => void>
	}
});

const formRef = ref<FormInstance>();

const collapsed = ref(false);

const onCollapsed = (_collapsed: boolean) => {
	collapsed.value = _collapsed;
};
</script>

<style lang="scss" scoped>
.search-form {
	position: relative;

	.ant-form-item {
		margin-bottom: 10px;
		.ant-picker {
			width: 100%;
		}
	}
}
</style>
