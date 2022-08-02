<template>
	<QueryFilter ref="tableFromRef" v-if="props.showSearch" v-bind="props.formProps" @finish="handleSumbit">
		<slot />
	</QueryFilter>
	<Table v-bind="getTableProps" :dataSource="dataSource" @change="onTableChange" />
</template>

<script lang="ts" setup>
import { defineProps, onMounted } from "vue";
import { Table } from "ant-design-vue";
import { proTableProps } from "./types";
import { QueryFilter } from "@/components/core/form/query-filter";
import { useProTableState } from "./hooks/useTableState";
import { useTableMethods } from "./hooks/useTableMethods";
const props = defineProps(proTableProps);

const state = useProTableState({ props });
const { tableFromRef, dataSource, getTableProps } = state;

const { handleSumbit, fetch, onTableChange } = useTableMethods({ props, state });

onMounted(() => {
	fetch();
});
</script>
