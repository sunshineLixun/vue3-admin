<template>
	<Form class="base-form" ref="fromInstanceRef" :model="formModel">
		<slot name="formContent" />
	</Form>
</template>

<script setup lang="ts">
import { defineProps, defineExpose, useAttrs } from "vue";
import { Form } from "ant-design-vue";
import { baseFormProps, baseFromEmits } from "./base-from-types";
import { useFormState } from "./hooks/useFormState";
import { useFromEvents } from "./hooks/useFormEvents";
import { useFormMethods } from "./hooks/useFormMethods";
import { createFromInstance } from "./hooks/useFormInstance";

const props = defineProps(baseFormProps);
const emit = defineEmits(baseFromEmits);
const attrs = useAttrs();
console.log(attrs);

const fromState = useFormState({ props });
const { formModel, fromInstanceRef } = fromState;

const { handleFormValues } = useFormMethods();

const formEvents = useFromEvents({ ...fromState, emit, handleFormValues });

const instance = {
	...fromState,
	...formEvents
};

createFromInstance(instance);
defineExpose(instance);
</script>

<style lang="scss" scoped>
.base-form {
	position: relative;
}
</style>
