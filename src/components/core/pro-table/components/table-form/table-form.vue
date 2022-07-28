<template>
	<BaseForm ref="tableFromRef" class="search-form" v-bind="pick(getFormProps, baseFormPropsKeys)">
		<template #formContent>
			<Row :gutter="[8, 0]">
				<slot name="formItem" />
				<Col :span="6" :offset="collapsed ? 18 : 0">
					<Action :collapsed="collapsed" @collapsed="onCollapsed" />
				</Col>
			</Row>
		</template>
	</BaseForm>
</template>

<script setup lang="ts">
import { ref, defineProps, useAttrs } from "vue";
import { Row, Col } from "ant-design-vue";
import Action from "./action.vue";
import { pick } from "lodash";
import { BaseForm } from "@/components/core/base-form";
import { useTableFromState } from "./hooks/useTableFromState";
import { tableFormProps, baseFormPropsKeys } from "./types";

const attrs = useAttrs();

const props = defineProps(tableFormProps);

const state = useTableFromState({ props, attrs });
const { tableFromRef, getFormProps } = state;

// TODO: 计算Col的offset
const collapsed = ref(props.collapsed);

const onCollapsed = (_collapsed: boolean) => {
	collapsed.value = _collapsed;
};

const instance = {
	...state
};

defineExpose(instance);
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
