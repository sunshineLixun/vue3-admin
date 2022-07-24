<template>
	<TableForm v-if="props.showSearch" :formModel="props.formProps?.formModel">
		<template #formItem>
			<slot name="form" />
		</template>
	</TableForm>
	<Table :columns="props.columns" />
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import { Table } from "ant-design-vue";
import { proTableProps } from "./pro-table-types";
import TableForm from "./components/table-form/table-form.vue";
import { useFormRef } from "@/components/core/base-form/hooks/useFormInstance";

const props = defineProps(proTableProps);

const formRef = useFormRef();
console.log(formRef);
</script>
