<template>
	<Form class="base-form" ref="formInstanceRef" v-bind="getFormProps" :model="model">
		<slot />
	</Form>
</template>

<script setup lang="ts">
import {  useAttrs } from "vue";
import { Form } from "ant-design-vue";
import { baseFormProps, baseFormEmit } from "./types";
import { useFormState } from "./hooks/useFormState";
import { useFromEvents } from "./hooks/useFormEvents";
import { useFormMethods } from "./hooks/useFormMethods";
import { createFromInstance } from "./hooks/useFormInstance";

const props = defineProps(baseFormProps);
const attrs = useAttrs();
const emit = defineEmits(baseFormEmit);

const fromState = useFormState({ props, attrs });
const { model, formInstanceRef, getFormProps } = fromState;

const formMethods = useFormMethods();
const { handleFormValues } = formMethods;

const formEvents = useFromEvents({ ...fromState, handleFormValues, props, emit });

const instance = {
	...fromState,
	...formEvents,
	...formMethods
};
createFromInstance(instance);
defineExpose(instance);
</script>

<style lang="scss" scoped>
.base-form {
	position: relative;
}
</style>
