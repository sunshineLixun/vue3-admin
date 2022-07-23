<template>
	<TableForm :formData="props.formProps?.formModel">
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

const props = defineProps(proTableProps);
</script>
