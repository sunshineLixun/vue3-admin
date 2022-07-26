<template>
	<TableForm ref="tableFromRef" v-if="props.showSearch" @submit="handleSumbit" :formModel="props.formProps?.formModel">
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
import { useProTableState } from "./hooks/useProTableState";

const state = useProTableState();
const { tableFromRef } = state;

const props = defineProps(proTableProps);

const handleSumbit = (params: any) => {
	console.log(params);
};
</script>
