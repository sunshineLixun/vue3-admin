<template>
	<Form class="base-form" ref="fromInstanceRef" :model="formModel" @finish="props.onFinish">
		<slot name="formContent" />
	</Form>
</template>

<script setup lang="ts">
import { defineProps, defineExpose } from "vue";
import { Form } from "ant-design-vue";
import { baseFormProps } from "./base-from-types";
import { useFormState } from "./hooks/useFormState";
import { createFromInstance } from "./hooks/useFormInstance";

const props = defineProps(baseFormProps);

const fromState = useFormState({ props });
const { formModel, fromInstanceRef } = fromState;

const instance = {
	...fromState
};

createFromInstance(instance);
defineExpose(instance);
</script>

<style lang="scss" scoped>
.base-form {
	position: relative;
}
</style>
