<template>
	<Table v-bind.prop="tableProps" :columns="columns" />
</template>
<script setup lang="ts">
import { Table } from "ant-design-vue";
import { useAntdTable } from "@/hooks/useAntdTable";
import { listApi } from "@/api/modules/list";
import type { ColumnsType } from "ant-design-vue/es/table/interface";

const columns: ColumnsType = [
	{
		title: "序号",
		dataIndex: "id",
		sorter: true
	},
	{
		title: "姓名",
		dataIndex: "name"
	}
];

const { tableProps } = useAntdTable(listApi, {
	defaultParams: [
		{
			name: "123"
		}
	]
});
</script>

<style lang="scss">
.select {
	width: 100px;
}
</style>
