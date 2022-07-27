<template>
	<Form class="base-form" ref="formInstanceRef" v-bind="pick(getFormProps, aFormPropKeys)" :model="formModel">
		<slot name="formContent" />
	</Form>
</template>

<script setup lang="ts">
import { defineProps, defineExpose, useAttrs } from "vue";
import { Form } from "ant-design-vue";
import { pick } from "lodash";
import { baseFromEmits, aFormPropKeys, baseFormProps } from "./types";
import { useFormState } from "./hooks/useFormState";
import { useFromEvents } from "./hooks/useFormEvents";
import { useFormMethods } from "./hooks/useFormMethods";
import { createFromInstance } from "./hooks/useFormInstance";

const props = defineProps(baseFormProps);
const emit = defineEmits(baseFromEmits);
const attrs = useAttrs();

const fromState = useFormState({ props, attrs });
const { formModel, formInstanceRef, getFormProps } = fromState;

const formMethods = useFormMethods();
const { handleFormValues } = formMethods;

const formEvents = useFromEvents({ ...fromState, emit, handleFormValues });

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
