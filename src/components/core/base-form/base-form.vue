<template>
	<Form class="base-form" ref="fromInstanceRef" :model="formModel" @finish="props.onFinish">
		<slot name="formContent" />
	</Form>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { Form } from "ant-design-vue";
import { baseFormProps } from "./base-from-types";
import { useFormState } from "./hooks/useFormState";
const props = defineProps(baseFormProps);

const { formModel, fromInstanceRef } = useFormState({ props });
</script>

<style lang="scss" scoped>
.base-form {
	position: relative;
}
</style>
