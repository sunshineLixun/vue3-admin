<template>
	<BaseForm class="search-form" :formModel="props.formModel">
		<template #formContent>
			<Row :gutter="[8, 0]">
				<slot name="formItem" />
				<Col :span="6" :offset="collapsed ? 18 : 0">
					<Action :collapsed="collapsed" @onCollapsed="onCollapsed" />
				</Col>
			</Row>
		</template>
	</BaseForm>
</template>

<script setup lang="ts">
import { ref, defineProps } from "vue";
import { Row, Col } from "ant-design-vue";
import Action from "./action.vue";
import { BaseForm } from "../../../base-form";
import { baseFormProps } from "../../../base-form/base-from-types.ts";

// TODO: 计算Col的offset

const props = defineProps(baseFormProps);

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
