<template>
	<TableForm ref="tableFromRef" v-if="props.showSearch" v-bind="props.formProps" @submit="handleSumbit">
		<template #formItem>
			<slot name="form" />
		</template>
	</TableForm>
	<Table :columns="props.columns" />
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import { Table } from "ant-design-vue";
import { proTableProps } from "./types";
import TableForm from "./components/table-form/table-form.vue";
import { useProTableState } from "./hooks/useTableState";
import { useTableMethods } from "./hooks/useTableMethods";

const state = useProTableState();
const { tableFromRef } = state;

const props = defineProps(proTableProps);

const { handleSumbit } = useTableMethods();
</script>
